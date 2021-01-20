# translater-api


### DB setup

Run the following commands to setup the DB

```sql
create database blog;
create user <your_username> identified with mysql_native_password by <your_password>;
use blog;
grant all privileges on translater.* to <your_username>;
flush privileges;
```

## Setting up the project
1. Clone at your local system.
2. Open the folder in visual studio code.
3. Open terminal and make the project folder as your current directory
4. Install all the dependencies as mentioned in the package.json :
```
npm install
```
5.  input the command `npm start` on terminal

6. Pat yourself in the back for making it so far!!
