from fastapi import APIRouter, WebSocket, WebSocketDisconnect
from app.database.mongo import assets_collection
import asyncio

router = APIRouter()


# =====================================================
# ✅ LIVE REALTIME DASHBOARD WEBSOCKET
# =====================================================
@router.websocket("/ws/live")
async def websocket_live(ws: WebSocket):

    await ws.accept()
    print("✅ Live dashboard connected")

    try:
        while True:

            assets = list(
                assets_collection.find({}, {"_id": 0})
            )

            await ws.send_json({
                "engines": assets,
                "total": len(assets)
            })

            await asyncio.sleep(1)

    except WebSocketDisconnect:
        print("⚠ Client disconnected")

    except Exception as e:
        print("❌ WebSocket Error:", e)