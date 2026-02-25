from pymongo import MongoClient
from app.config import MONGO_URL, DATABASE_NAME

try:
    client = MongoClient(MONGO_URL)
    
    # Force connection check
    client.admin.command("ping")
    print("✅ MongoDB Connected Successfully")

    db = client[DATABASE_NAME]

    # Collections
    assets_collection = db["assets"]
    alerts_collection = db["alerts"]

except Exception as e:
    print("❌ MongoDB Connection Failed")
    print(e)