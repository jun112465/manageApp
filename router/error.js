let express = require('express');
let router = express.Router();

router.get('/error_page', (req, res) => {
    db.query('Select * from data', (err, records) => {
        let total = 0;
        console.log(records[0]);
        let arr = Object.values(records[0]); //Object 객체는 객체와 관련된 메소드를 모아놓은 객체
        for (let i = 1; i < arr.length; i++) {
            total += arr[i];
        }
        console.log(arr);
        res.render('./error.ejs', {
            records: records,
            total: total
        });
    })
})

module.exports = router;