# imports
from read_config import read_config, read_path

conditions = json.loads(requests.get(config['source']))

GPIO.setmode(GPIO.BCM)

for dial in config['dials']:
    move_dial(read_path(conditions, dial['path']), dial, config['servo'])

GPIO.cleanup()