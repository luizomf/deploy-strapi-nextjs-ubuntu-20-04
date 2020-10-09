sudo openssl dhparam -out /etc/ssl/certs/dhparam.pem 2048
sudo apt-get install certbot
sudo service nginx stop
sudo certbot certonly --standalone -d SEU_DOMINIO
sudo service nginx start

sudo certbot renew