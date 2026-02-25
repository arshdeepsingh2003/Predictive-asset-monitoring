import os
import tensorflow as tf
import joblib
import json
from app.config import MODEL_PATH


# ===============================
# Build Full Paths Safely
# ===============================

model_file = os.path.join(MODEL_PATH, "lstm_rul_model.keras")
scaler_file = os.path.join(MODEL_PATH, "scaler.pkl")
threshold_file = os.path.join(MODEL_PATH, "apr_threshold.json")
feature_file = os.path.join(MODEL_PATH, "feature_list.json")


# ===============================
# Load LSTM Model
# ===============================

if not os.path.exists(model_file):
    raise FileNotFoundError(f"LSTM model not found at {model_file}")

lstm_model = tf.keras.models.load_model(model_file)


# ===============================
# Load Scaler
# ===============================

if not os.path.exists(scaler_file):
    raise FileNotFoundError(f"Scaler file not found at {scaler_file}")

scaler = joblib.load(scaler_file)


# ===============================
# Load Threshold
# ===============================

if not os.path.exists(threshold_file):
    raise FileNotFoundError(f"Threshold file not found at {threshold_file}")

with open(threshold_file) as f:
    threshold = json.load(f)["threshold"]


# ===============================
# Load Feature List (CRITICAL FIX)
# ===============================

if not os.path.exists(feature_file):
    raise FileNotFoundError(f"Feature list file not found at {feature_file}")

with open(feature_file) as f:
    FEATURE_LIST = json.load(f)


print("✅ RUL Model Loaded Successfully")
print("📊 Expected Feature Count:", len(FEATURE_LIST))