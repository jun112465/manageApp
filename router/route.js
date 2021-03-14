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
    database: 'date'
})
db.connect();

router.get('/', (req,res)=>{  
    DB.query('Select * from bank', (err, rows)=>{
        let total = 0;
        let list = rows;
        
        for(i in rows) total += rows[i].balance

        res.render('index.ejs', {
            title: "MANAGE MY MONEY",
            total: total,
            list: list
        })
    })
})
router.get('/update', (req,res)=>{
    DB.query('Select * from bank', (err, rows)=>{
        res.render('./update/update.ejs', {
            title: "UPDATE",
            list: rows,
        })
    })
})
router.post('/update-process', (req,res)=>{
        let id = req.body.id;
        let money = Number(req.body.money);
        console.log('testing : ' + id, money);
 
        let sql = 'UPDATE bank SET balance=? WHERE ACCOUNT=?';
        let params = [money, id];
        DB.query(sql, params, (err, rows, fields)=>{
            if(err) console.log(err);

            res.redirect('/');
        })
})

router.get('/delete', (req,res)=>{
    DB.query('select * from bank', (err, rows, fields)=>{
        let total = 0;
        for (i in rows) total += rows[i].balance;

        res.render('./delete/delete.ejs', {
            title: 'DELETE',
            total: total,
            list: rows,
        })
    })
})

router.post('/delete-process', (req,res)=>{
    let id = req.body.id;
    let sql = 'Delete From bank Where ACCOUNT=?';
    let params = [id];
    DB.query(sql, params, (err)=>{
        res.redirect('/');
    })
})

router.get('/add', (req,res)=>{
    res.render('add/add.ejs', {
        title: 'ADD',
    })
})

router.post('/add-process', (req,res)=>{
    let id = req.body.id;
    let value = req.body.value;
    console.log(id , value);
    let sql = `INSERT INTO bank (ACCOUNT , balance) VALUES('${id}',${value})`;

    DB.query(sql, (err, result)=>{
        if(err) throw err;
        res.redirect('/');
    })
})


module.exports = router;