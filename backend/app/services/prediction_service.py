import numpy as np
from app.models.rul_model import lstm_model, scaler
from app.utils.preprocessing import build_sequence

RUL_CAP = 130

def predict_rul(engine_dataframe):

    sequence = build_sequence(engine_dataframe)

    sequence_scaled = scaler.transform(
        sequence.reshape(-1, sequence.shape[-1])
    )

    sequence_scaled = sequence_scaled.reshape(
        1,
        sequence.shape[0],
        sequence.shape[1]
    )

    prediction = lstm_model.predict(
        sequence_scaled,
        verbose=0
    )[0][0]

    # ✅ Convert scale
    predicted_rul = prediction * RUL_CAP

    # ✅ INDUSTRY SAFETY LIMIT
    predicted_rul = max(0, predicted_rul)
    predicted_rul = min(RUL_CAP, predicted_rul)

    return float(predicted_rul)