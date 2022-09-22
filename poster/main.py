import json
import requests
import RPi.GPIO as GPIO
from read_config import read_config, read_path
from actuate import Actuator

config = read_config()

conditions = json.loads(requests.get(config['source']).text)

actuator = Actuator()

actuator.setup(config)

for dial in config['dials']:
    actuator.move_dial(read_path(conditions, dial['path']), dial, config['servo'])

actuator.cleanup()