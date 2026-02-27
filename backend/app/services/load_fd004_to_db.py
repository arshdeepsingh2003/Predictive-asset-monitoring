import os
import pandas as pd
from datetime import datetime

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
from app.models.rul_model import threshold


# =====================================================
# ✅ DATA PATH (ROOT → data/)
# =====================================================
BASE_DIR = os.path.abspath(
    os.path.join(os.path.dirname(__file__), "../../../")
)

DATA_PATH = os.path.join(
    BASE_DIR,
    "data",
    "test_FD004.txt"
)

print("📂 Using Dataset:", DATA_PATH)


# =====================================================
# LOAD FD004 + STORE INTO MONGODB
# =====================================================
def load_fd004_predictions():

    print("🚀 Loading FD004 Engines...")

    cols = (
        ['engine_id', 'cycle']
        + [f'op_{i}' for i in range(1, 4)]
        + [f'sensor_{i}' for i in range(1, 22)]
    )

    # ===============================
    # LOAD DATASET
    # ===============================
    df = pd.read_csv(DATA_PATH, sep=r"\s+", header=None)
    df.columns = cols

    engines = df["engine_id"].unique()

    print(f"✅ Total Engines Found: {len(engines)}")

    # ✅ ONLY MODEL FEATURES
    feature_cols = (
        [f'op_{i}' for i in range(1, 4)] +
        [f'sensor_{i}' for i in range(1, 22)]
    )

    # =================================================
    # LOOP ALL ENGINES
    # =================================================
    for engine_id in engines:

        print(f"⚙️ Processing Engine {engine_id}")

        engine_df = df[df["engine_id"] == engine_id].copy()

        try:
            # ===============================
            # ✅ RUL Prediction (LSTM)
            # ===============================
            predicted_rul = predict_rul(
                engine_df[["cycle"] + feature_cols]
            )

            # ===============================
            # ✅ LAST CYCLE FEATURES
            # IMPORTANT: KEEP DATAFRAME
            # ===============================
            last_cycle_features = (
                engine_df[feature_cols]
                .iloc[[-1]]      # keep dataframe shape
                .astype(float)
            )

            anomaly_score = compute_anomaly(
                last_cycle_features
            )

            severity = get_severity(anomaly_score)

            health_index = compute_health(
                predicted_rul,
                anomaly_score,
                threshold
            )

            # ===============================
            # CURRENT ENGINE STATE
            # ===============================
            asset_doc = {
                "engine_id": int(engine_id),
                "predicted_rul": float(predicted_rul),
                "anomaly_score": float(anomaly_score),
                "health_index": float(health_index),
                "severity": severity,
                "last_updated": datetime.utcnow()
            }

            # ✅ UPSERT ENGINE STATE
            assets_collection.update_one(
                {"engine_id": int(engine_id)},
                {"$set": asset_doc},
                upsert=True
            )

            # ===============================
            # ALERT HISTORY
            # ===============================
            alerts_collection.insert_one({
                "engine_id": int(engine_id),
                "predicted_rul": float(predicted_rul),
                "anomaly_score": float(anomaly_score),
                "severity": severity,
                "timestamp": datetime.utcnow()
            })

        except Exception as e:
            print(f"❌ Engine {engine_id} failed:", e)

    print("✅ All FD004 engines stored successfully!")


# =====================================================
# RUN SCRIPT
# =====================================================
if __name__ == "__main__":
    load_fd004_predictions()