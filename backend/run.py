import os
from flask import Flask, send_from_directory

app = Flask(__name__, static_folder=os.path.join(os.path.dirname(__file__), "../frontend/dist"), static_url_path="/")

@app.route("/")
def serve_frontend():
    return send_from_directory(app.static_folder, "index.html")

if __name__ == "__main__":
    app.run(host="0.0.0.0", port=5000, debug=True)
