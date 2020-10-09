# Install
sudo sh -c 'echo "deb [arch=$(dpkg --print-architecture)] http://apt.postgresql.org/pub/repos/apt $(lsb_release -cs)-pgdg main" > /etc/apt/sources.list.d/pgdg.list' 
wget --quiet -O - https://www.postgresql.org/media/keys/ACCC4CF8.asc | sudo apt-key add -
sudo apt-get update
sudo apt-get -y install postgresql-13

# Alterar #listen_addresses para listen_addresses = '*'
sudo nano /etc/postgresql/13/main/postgresql.conf

# Reiniciar postgresql
sudo systemctl restart postgresql

# Acessar psql
sudo -u postgres psql

# Usuário e base de dados
create user USUARIO with encrypted password 'SENHA';
CREATE DATABASE NOMEDABASE WITH OWNER USUARIO;
GRANT ALL PRIVILEGES ON DATABASE NOMEDABASE TO USUARIO;

# DUMP
pg_dump -c --if-exists --exclude-table=strapi_administrator -h HOSTNAME -U USERNAME -d "DATABASENAME" -W > dump.sql

# RESTORE
psql -h 127.0.0.1 -U USERNAME -d "DATABASENAME" -W < dump.sql
