let mysql = require('mysql');
let DB = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '1q2w3e4r!',
    database: 'APP',
});

connection.connect();

connection.query('Select * from person', (err,results,feilds)=>{
    if(err) console.log(err);
    
    console.log(results);
})

connection.end();