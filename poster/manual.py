import sys
import RPi.GPIO as GPIO
from read_config import read_config
from actuate import move_dial

config = read_config()

values = dict(enumerate([float(arg) for arg in sys.argv[1:]]))

GPIO.setmode(GPIO.BCM)

for [index, dial] in enumerate(config['dials']):
    move_dial(values.get(index, 0), dial, config['servo'])

GPIO.cleanup()