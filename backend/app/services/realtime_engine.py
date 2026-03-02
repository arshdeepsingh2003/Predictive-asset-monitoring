import time
import pandas as pd
from datetime import datetime

from app.database.mongo import assets_collection, alerts_collection
from app.services.prediction_service import predict_rul
from app.services.alert_service import compute_anomaly, get_severity
from app.services.health_service import compute_health
from app.models.rul_model import threshold


DATA_PATH = "data/test_FD004.txt"


def start_realtime_simulation():

    print("🚀 Realtime Engine Started")

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

            engine_df = df[df["engine_id"] == engine_id]

            predicted_rul = predict_rul(engine_df)

            features = (
                engine_df.drop(columns=["engine_id"])
                .iloc[-1:]
                .values
            )

            anomaly_score = compute_anomaly(features)
            severity = get_severity(anomaly_score)

            health_index = compute_health(
                predicted_rul,
                anomaly_score,
                threshold
            )

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

        print("✅ Cycle Updated")
        time.sleep(5)   # update every 5 sec