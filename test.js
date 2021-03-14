let mysql = require('mysql');
let DB1 = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '1q2w3e4r!',
    database: 'APP'
});
DB1.connect();

let db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '1q2w3e4r!',
    database: 'date'
})
db.connect();

DB1.query('Select * from bank', (err, rows)=>{
    console.log(rows);
    let balance = rows[0].balance;

    db.query('Insert into test(balance) values(7000)');
})

