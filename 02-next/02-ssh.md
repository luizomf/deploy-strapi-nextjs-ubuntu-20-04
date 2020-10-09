```
ssh-keygen -f ~/.ssh/strapi-api -t rsa -b 4096
cat ~/.ssh/strapi-api.pub
```

Adicionar em ~/.ssh/config
```
Host github.com-blog-next 
    HostName github.com
    User git
    IdentityFile ~/.ssh/blog-next 
```