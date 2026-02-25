import os
from dotenv import load_dotenv

load_dotenv()

# Database Config
MONGO_URL = os.getenv("MONGO_URL")
DATABASE_NAME = os.getenv("DATABASE_NAME")

# Dynamic Model Path (Safer)
BASE_DIR = os.path.dirname(os.path.abspath(__file__))
MODEL_PATH = os.path.join(BASE_DIR, "models", "saved_models")

# ML Parameters
SEQ_LENGTH = 50
RUL_CAP = 130