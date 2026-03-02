from fastapi import FastAPI
from threading import Thread

# ✅ Background Engines
from app.services.realtime_engine import start_realtime_simulation
from app.realtime.engine_stream import realtime_engine_stream

# ✅ Route Imports
from app.routes import (
    predictions,
    assets,
    alerts,
    dashboard,
    realtime,
    live_dashboard   # ✅ ADDED
)

# Optional debug routes
try:
    from app.routes import debug
    DEBUG_AVAILABLE = True
except ImportError:
    DEBUG_AVAILABLE = False


app = FastAPI(
    title="Predictive Asset Monitoring API",
    description="ML-powered backend for RUL prediction and anomaly detection",
    version="1.0.0"
)


# =====================================================
# ✅ AUTO START INDUSTRIAL BACKGROUND SERVICES
# =====================================================
@app.on_event("startup")
def start_background_services():

    Thread(
        target=start_realtime_simulation,
        daemon=True
    ).start()

    Thread(
        target=realtime_engine_stream,
        daemon=True
    ).start()

    print("✅ Engines + Streaming Started")


# =====================================================
# ✅ Include API Routers
# =====================================================
app.include_router(predictions.router, prefix="/api")
app.include_router(assets.router, prefix="/api")
app.include_router(alerts.router, prefix="/api")
app.include_router(dashboard.router, prefix="/api")

# Existing realtime routes
app.include_router(realtime.router)

# ✅ REALTIME WEBSOCKET LIVE DASHBOARD
app.include_router(live_dashboard.router)

# Optional debug
if DEBUG_AVAILABLE:
    app.include_router(debug.router, prefix="/debug")


# =====================================================
# Root Health Check
# =====================================================
@app.get("/")
def root():
    return {
        "message": "Predictive Asset Monitoring API Running 🚀",
        "status": "healthy",
        "realtime": "active"
    }