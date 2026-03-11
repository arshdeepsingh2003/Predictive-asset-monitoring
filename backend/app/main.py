from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from threading import Thread

# =====================================================
# Background Services
# =====================================================

from app.services.realtime_engine import start_realtime_simulation
from app.realtime.engine_stream import realtime_engine_stream


# =====================================================
# Route Imports
# =====================================================

from app.routes import predictions
from app.routes import assets
from app.routes import alerts
from app.routes import realtime
from app.routes import live_dashboard


# Optional debug routes
try:
    from app.routes import debug
    DEBUG_AVAILABLE = True
except ImportError:
    DEBUG_AVAILABLE = False


# =====================================================
# FastAPI App
# =====================================================

app = FastAPI(
    title="Predictive Asset Monitoring API",
    description="ML-powered backend for RUL prediction and anomaly detection",
    version="1.0.0"
)


# =====================================================
# CORS Middleware (Fix React requests)
# =====================================================

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],   # allow React dev server
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


# =====================================================
# Start Background Simulation Engines
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

    print("🚀 Engines + Streaming Started")


# =====================================================
# REST API ROUTES
# =====================================================

app.include_router(predictions.router, prefix="/api")
app.include_router(assets.router, prefix="/api")
app.include_router(alerts.router, prefix="/api")


# =====================================================
# Realtime HTTP Routes
# =====================================================

app.include_router(realtime.router)


# =====================================================
# WebSocket ROUTE
# =====================================================

app.include_router(live_dashboard.router)


# =====================================================
# Optional Debug Routes
# =====================================================

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