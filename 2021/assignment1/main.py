import csv
import json
import numpy as np

globallist = []
platform_globalsale = {}

with open('vgsales.csv', encoding='utf-8', newline='') as f:
    csvfile = csv.reader(f)
    for row in csvfile:
        globallist.append(row)
titlelist = globallist[0]
globallist = globallist[1:]
for row in globallist:
    if row[2] not in platform_globalsale:
        platform_globalsale[row[2]] = 0
    platform_globalsale[row[2]] += float(row[10])

for pname in platform_globalsale:
    platform_globalsale[pname] = np.round(platform_globalsale[pname], decimals=3)
    print(pname, platform_globalsale[pname])

with open('platform_globalsale.csv', 'w', encoding='utf-8', newline='') as f:
    csvfile = csv.writer(f)
    csvfile.writerow(['platform', 'globalsale'])
    for pname in platform_globalsale:
        csvfile.writerow([pname, platform_globalsale[pname]])

with open('platform_globalsale.json', 'w') as f:
    json.dump(platform_globalsale, f)

# generating data for racing: 
yearMAX = 2020
pgy = {}
for row in globallist:
    pgyid = '-'.join([row[2], row[3]])
    try:
        if pgyid not in pgy:
            pgy[pgyid] = {'platform': row[2], 'globalsale': 0, 'year': int(row[3])}
            for i in range(int(row[3])+1, yearMAX+1):
                pgy['-'.join([row[2], str(i)])] = {'platform': row[2], 'globalsale': 0, 'year': i}
    except:
        continue
for row in globallist:
    pgyid = '-'.join([row[2], row[3]])
    try:
        row[3] = int(row[3])
        row[10] = float(row[10])
    except:
        continue
    for eid in pgy:
        if pgy[eid]['year'] >= row[3] and pgy[eid]['platform'] == row[2]:
            pgy[eid]['globalsale'] += row[10]
for eid in pgy:
    pgy[eid]['globalsale'] = np.round(pgy[eid]['globalsale'], decimals=3)
with open('pgy.csv', 'w', encoding='utf-8', newline='') as f:
    csvfile = csv.writer(f)
    csvfile.writerow(['platform', 'globalsale', 'year', 'id'])
    for eid in pgy:
        csvfile.writerow([pgy[eid]['platform'], pgy[eid]['globalsale'], pgy[eid]['year'], eid])
print(pgy)
