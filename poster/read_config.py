import json

def read_config():
  with open('poster/config.json') as json_file:
    return json.load(json_file)

