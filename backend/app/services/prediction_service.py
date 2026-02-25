import numpy as np
from app.models.rul_model import lstm_model, scaler
from app.utils.preprocessing import build_sequence
from app.config import RUL_CAP


def predict_rul(engine_dataframe):
    """
    Predict Remaining Useful Life (RUL)
    for a single engine dataframe.
    """

    sequence = build_sequence(engine_dataframe)

    if sequence is None or len(sequence) == 0:
        raise ValueError("Invalid sequence generated for prediction.")

    # Scale
    sequence_scaled = scaler.transform(
        sequence.reshape(-1, sequence.shape[-1])
    )

    sequence_scaled = sequence_scaled.reshape(
        1,
        sequence.shape[0],
        sequence.shape[1]
    )

    # Predict
    prediction = lstm_model.predict(sequence_scaled, verbose=0)
    prediction = prediction.flatten()[0] * RUL_CAP

    return float(prediction)