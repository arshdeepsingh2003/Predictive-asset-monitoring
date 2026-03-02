# =====================================================
# IMPORTS
# =====================================================
import numpy as np
import pandas as pd

from app.models.rul_model import lstm_model as model, scaler
from app.utils.feature_engineering import standardize_features


# =====================================================
# CONFIG
# =====================================================
WINDOW_SIZE = 60


# =====================================================
# ✅ REALTIME RUL PREDICTION
# =====================================================
def predict_rul(engine_df):

    try:
        # ===============================================
        # ✅ STANDARDIZED FEATURES
        # ===============================================
        df = standardize_features(engine_df)

        # ===============================================
        # MATCH TRAINED FEATURES
        # ===============================================
        expected_cols = list(scaler.feature_names_in_)

        # add missing columns
        for col in expected_cols:
            if col not in df.columns:
                df[col] = 0

        # keep exact order
        df = df[expected_cols]

        print("✅ Final Features:", len(df.columns))

        # ===============================================
        # BUILD LSTM WINDOW
        # ===============================================
        if len(df) < WINDOW_SIZE:

            pad = pd.DataFrame(
                np.zeros(
                    (WINDOW_SIZE - len(df),
                     len(expected_cols))
                ),
                columns=expected_cols
            )

            df = pd.concat(
                [pad, df],
                ignore_index=True
            )

        window = df.iloc[-WINDOW_SIZE:]

        # ===============================================
        # SCALE
        # ===============================================
        scaled = scaler.transform(window)

        # ===============================================
        # LSTM INPUT
        # ===============================================
        X = scaled.reshape(
            1,
            WINDOW_SIZE,
            len(expected_cols)
        )

        print("✅ LSTM Input Shape:", X.shape)

        # ===============================================
        # PREDICTION
        # ===============================================
        prediction = model.predict(
            X,
            verbose=0
        )

        rul = float(prediction[0][0])

        # safety clamp
        rul = max(0.0, rul)

        return rul

    except Exception as e:
        print("⚠ Prediction Error:", e)
        return 0.0