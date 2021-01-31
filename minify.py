import htmlmin,os,requests,json,re
from pathlib import Path

htmlFiles = list(Path('data').glob('**/*.html'))
jsFiles = list(Path('data').glob('**/*.js'))
cssFiles = list(Path('data').glob('**/*.css'))
allFiles = list(Path('data').glob('**/*'))

print("------html-----")
print(htmlFiles)
print("------js-----")
print(jsFiles)
print("------css-----")
print(cssFiles)
print("------all-----")
print(allFiles)
print("--------------")

with open('purgecss.config.js','w') as f:
    f.write("module.exports = {content: "+str([str(x) for x in jsFiles]+[str(x) for x in htmlFiles])+"}")


os.system('rm -fr docs/*')

for pA in allFiles:
    if (os.path.isfile(pA)):
        with open(pA,'rb') as f:
            os.makedirs(os.path.dirname('docs/'+'.'.join(str(pA)[5:].split('.'))), exist_ok=True)
            with open('docs/'+'.'.join(str(pA)[5:].split('.')),'wb') as ff:
                ff.write(f.read())
    elif(os.path.isdir(pA)):
        if(os.path.exists(pA)):
            os.makedirs('docs/'+'.'.join(str(pA)[5:].split('.')),exist_ok=True)


for pA in htmlFiles:
    if (os.path.isfile(pA)):
        with open(pA,'r') as f:
            os.makedirs(os.path.dirname('docs/'+'.'.join(str(pA)[5:].split('.'))), exist_ok=True)
            with open('docs/'+'.'.join(str(pA)[5:].split('.')),'wb') as ff:
                html = htmlmin.minify(f.read(),remove_comments=True, remove_empty_space=True,reduce_boolean_attributes=True)
                ff.write(html.encode())
    elif(os.path.isdir(pA)):
        if(os.path.exists(pA)):
            os.makedirs('docs/'+'.'.join(str(pA)[5:].split('.')),exist_ok=True)

minerreg = r"(\/\/\ Error\ : )(.*\n.*\n.*)"

jsurl = 'https://javascript-minifier.com/raw'

for pA in jsFiles:
    if (os.path.isfile(pA)):
        with open(pA,'rb') as f:
            os.makedirs(os.path.dirname('docs/'+'.'.join(str(pA)[5:].split('.'))), exist_ok=True)
            jsdata = {'input': f.read()}
            with open('docs/'+'.'.join(str(pA)[5:].split('.')),'w') as ff:
                jsansw = requests.post(jsurl, data=jsdata).text
                if not re.match(minerreg,jsansw):
                    print(jsansw)
                    os.exit(1)
                ff.write(jsansw)
    elif(os.path.isdir(pA)):
        if(os.path.exists(pA)):
            os.makedirs('docs/'+'.'.join(str(pA)[5:].split('.')),exist_ok=True)


cssurl = 'https://cssminifier.com/raw'

for pA in cssFiles:
    if (os.path.isfile(pA)):
        f = json.loads(os.popen('purgecss -c purgecss.config.js -css '+str(pA)).read())[0]['css']
        os.makedirs(os.path.dirname('docs/'+'.'.join(str(pA)[5:].split('.'))), exist_ok=True)
        cssdata = {'input': f.encode()}
        with open('docs/'+'.'.join(str(pA)[5:].split('.')),'w') as ff:
            cssansw = requests.post(cssurl, data=cssdata).text
            if not re.match(minerreg,cssansw):
                    print(cssansw)
                    os.exit(1)
            ff.write(cssansw)
    elif(os.path.isdir(pA)):
        if(os.path.exists(pA)):
            os.makedirs('docs/'+'.'.join(str(pA)[5:].split('.')),exist_ok=True)



