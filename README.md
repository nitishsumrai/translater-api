# translater-api


### DB setup

Run the following commands to setup the DB

```sql
create database translater;
use translater;
create user <your_username> identified with mysql_native_password by <your_password>;
use translater;
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
6. Configure Sequelize:
   - Add **username** and **password** of the database user in the`config\sequelize.js` file  
7.  input the command `npm start` on terminal

8. Pat yourself in the back for making it so far!!
