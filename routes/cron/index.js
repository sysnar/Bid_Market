const express = require('express');
const mysql2 = require('mysql2');
const router = express.Router();


// // create the connection to database
// const connection = mysql.createConnection({
//   host: '49.50.165.87',
//   user: 'root',
//   database: 'bid'
// });

// connection.query(
//   'SELECT * from bid_list',
//   function(err, results, fields){
//     console.log(results);
//     console.log(fields);
//   }
// )

// URL : /cron
router.get('/', async function(req, res, next){
   // get the client
   const mysql = require('mysql2/promise');
   // create the connection
   const connection = await mysql.createConnection({host:'49.50.165.87', user: 'root', password: 'sysnar', database: 'bid'});
   // query database
   const [rows, fields] = await connection.execute('SELECT * from bid_list');

  res.send(rows);
}); 

module.exports = router;