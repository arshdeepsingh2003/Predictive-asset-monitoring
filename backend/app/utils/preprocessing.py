import numpy as np
from app.config import SEQ_LENGTH

def build_sequence(df):

    df = df.sort_values("cycle")

    features = [col for col in df.columns
                if col not in ["engine_id","cycle","RUL"]]

    data = df[features].values

    if len(data) < SEQ_LENGTH:
        padding = np.zeros((SEQ_LENGTH - len(data), data.shape[1]))
        data = np.vstack((padding, data))

    return data[-SEQ_LENGTH:]