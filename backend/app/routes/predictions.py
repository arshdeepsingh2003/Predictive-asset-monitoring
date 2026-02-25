from fastapi import APIRouter, HTTPException
from datetime import datetime
import pandas as pd

from app.services.prediction_service import predict_rul
from app.services.alert_service import compute_anomaly, get_severity
from app.services.health_service import compute_health
from app.models.rul_model import threshold
from app.database.schemas import EngineData
from app.database.mongo import assets_collection, alerts_collection

router = APIRouter()


@router.post("/predict")
def predict(engine_data: EngineData):
    try:
        # Convert input to DataFrame
        df = pd.DataFrame(engine_data.data)

        if df.empty:
            raise HTTPException(status_code=400, detail="Input data is empty")

        # ===============================
        # ML Predictions
        # ===============================
        predicted_rul = predict_rul(df)
        anomaly_score = compute_anomaly(df)
        severity = get_severity(anomaly_score)
        health_index = compute_health(
            predicted_rul,
            anomaly_score,
            threshold
        )

        # ===============================
        # Save Latest Engine State
        # ===============================
        assets_collection.update_one(
            {"engine_id": engine_data.engine_id},
            {
                "$set": {
                    "predicted_rul": predicted_rul,
                    "health_index": health_index,
                    "anomaly_score": anomaly_score,
                    "severity": severity,
                    "last_updated": datetime.utcnow()
                }
            },
            upsert=True
        )

        # ===============================
        # Save Alert (Only if not NORMAL)
        # ===============================
        if severity != "NORMAL":
            alerts_collection.insert_one({
                "engine_id": engine_data.engine_id,
                "predicted_rul": predicted_rul,
                "anomaly_score": anomaly_score,
                "severity": severity,
                "timestamp": datetime.utcnow()
            })

        return {
            "engine_id": engine_data.engine_id,
            "predicted_rul": predicted_rul,
            "anomaly_score": anomaly_score,
            "severity": severity,
            "health_index": health_index
        }

    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))