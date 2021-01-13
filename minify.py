import htmlmin,os
from pathlib import Path

htmlFiles = list(Path('data').glob('**/*.html'))
jsFiles = list(Path('data').glob('**/*.js'))
cssFiles = list(Path('data').glob('**/*.css'))
allFiles = list(Path('data').glob('**/*'))


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

