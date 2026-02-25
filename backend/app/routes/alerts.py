from fastapi import APIRouter
from app.database.mongo import alerts_collection

router = APIRouter()

@router.get("/alerts")
def get_alerts():
    alerts = list(alerts_collection.find({}, {"_id": 0}))
    return alerts