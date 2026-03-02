import os
import time
import pandas as pd
from datetime import datetime

from app.database.mongo import assets_collection, alerts_collection
from app.services.prediction_service import predict_rul
from app.services.alert_service import compute_anomaly, get_severity
from app.services.health_service import compute_health
from app.models.rul_model import threshold


# =====================================================
# ✅ ABSOLUTE DATA PATH (THREAD SAFE)
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

# Optional safety check
if not os.path.exists(DATA_PATH):
    raise FileNotFoundError(
        f"Dataset not found at {DATA_PATH}"
    )


# =====================================================
# REALTIME ENGINE STREAM
# =====================================================
def realtime_engine_stream():

    print("🚀 SAEL Realtime Analysis Started")

    cols = (
        ['engine_id', 'cycle']
        + [f'op_{i}' for i in range(1, 4)]
        + [f'sensor_{i}' for i in range(1, 22)]
    )

    df = pd.read_csv(DATA_PATH, sep=r"\s+", header=None)
    df.columns = cols

    engines = df.engine_id.unique()

    # pointer for each engine
    engine_cycles = {e: 1 for e in engines}

    while True:

        for engine in engines:

            current_cycle = engine_cycles[engine]

            engine_df = df[
                (df.engine_id == engine) &
                (df.cycle <= current_cycle)
            ]

            if engine_df.empty:
                continue

            try:
                # =====================
                # ML ANALYSIS
                # =====================
                predicted_rul = predict_rul(engine_df)

                features = (
                    engine_df
                    .drop(columns=["engine_id"])
                    .iloc[-1:]
                    .values
                )

                anomaly_score = compute_anomaly(features)
                severity = get_severity(anomaly_score)

                health = compute_health(
                    predicted_rul,
                    anomaly_score,
                    threshold
                )

                # =====================
                # CURRENT STATE
                # =====================
                assets_collection.update_one(
                    {"engine_id": int(engine)},
                    {"$set": {
                        "engine_id": int(engine),
                        "cycle": int(current_cycle),
                        "predicted_rul": float(predicted_rul),
                        "health_index": float(health),
                        "anomaly_score": float(anomaly_score),
                        "severity": severity,
                        "timestamp": datetime.utcnow()
                    }},
                    upsert=True
                )

                # =====================
                # HISTORY
                # =====================
                alerts_collection.insert_one({
                    "engine_id": int(engine),
                    "cycle": int(current_cycle),
                    "severity": severity,
                    "timestamp": datetime.utcnow()
                })

                engine_cycles[engine] += 1

            except Exception as e:
                print("⚠ Engine Error:", engine, e)

        print("✅ Live Cycle Updated")
        time.sleep(2)