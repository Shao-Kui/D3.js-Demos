from flask import Blueprint, request
import flask

app_hw = Blueprint('app_hw', __name__)

@app_hw.route('/imdb')
def imdb():
    return flask.send_from_directory('static', 'imdb.html')