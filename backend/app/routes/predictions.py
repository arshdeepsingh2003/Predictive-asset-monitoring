from fastapi import APIRouter
from datetime import datetime
import pandas as pd

from app.database.mongo import assets_collection, alerts_collection
from app.services.prediction_service import predict_rul
from app.services.alert_service import compute_anomaly, get_severity
from app.services.health_service import compute_health
from app.models.rul_model import threshold
from app.database.schemas import EngineData

router = APIRouter()


@router.post("/predict")
def predict(engine_data: EngineData):

    df = pd.DataFrame(engine_data.data)

    predicted_rul = predict_rul(df)
    anomaly_score = compute_anomaly(df)
    severity = get_severity(anomaly_score)

    health_index = compute_health(
        predicted_rul,
        anomaly_score,
        threshold
    )

    # ===============================
    # ENGINE CURRENT STATE
    # ===============================
    asset_doc = {
        "engine_id": engine_data.engine_id,
        "predicted_rul": predicted_rul,
        "anomaly_score": anomaly_score,
        "health_index": health_index,
        "severity": severity,
        "last_updated": datetime.utcnow()
    }

    # ✅ INSERT OR UPDATE ENGINE
    assets_collection.update_one(
        {"engine_id": engine_data.engine_id},
        {"$set": asset_doc},
        upsert=True
    )

    # ===============================
    # SAVE ALERT HISTORY
    # ===============================
    alerts_collection.insert_one({
        "engine_id": engine_data.engine_id,
        "predicted_rul": predicted_rul,
        "anomaly_score": anomaly_score,
        "severity": severity,
        "timestamp": datetime.utcnow()
    })

    return asset_doc