import numpy as np
from app.models.apr_model import apr_model
from app.models.rul_model import threshold

def compute_anomaly(features_array):
    reconstruction = apr_model.predict(features_array, verbose=0)
    mse = np.mean(np.square(features_array - reconstruction), axis=1)[0]
    return float(mse)

def get_severity(score):
    if score > 2 * threshold:
        return "CRITICAL"
    elif score > threshold:
        return "WARNING"
    return "NORMAL"