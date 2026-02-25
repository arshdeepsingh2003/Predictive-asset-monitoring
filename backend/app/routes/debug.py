from fastapi import APIRouter
from pymongo import MongoClient
from app.config import MONGO_URL, DATABASE_NAME
from app.models.rul_model import lstm_model, scaler, threshold
from app.models.apr_model import apr_model

router = APIRouter(prefix="/debug")

@router.get("/mongo")
def test_mongo():
    client = MongoClient(MONGO_URL)
    client.admin.command("ping")
    return {"status": "MongoDB Connected ✅"}

@router.get("/models")
def test_models():
    return {
        "lstm_loaded": str(type(lstm_model)),
        "apr_loaded": str(type(apr_model)),
        "threshold": threshold
    }