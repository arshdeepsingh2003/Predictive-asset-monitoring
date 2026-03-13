import os
import time
import random
import pandas as pd
from datetime import datetime

from app.database.mongo import assets_collection
from app.services.prediction_service import predict_rul
from app.services.health_service import compute_health
from app.models.rul_model import threshold


# =====================================================
# DATA PATH
# =====================================================
BASE_DIR = os.path.abspath(
    os.path.join(os.path.dirname(__file__), "../../../")
)

DATA_PATH = os.path.join(
    BASE_DIR,
    "data",
    "test_FD004.txt"
)

print("✅ Realtime dataset:", DATA_PATH)

if not os.path.exists(DATA_PATH):
    raise FileNotFoundError(f"Dataset not found at {DATA_PATH}")


# =====================================================
# ENGINE STREAM
# =====================================================
def realtime_engine_stream():

    print("🚀 Realtime Engine Lifecycle Started")

    cols = (
        ['engine_id', 'cycle']
        + [f'op_{i}' for i in range(1, 4)]
        + [f'sensor_{i}' for i in range(1, 22)]
    )

    df = pd.read_csv(DATA_PATH, sep=r"\s+", header=None)
    df.columns = cols

    engines = df.engine_id.unique()

    # =====================================================
    # START ENGINES MID-LIFE (60% OF LIFECYCLE)
    # =====================================================
    engine_cycles = {}

    for e in engines:
        engine_data = df[df.engine_id == e]
        engine_cycles[e] = int(len(engine_data) * 0.6)

    # =====================================================
    # RUL MEMORY
    # =====================================================
    engine_rul = {e: 120 for e in engines}

    # =====================================================
    # RANDOM DEGRADATION SPEED PER ENGINE
    # =====================================================
    engine_degradation = {
        e: random.uniform(0.5, 1.2) for e in engines
    }

    # =====================================================
    # TRACK FINISHED ENGINES
    # =====================================================
    finished = {e: False for e in engines}

    while True:

        normal = 0
        warning = 0
        critical = 0

        for engine in engines:

            if finished[engine]:
                continue

            try:

                current_cycle = engine_cycles[engine]

                engine_full = df[df.engine_id == engine]

                # =====================================================
                # ENGINE FINISHED
                # =====================================================
                if current_cycle >= len(engine_full):

                    finished[engine] = True
                    predicted_rul = 0
                    health = 0
                    severity = "CRITICAL"

                    critical += 1

                else:

                    engine_df = engine_full[
                        engine_full.cycle <= current_cycle
                    ]

                    # =====================================================
                    # ML RUL PREDICTION
                    # =====================================================
                    predicted_rul = predict_rul(engine_df)

                    # =====================================================
                    # MONOTONIC DEGRADATION
                    # =====================================================
                    previous_rul = engine_rul[engine]

                    degradation = engine_degradation[engine]

                    predicted_rul = min(
                        predicted_rul,
                        previous_rul - degradation
                    )

                    if predicted_rul < 0:
                        predicted_rul = 0

                    engine_rul[engine] = predicted_rul

                    # =====================================================
                    # HEALTH INDEX
                    # =====================================================
                    health = compute_health(
                        predicted_rul,
                        0,
                        threshold
                    )

                    # =====================================================
                    # SEVERITY LOGIC
                    # =====================================================
                    if predicted_rul <= 20:

                        severity = "CRITICAL"
                        critical += 1

                    elif predicted_rul <= 60:

                        severity = "WARNING"
                        warning += 1

                    else:

                        severity = "NORMAL"
                        normal += 1

                    engine_cycles[engine] += 1

                # =====================================================
                # STORE STATE IN MONGODB
                # =====================================================
                assets_collection.update_one(
                    {"engine_id": int(engine)},
                    {"$set": {
                        "engine_id": int(engine),
                        "cycle": int(current_cycle),
                        "predicted_rul": float(predicted_rul),
                        "health_index": float(health),
                        "severity": severity,
                        "timestamp": datetime.utcnow()
                    }},
                    upsert=True
                )

                print(
                    f"Engine {engine} | "
                    f"Cycle {current_cycle} | "
                    f"RUL {predicted_rul:.2f} | "
                    f"{severity}"
                )

            except Exception as e:
                print("⚠ Engine Error:", engine, e)

        # =====================================================
        # SYSTEM STATUS
        # =====================================================
        print(
            f"\n📊 System Status | "
            f"Normal: {normal} | "
            f"Warning: {warning} | "
            f"Critical: {critical}\n"
        )

        time.sleep(3)