from flask import Flask, render_template, Response, stream_with_context
import psutil as ps
import json
from datetime import datetime
import time
from flask_cors import CORS

app = Flask(__name__)
CORS(app)

@app.route('/chart-data')
def chart_data():
    def generate_cpu_data():
        while True:
            json_data = json.dumps(
                {'time': datetime.now().strftime('%Y-%m-%d %H:%M:%S'), 'value': ps.cpu_percent(interval=1.0)})
            yield f"data:{json_data}\n\n"
            time.sleep(1)

    response = Response(stream_with_context(generate_cpu_data()), mimetype="text/event-stream")
    response.headers["Cache-Control"] = "no-cache"
    response.headers["X-Accel-Buffering"] = "no"
    return response


if __name__ == '__main__':
    app.run()
