import time
import pandas as pd
from datetime import datetime
from pathlib import Path

from app.database.mongo import (
    assets_collection,
    alerts_collection
)

from app.services.prediction_service import predict_rul
from app.services.alert_service import (
    compute_anomaly,
    get_severity
)
from app.services.health_service import compute_health

from app.models.rul_model import threshold, scaler
from app.utils.feature_engineering import standardize_features


# =====================================================
# FEATURE ALIGNMENT FUNCTION
# =====================================================
def align_features(df, trained_features):

    for col in trained_features:
        if col not in df.columns:
            df[col] = 0

    df = df[trained_features]
    return df


# =====================================================
# ✅ DEPLOYMENT SAFE DATA PATH
# =====================================================
BASE_DIR = Path(__file__).resolve().parents[3]
DATA_PATH = BASE_DIR / "data" / "test_FD004.txt"


# =====================================================
# REALTIME ENGINE
# =====================================================
def start_realtime_simulation():

    print("🚀 Realtime simulation started")

    cols = (
        ['engine_id', 'cycle']
        + [f'op_{i}' for i in range(1, 4)]
        + [f'sensor_{i}' for i in range(1, 22)]
    )

    df = pd.read_csv(DATA_PATH, sep=r"\s+", header=None)
    df.columns = cols

    engines = df["engine_id"].unique()

    while True:

        for engine_id in engines:

            # ✅ standardized pipeline
            engine_df = standardize_features(
                df[df["engine_id"] == engine_id]
            )

            try:
                engine_window = engine_df.iloc[-1:]

                trained_features = list(
                    scaler.feature_names_in_
                )

                window_df = align_features(
                    engine_window.copy(),
                    trained_features
                ).astype(float)

                # =====================
                # Predictions
                # =====================
                predicted_rul = predict_rul(window_df)
                anomaly_score = compute_anomaly(window_df)
                severity = get_severity(anomaly_score)

                health_index = compute_health(
                    predicted_rul,
                    anomaly_score,
                    threshold
                )

                # =====================
                # Mongo Update
                # =====================
                asset_doc = {
                    "engine_id": int(engine_id),
                    "predicted_rul": float(predicted_rul),
                    "anomaly_score": float(anomaly_score),
                    "health_index": float(health_index),
                    "severity": severity,
                    "last_updated": datetime.utcnow()
                }

                assets_collection.update_one(
                    {"engine_id": int(engine_id)},
                    {"$set": asset_doc},
                    upsert=True
                )

                alerts_collection.insert_one({
                    "engine_id": int(engine_id),
                    "severity": severity,
                    "timestamp": datetime.utcnow()
                })

                print(f"✅ Engine {engine_id} updated")

            except Exception as e:
                print(f"⚠ Engine Error {engine_id}:", e)

        print("✅ Live Cycle Updated")
        time.sleep(5)