#bin/bash!

docker exec -ti alphabetical-sorter sh -c 'npm install -g vsce'
docker exec -ti alphabetical-sorter sh -c 'vsce package'
code --install-extension alphabetical-sorter-e-1.0.0.vsix
