from fastapi import APIRouter
from app.database.mongo import assets_collection, alerts_collection

router = APIRouter()

@router.get("/dashboard")
def get_dashboard():

    assets = list(assets_collection.find({}, {"_id": 0}))
    alerts = list(alerts_collection.find({}, {"_id": 0}))

    return {
        "total_engines": len(assets),
        "assets": assets,
        "alerts": alerts
    }