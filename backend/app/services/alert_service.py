import numpy as np
from app.models.apr_model import apr_model
from app.models.rul_model import threshold
from app.models.rul_model import FEATURE_LIST

def compute_anomaly(df):
    # Select only correct features
    df_features = df[FEATURE_LIST]
    last_row = df_features.values[-1:].astype(float)
    reconstruction = apr_model.predict(last_row, verbose=0)
    mse = np.mean(np.square(last_row - reconstruction), axis=1)[0]
    return float(mse)

def get_severity(score):
    if score > 2 * threshold:
        return "CRITICAL"
    elif score > threshold:
        return "WARNING"
    return "NORMAL"