from datetime import datetime
import os

from fastapi import FastAPI, HTTPException
import psutil
import time
from fastapi.middleware.cors import CORSMiddleware
from pymongo import MongoClient

# Connect to MongoDB
uri = "mongodb+srv://sudhanshukumar15678:001234@cpumonitor.x3wncg1.mongodb.net/?retryWrites=true&w=majority"
client = MongoClient(uri)
db = client['cpu_monitor']
process_collection = db['process']
cpu_collection = db['cpu']

app = FastAPI()

origins = [
    "http://localhost.tiangolo.com",
    "https://localhost.tiangolo.com",
    "http://localhost",
    "http://localhost:3000",
    "http://localhost:8080",
    "http://localhost:4200",
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


def get_cpu_data():
    items = []
    while True:
        cpu_percent = psutil.cpu_percent()
        current_time = datetime.now().strftime("%H:%M:%S")
        items.append({'time': current_time, 'cpu_percent': cpu_percent})
        time.sleep(5)


def update_or_add(data):
    pid = data["pid"]
    existing_document = process_collection.find_one({"pid": pid})

    if existing_document is not None:
        # Update existing document
        update_dict = {"$set": {key: value for key,
        value in data.items() if key != "pid"}}
        process_collection.update_one({"pid": pid}, update_dict)
    else:
        # Add new document
        process_collection.insert_one(data)
        print(f"Added new document with PID {pid}")


@app.get("/system")
async def root():
    memory_usage = psutil.virtual_memory().percent
    disk_usage = psutil.disk_usage('/').percent
    process = process_collection.count_documents({})
    CPU_cores = psutil.cpu_count(logical=True)
    items = [memory_usage, disk_usage, process, CPU_cores]
    return items

@app.get("/cpu-data")
async def cpu_data():
    if cpu_collection.count_documents({}) == 0:
        return "No data Present"

    items = []
    for x in cpu_collection.find({}, {"_id": 0}):
        items.append(x)

    return items

@app.get("/process")
async def process():
    if process_collection.count_documents({}) == 0:
        return "No data Present"

    items = []
    for x in process_collection.find({}, {"_id": 0, "connections": 0, "open_files": 0, "environ": 0}):
        items.append(x)

    return items


@app.delete("/process/{pid}")
async def kill_process(pid: int):
    try:
        process_collection.delete_one({"pid": pid})
        print("Process with PID:", pid, "is terminated")
        os.kill(pid, 9)  # Terminate the process
        return {"message": f"Process with PID {pid} killed successfully"}
    except psutil.NoSuchProcess:
        print()
        raise HTTPException(status_code=404, detail=f"Process with PID {pid} not found")
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))


