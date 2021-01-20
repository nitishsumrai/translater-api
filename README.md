# translater-api


### DB setup

Run the following commands to setup the DB

```sql
create database blog;
create user <your_username> identified with mysql_native_password by <your_password>;
use blog;
grant all privileges on blog.* to <your_username>;
flush privileges;
```
