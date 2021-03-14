const fs = require('fs');
let mysql = require('mysql');
let DB = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '1q2w3e4r!',
    database: 'APP'
});
DB.connect();

module.exports = {
    getTotal : function(total){
        DB.query('SELECT * FROM BANK', function(err, rows){
            for(i=0; i<rows.length; i++){
                /*
                console.log('row : ' + rows[i].ACCOUNT);
                total += rows[i].balance;
                console.log(total);
                */
               total += rows[i].balance;
               console.log(rows[i].balance);
               console.log(total);
            }
        })
        console.log(total);
        //return fs.readFileSync('./data/total')
    },
    updateTotal : function(){
        let total = 0;
        let files = fs.readdirSync('./data/bank', 'utf-8')
        for(let i=0; i<files.length; i++){
            total += Number(fs.readFileSync(`./data/bank/${files[i]}`, 'utf-8'));
        }
        fs.writeFile('./data/total', `${total}` ,'utf-8', (err)=>{
            if(err) console.log("failed to write file");
            else console.log("total file write success");
            console.log(`TOTAL MONEY : ${total}`)
        })
    },
    getList : function(){
        let list = []
        let filelist = fs.readdirSync('./data/bank', 'utf-8');
        
        for(let i=0; i<filelist.length; i++){
            list[i] = {};
            list[i].name = filelist[i];
            list[i].value = fs.readFileSync(`./data/bank/${filelist[i]}`,'utf-8');
        }
        return list;
    },
    
    
}
