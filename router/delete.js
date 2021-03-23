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

router.get('/delete', (req, res) => {
    DB.query('select * from bank', (err, rows, fields) => {
        let total = 0;
        for (i in rows) total += rows[i].balance;

        res.render('./delete/delete.ejs', {
            title: 'DELETE',
            total: total,
            list: rows,
        })
    })
})

router.post('/delete-process', (req, res) => {
    let id = req.body.id;
    let sql = 'Delete From bank Where ACCOUNT=?';
    let params = [id];
    DB.query(sql, params, (err) => {
        res.redirect('/');
    })
})

module.exports = router;