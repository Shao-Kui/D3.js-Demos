import json
res = {}
with open('./socfb-Caltech36.mtx') as f:
    texts = f.read()
texts = texts.split('\n')
texts.pop(0)

res['#nodesorigin'] = int(texts[0].split(' ')[0])
res['#edgesorigin'] = int(texts[0].split(' ')[2])
res['links'] = []

samplePercent = 0.15
nodes = range(1, res['#nodesorigin']+1, int(1 / samplePercent))
res['#nodes'] = len(nodes)

for t in texts[1:]:
    ts = t.split(' ')
    if len(ts) < 2:
        continue
    if int(ts[0])-1 in nodes and int(ts[1])-1 in nodes:
        res['links'].append({"source": int(ts[0])-1, "target": int(ts[1])-1})
res['#links'] = len(res['links'])

# re-mapping
m = {}
for (n, i) in zip(nodes, range(0, res['#nodes'])):
    m[n] = i
for link in res['links']:
    link['source'] = m[link['source']]
    link['target'] = m[link['target']]

with open('./socfb-Caltech36.json', 'w') as f:
    json.dump(res, f)