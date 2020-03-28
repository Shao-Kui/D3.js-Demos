import json
import csv

newlist = []

with open('./suncg_occur.json') as f:
    suncg_occur = json.load(f)

for obj in suncg_occur:
    newlist.append(suncg_occur[obj])

# "modelId": "s__999",
# "semantic": "unknown",
# "occur": 2

with open('./suncg_occur.csv', 'w', newline="") as csvfile:
    writer = csv.writer(csvfile)
    writer.writerow(['modelId', 'semantic', 'occur'])
    for obj in newlist:
        writer.writerow([obj['modelId'], obj['semantic'], obj['occur']])