let express = require('express');
let router = express.Router();
let mysql = require('mysql');
let DB = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '1q2w3e4r!',
    database: 'APP'
});
DB.connect();

router.get('/add', (req, res) => {
    res.render('add/add.ejs', {
        title: 'ADD',
    })
})

router.post('/add-process', (req, res) => {
    let id = req.body.id;
    let value = req.body.value;
    console.log(id, value);
    let sql = `INSERT INTO bank (ACCOUNT , balance) VALUES('${id}',${value})`;

    DB.query(sql, (err, result) => {
        if (err) throw err;
        res.redirect('/');
    })
})

module.exports = router;