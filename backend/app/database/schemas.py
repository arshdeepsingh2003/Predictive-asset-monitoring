from pydantic import BaseModel
from typing import List, Dict

class SensorData(BaseModel):
    engine_id: int
    data: List[Dict]