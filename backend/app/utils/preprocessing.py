import numpy as np
from app.config import SEQ_LENGTH
from app.models.rul_model import FEATURE_LIST

def build_sequence(df):

    df = df.sort_values("cycle")

    features = FEATURE_LIST

    data = df[features].values

    if len(data) < SEQ_LENGTH:
        padding = np.zeros((SEQ_LENGTH - len(data), data.shape[1]))
        data = np.vstack((padding, data))

    return data[-SEQ_LENGTH:]