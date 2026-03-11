from fastapi import APIRouter, WebSocket, WebSocketDisconnect
import asyncio
from app.database.mongo import assets_collection

router = APIRouter()

print("🔥 LIVE DASHBOARD ROUTER LOADED")


@router.websocket("/ws/live")
async def websocket_live(websocket: WebSocket):

    await websocket.accept()
    print("🟢 WebSocket client CONNECTED")

    try:
        while True:

            assets = list(assets_collection.find({}, {"_id": 0}))

            # convert datetime → string
            for asset in assets:
                for key, value in asset.items():
                    if hasattr(value, "isoformat"):
                        asset[key] = value.isoformat()

            print(f"📡 Sending {len(assets)} assets")

            await websocket.send_json({
                "type": "assets",
                "data": assets
            })

            await asyncio.sleep(1)

    except WebSocketDisconnect:
        print("🔴 WebSocket client DISCONNECTED")