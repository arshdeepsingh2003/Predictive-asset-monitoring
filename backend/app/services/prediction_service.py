# =====================================================
# IMPORTS
# =====================================================
import numpy as np
import pandas as pd

from app.models.rul_model import lstm_model as model, scaler


# =====================================================
# CONFIG
# =====================================================
WINDOW_SIZE = 60
MAX_RUL = 125


# =====================================================
# PREDICT RUL
# =====================================================
def predict_rul(engine_df: pd.DataFrame) -> float:

    try:

        # expected features used during training
        expected_cols = list(scaler.feature_names_in_)

        # add missing columns if required
        for col in expected_cols:
            if col not in engine_df.columns:
                engine_df[col] = 0

        df = engine_df[expected_cols].astype(float)

        # ==============================
        # BUILD WINDOW
        # ==============================
        if len(df) < WINDOW_SIZE:

            first_row = df.iloc[0]

            padding = pd.DataFrame(
                [first_row] * (WINDOW_SIZE - len(df)),
                columns=expected_cols
            )

            df = pd.concat([padding, df], ignore_index=True)

        window = df.iloc[-WINDOW_SIZE:]

        # ==============================
        # SCALE FEATURES
        # ==============================
        scaled = scaler.transform(window)

        # ==============================
        # LSTM INPUT SHAPE
        # ==============================
        X = scaled.reshape(1, WINDOW_SIZE, len(expected_cols))

        # ==============================
        # MODEL PREDICTION
        # ==============================
        prediction = model.predict(X, verbose=0)

        normalized_rul = float(prediction[0][0])

        # convert normalized value → real cycles
        rul = normalized_rul * MAX_RUL

        rul = max(0.0, min(rul, MAX_RUL))

        print(f"🔧 Predicted RUL: {rul:.2f}")

        return rul

    except Exception as e:

        print("⚠ Prediction Error:", e)

        return 0.0