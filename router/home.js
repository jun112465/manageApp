let express = require('express');
let router = express.Router();

let mysql = require('mysql');

let DB = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '1q2w3e4r!',
    database: 'APP'
})
router.get('/', (req, res) => {
    DB.query('Select * from bank', (err, rows) => {
        let total = 0;
        let list = rows;
        for (i in rows) total += rows[i].balance;

        res.render('index.ejs', {
            title: "MANAGE MY MONEY",
            total: total,
            list: list,
        })
    })
})

module.exports = router;
