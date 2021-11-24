from flask import Flask, request, jsonify, render_template, send_from_directory, redirect, url_for
import json
from flask_cors import CORS

app = Flask(__name__)
cors = CORS(app)


@app.route('/')
def index():
    return send_from_directory('templates', 'index.html')


@app.route('/<path:path>')
def send_js(path):
    return send_from_directory('templates', path)



context = ('1f9476e3959ebe60.crt', 'star_iitdh_key.key')#certificate and key files

if __name__ == "__main__":
    app.run(host="0.0.0.0", port="443", ssl_context=context)
