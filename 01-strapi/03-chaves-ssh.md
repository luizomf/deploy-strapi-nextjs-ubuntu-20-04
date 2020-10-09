```
ssh-keygen -f ~/.ssh/strapi-api -t rsa -b 4096
cat ~/.ssh/strapi-api.pub
```

Adicionar em ~/.ssh/config

```
Host github.com-strapi-api
    HostName github.com
    User git
    IdentityFile ~/.ssh/strapi-api  
```

```
git config --global user.name 'SEU NOME'
git config --global user.email 'SEU E-MAIL'
```

Criar server.js
```
const strapi = require('strapi');
strapi(/* {...} */).start();
```
