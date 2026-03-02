import pandas as pd


def standardize_features(df: pd.DataFrame):

    df = df.copy()

    # NASA → MODEL FORMAT
    rename_map = {
        "setting1": "op_1",
        "setting2": "op_2",
        "setting3": "op_3",
    }

    for i in range(1, 22):
        rename_map[f"s{i}"] = f"sensor_{i}"

    df.rename(columns=rename_map, inplace=True)

    df.drop(
        columns=["engine_id", "cycle"],
        errors="ignore",
        inplace=True
    )

    df = df.apply(pd.to_numeric, errors="coerce").fillna(0)

    return df