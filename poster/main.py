# imports
from read_config import read_config, read_path

conditions = json.loads(requests.get(config['source']))
for dial in config['dials']:
    move_dial(read_path(conditions, dial['path']), dial, config['servo'])