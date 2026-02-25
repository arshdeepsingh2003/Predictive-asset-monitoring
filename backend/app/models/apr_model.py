import os
import tensorflow as tf
from app.config import MODEL_PATH

model_file = os.path.join(MODEL_PATH, "apr_autoencoder.keras")
apr_model = tf.keras.models.load_model(model_file)