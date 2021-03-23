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

let home = require('./home');
router.get('/', home);

let update = require('./update');
router.get('/updateAccount', update);
router.get('/updateBox', update);
router.post('update-process', update);
router.post('/box_update', update);
router.post('/add_date', update);

let deleteP = require('./delete');
router.get('/delete', deleteP);
router.post('/delete-process', deleteP);

let add = require('./add');
router.get('/add', add);
router.post('/add-process', add);

let error = require('./error');
router.get('/error_page', error);

module.exports = router;