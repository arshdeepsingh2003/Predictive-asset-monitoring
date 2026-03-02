from fastapi import APIRouter, WebSocket
from app.database.mongo import assets_collection
import asyncio

router = APIRouter()


@router.websocket("/ws/dashboard")
async def dashboard_ws(websocket: WebSocket):

    await websocket.accept()

    while True:

        assets = list(
            assets_collection.find({}, {"_id": 0})
        )

        await websocket.send_json({
            "assets": assets,
            "total_engines": len(assets)
        })

        await asyncio.sleep(3)