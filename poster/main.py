import json
import requests
import RPi.GPIO as GPIO
from read_config import read_config, read_path

config = read_config()

conditions = json.loads(requests.get(config['source']).text)

GPIO.setmode(GPIO.BCM)

for dial in config['dials']:
    move_dial(read_path(conditions, dial['path']), dial, config['servo'])

GPIO.cleanup()