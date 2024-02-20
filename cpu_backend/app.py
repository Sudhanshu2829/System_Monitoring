from datetime import datetime

from fastapi import FastAPI, BackgroundTasks
import psutil
import time
import asyncio
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
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


def get_cpu_data():
    items=[]
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


@app.get("/")
async def root():
    memory_usage = psutil.virtual_memory().percent
    disk_usage = psutil.disk_usage('/').percent
    process = process_collection.count_documents({})
    total_threads = psutil.cpu_count(logical=True)
    items = [memory_usage, disk_usage, process, total_threads]
    return items


@app.get("/mongoprocess")
async def mongoprocess():
    if process_collection.count_documents({}) == 0:
        return "No data Present"

    items = []
    for x in process_collection.find({}, {"_id": 0, "connections": 0, "open_files": 0, "environ": 0}):
        items.append(x)

    return items


@app.get("/process")
async def process():
    items = []
    for process in psutil.process_iter(
            ['pid', 'name', 'status', 'ppid', 'cpu_times', 'memory_info', 'num_threads', 'connections', 'open_files',
             'environ']):
        process_info = {
            'pid': process.info['pid'],
            'name': process.info['name'],
            'status': process.info['status'],
            'ppid': process.info['ppid'],
            'cpu_times_user': process.info['cpu_times'].user,
            'cpu_times_system': process.info['cpu_times'].system,
            'memory_info_rss': process.info['memory_info'].rss,
            'memory_info_vms': process.info['memory_info'].vms,
            'num_threads': process.info['num_threads'],
            # 'disk_usage': disk_usage,
            # 'memory_usage':memory_usage
            # 'connections': process.info['connections'],
            # 'open_files': process.info['open_files'],
            # 'environ': process.info['environ']
        }
        items.append(process_info)

    return items

@app.get("/cpu-data")
async def cpu_data():
    if cpu_collection.count_documents({}) == 0:
        return "No data Present"

    items = []
    for x in cpu_collection.find({}, {"_id": 0}):
        items.append(x)

    return items
