from fastapi import FastAPI
from threading import Thread

# ✅ Realtime background engine
from app.services.realtime_engine import start_realtime_simulation

# Import all route modules
from app.routes import predictions, assets, alerts, dashboard, realtime

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


# ===============================
# ✅ Background Task (Realtime Mongo Updates)
# ===============================
@app.on_event("startup")
def start_background_tasks():
    Thread(
        target=start_realtime_simulation,
        daemon=True
    ).start()


# ===============================
# ✅ Include API Routers
# ===============================
app.include_router(predictions.router, prefix="/api")
app.include_router(assets.router, prefix="/api")
app.include_router(alerts.router, prefix="/api")
app.include_router(dashboard.router, prefix="/api")

# ✅ Realtime Streaming Router
app.include_router(realtime.router)

# Optional debug routes
if DEBUG_AVAILABLE:
    app.include_router(debug.router, prefix="/debug")


# ===============================
# Root Endpoint
# ===============================
@app.get("/")
def root():
    return {
        "message": "Predictive Asset Monitoring API Running 🚀",
        "status": "healthy"
    }