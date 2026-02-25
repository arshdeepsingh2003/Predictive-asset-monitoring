from fastapi import FastAPI

# Import all route modules
from app.routes import predictions, assets, alerts, dashboard

# (Optional) debug routes if you created them
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
# Include API Routers
# ===============================

app.include_router(predictions.router, prefix="/api")
app.include_router(assets.router, prefix="/api")
app.include_router(alerts.router, prefix="/api")
app.include_router(dashboard.router, prefix="/api")

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