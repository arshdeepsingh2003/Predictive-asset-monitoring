# =====================================================
# IMPORTS
# =====================================================
import numpy as np
import pandas as pd

from app.models.apr_model import apr_model
from app.models.rul_model import threshold
from app.models.rul_model import FEATURE_LIST

from app.utils.feature_engineering import standardize_features


# =====================================================
# ✅ SAFE ANOMALY COMPUTATION
# =====================================================
def compute_anomaly(df):
    """
    Compute anomaly score using Autoencoder
    with standardized feature pipeline.
    """

    # ===============================================
    # Ensure dataframe
    # ===============================================
    if not isinstance(df, pd.DataFrame):
        df = pd.DataFrame(df)

    # ===============================================
    # ✅ APPLY SAME FEATURE ENGINEERING
    # ===============================================
    df = standardize_features(df)

    # ===============================================
    # MATCH TRAINED FEATURES
    # ===============================================
    for col in FEATURE_LIST:
        if col not in df.columns:
            df[col] = 0

    df_features = df[FEATURE_LIST].astype(float)

    # ===============================================
    # TAKE LATEST TIMESTEP
    # ===============================================
    last_row_df = df_features.iloc[-1:]

    # model boundary conversion
    last_row = last_row_df.to_numpy()

    # ===============================================
    # AUTOENCODER RECONSTRUCTION
    # ===============================================
    reconstruction = apr_model.predict(
        last_row,
        verbose=0
    )

    # ===============================================
    # RECONSTRUCTION ERROR (MSE)
    # ===============================================
    mse = np.mean(
        np.square(last_row - reconstruction),
        axis=1
    )[0]

    return float(mse)


# =====================================================
# ✅ SEVERITY LOGIC
# =====================================================
def get_severity(score):

    if score > 2 * threshold:
        return "CRITICAL"

    elif score > threshold:
        return "WARNING"

    return "NORMAL"