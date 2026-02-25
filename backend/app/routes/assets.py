from fastapi import APIRouter
from app.database.mongo import assets_collection

router = APIRouter()

@router.get("/assets")
def get_assets():
    assets = list(assets_collection.find({}, {"_id": 0}))
    return assets