from fastapi import APIRouter
from app.database.mongo import assets_collection

router = APIRouter()

@router.get("/dashboard")
def dashboard_summary():

    total_assets = assets_collection.count_documents({})
    critical = assets_collection.count_documents({"severity": "CRITICAL"})
    warning = assets_collection.count_documents({"severity": "WARNING"})

    return {
        "total_assets": total_assets,
        "critical_assets": critical,
        "warning_assets": warning
    }