import os
import tensorflow as tf
import joblib
import json
from app.config import MODEL_PATH

# Build full paths safely
model_file = os.path.join(MODEL_PATH, "lstm_rul_model.keras")
scaler_file = os.path.join(MODEL_PATH, "scaler.pkl")
threshold_file = os.path.join(MODEL_PATH, "apr_threshold.json")

# Load LSTM
lstm_model = tf.keras.models.load_model(model_file)

# Load Scaler
scaler = joblib.load(scaler_file)

# Load Threshold
with open(threshold_file) as f:
    threshold = json.load(f)["threshold"]