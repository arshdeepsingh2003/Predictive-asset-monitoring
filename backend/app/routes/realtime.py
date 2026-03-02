import os
import asyncio
from fastapi import APIRouter, WebSocket
from app.database.mongo import assets_collection


# =====================================================
# ✅ ABSOLUTE DATA PATH (Portable Industrial Method)
# =====================================================
BASE_DIR = os.path.abspath(
    os.path.join(os.path.dirname(__file__), "../../../")
)

DATA_PATH = os.path.join(
    BASE_DIR,
    "data",
    "test_FD004.txt"
)

print("✅ Realtime dataset:", DATA_PATH)


# =====================================================
# WebSocket Router
# =====================================================
router = APIRouter()


@router.websocket("/ws/dashboard")
async def dashboard_ws(websocket: WebSocket):

    await websocket.accept()

    try:
        while True:

            assets = list(
                assets_collection.find({}, {"_id": 0})
            )

            await websocket.send_json({
                "assets": assets,
                "total_engines": len(assets)
            })

            await asyncio.sleep(3)

    except Exception as e:
        print("WebSocket closed:", e)