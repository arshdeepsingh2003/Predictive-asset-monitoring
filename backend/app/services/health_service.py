from app.config import RUL_CAP


def compute_health(predicted_rul, anomaly_score, threshold):

    rul_health = predicted_rul / RUL_CAP

    apr_health = 1 - (anomaly_score / threshold)

    apr_health = max(0, apr_health)

    health = 0.7 * rul_health + 0.3 * apr_health

    # ✅ Clamp health
    return max(0, min(1, health))