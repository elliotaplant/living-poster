import json

def read_config():
  with open('poster/config.json') as json_file:
    return json.load(json_file)

def read_path(nested, path):
    if len(path) == 0:
        return nested
    return read_path(nested[path[0]], path[1:])


