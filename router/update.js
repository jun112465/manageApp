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

let db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '1q2w3e4r!',
    database: 'date',
    dateStrings: 'date'
})
db.connect();

router.get('/updateAccount', (req, res) => {
    DB.query('Select * from bank', (err, rows) => {
        res.render('./update/update.ejs', {
            title: "UPDATE",
            list: rows,
        });
    })
})

router.get('/updateBox', (req, res) => {
    DB.query('Select * from bank', (err, rows) => {
        db.query('Select * from data', (err, records) => {
            let total = 0;
            console.log(records[0]);
            let arr = Object.values(records[0]); //Object 객체는 객체와 관련된 메소드를 모아놓은 객체
            for (let i = 1; i < arr.length; i++) {
                total += arr[i];
            }
            console.log(arr);
            res.render('./update/updateBox.ejs', {
                title: "UPDATE",
                list: rows,
                records: records,
                total: total
            });
        })
    })
})

router.post('/update-process', (req, res) => {
    let id = req.body.id;
    let money = Number(req.body.money);
    console.log('testing : ' + id, money);

    let sql = 'UPDATE bank SET balance=? WHERE ACCOUNT=?';
    let params = [money, id];
    DB.query(sql, params, (err, rows, fields) => {
        if (err) console.log(err);

        res.redirect('/');
    })
})

router.post('/box_update', (req, res) => {
    let consumption = req.body.consumption;
    let attribute = req.body.attribute;
    let date = req.body.date;
    let account = req.body.account;
    console.log('test', consumption, attribute);
    let sql = `Update data Set ${attribute}=${consumption} Where date='${date}'`;
    db.query(sql, (err) => {
        if (err) {
            res.render('error.ejs', {
                errMsg: err
            });
        }
        //res.redirect('/update');
    })
    DB.query(`Update bank Set balance=balance-${consumption} Where account='${account}'`, (err) => {
        res.redirect('/updateBox');
    });
})

router.post('/add_date', (req, res) => {
    console.log("url moved");
    db.query('insert into data(date) values(curdate())', (err) => {
        if (err) {
            console.log(err);
            res.render('./error.ejs', {
                errMsg: "Same date already registered"
            })
        }
        else res.redirect('/updateBox');
    });
})

module.exports = router;