from pydantic import BaseModel
from typing import List, Dict, Any

class EngineData(BaseModel):
    engine_id: int
    data: List[Dict[str, Any]]

class PredictionResponse(BaseModel):
    engine_id: int
    predicted_rul: float
    anomaly_score: float
    severity: str
    health_index: float