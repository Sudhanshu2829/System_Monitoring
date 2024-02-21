import psutil
from pymongo import MongoClient
from datetime import datetime
import time

# Connect to MongoDB
uri = "mongodb+srv://sudhanshukumar15678:001234@cpumonitor.x3wncg1.mongodb.net/?retryWrites=true&w=majority"
client = MongoClient(uri)
db = client['cpu_monitor']
collection = db['process']
cpu_collection = db["cpu"]


def update_or_add(data):
    pid = data["pid"]
    existing_document = collection.find_one({"pid": pid})

    if existing_document is not None:
        update_dict = {"$set": {key: value for key, value in data.items() if key != "pid"}}
        collection.update_one({"pid": pid}, update_dict)
    else:
        collection.insert_one(data)
        print(f"Added new document with PID {pid}")


def collect_process_data():
    # Delete all documents in the collection
    collection.delete_many({})
    for process in psutil.process_iter(['pid', 'name', 'status', 'ppid', 'cpu_times', 'memory_info',
                                        'num_threads', 'connections']):
        try:
            process_info = {
                'pid': process.info['pid'],
                'name': process.info['name'],
                'status': process.info['status'],
                'cpu_times_user': process.info['cpu_times'].user,
                'cpu_times_system': process.info['cpu_times'].system,
                'memory_info_rss': process.info['memory_info'].rss,
                'memory_info_vms': process.info['memory_info'].vms,
                'num_threads': process.info['num_threads'],
            }

            update_or_add(process_info)

        except psutil.NoSuchProcess:
            pass


def collect_cpu_data():
    cpu_collection.delete_many({})
    while True:
        cpu_percent = psutil.cpu_percent()
        current_time = datetime.now().strftime("%H:%M:%S")
        item = {
            "cpu_percent": cpu_percent,
            "time": current_time
        }
        cpu_collection.insert_one(item)
        print("CPU percent added at: ", current_time)
        time.sleep(5)


if (__name__ == '__main__'):
    collect_process_data()
    collect_cpu_data()
