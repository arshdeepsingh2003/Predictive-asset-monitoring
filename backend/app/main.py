from fastapi import FastAPI
from pymongo import MongoClient
from app.config import MONGO_URL, DATABASE_NAME

# Import models correctly
from app.models.rul_model import lstm_model, scaler, threshold
from app.models.apr_model import apr_model

app = FastAPI()

# ===============================
# TEST MONGODB CONNECTION
# ===============================
@app.get("/test-mongo")
def test_mongo():
    try:
        client = MongoClient(MONGO_URL)
        db = client[DATABASE_NAME]
        client.admin.command("ping")   # Strong connection check

        collections = db.list_collection_names()

        return {
            "status": "MongoDB Connected ✅",
            "collections": collections
        }

    except Exception as e:
        return {
            "status": "Connection Failed ❌",
            "error": str(e)
        }


# ===============================
# TEST MODEL LOADING
# ===============================
@app.get("/test-models")
def test_models():
    try:
        return {
            "lstm_model_loaded": str(type(lstm_model)),
            "apr_model_loaded": str(type(apr_model)),
            "scaler_loaded": str(type(scaler)),
            "threshold_value": threshold
        }
    except Exception as e:
        return {
            "status": "Model Loading Failed ❌",
            "error": str(e)
        }


@app.get("/")
def root():
    return {"message": "Backend Running Successfully 🚀"}