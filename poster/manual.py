import sys
import RPi.GPIO as GPIO
from read_config import read_config
from actuate import Actuator

config = read_config()

values = dict(enumerate([float(arg) for arg in sys.argv[1:]]))

actuator = Actuator()

actuator.setup(config)

for [index, dial] in enumerate(config['dials']):
    actuator.move_dial(values.get(index, 0), dial, config['servo'])

actuator.cleanup()