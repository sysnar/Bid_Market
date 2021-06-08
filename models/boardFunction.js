const mysql2 = require('mysql2/promise');
const config = require('./db_config.json');

const dbpool = mysql2.createPool(config);


async function getToday(){
  
}

async function getRequestBoardRowNum(page, pageSize){
  try {
    const dbconn = await dbpool.getConnection(async conn => conn);
    
    try{
      const [rows] = await dbconn.query("SELECT count(*) from request_board LIMIT ?, ?;",[Number(page), Number(pageSize)]);
      dbconn.release();
      return rows[0]['count(*)'];
    }
    catch(err){
      console.log('Query Error');
      dbconn.release();
      return false;
    }
  }
  catch(err){
    console.log('DB Error');
		return false;
  }
};

async function getRequestBoardData(page, pageSize){
  try {
    const dbconn = await dbpool.getConnection(async conn => conn);
    
    try{
      const [rows] = await dbconn.query("SELECT * from request_board LIMIT ?, ?;",[Number(page), Number(pageSize)]);
      dbconn.release();
      return rows;
    }
    catch(err){
      console.log(err);
      console.log('Query Error');
      dbconn.release();
      return false;
    }
  }
  catch(err){
    console.log('DB Error');
		return false;
  }
};

async function postRequestBoardData(insert_data){
  try{
    try{

      const dbconn = await dbpool.getConnection(async conn => conn);
      
      dbconn.execute(
        'INSERT INTO `request_board`(req_title, req_text, req_user, req_answer_yn, req_answer, req_use_yn, req_ins_date, req_upd_date) VALUES (?, ?, ?, ?, ?, ?, ?, ?)',
        insert_data, 
        function(err, results, fields){
          console.log(err);
          console.log(results);
          console.log(fields);
        }
      );
      dbconn.release();
    }
    catch(err){
      console.log('Query Error');
      dbconn.release();
      return false;
    }
  }
  catch(err){
    console.log('DB Error');
		return false;
  }
}

module.exports = {
  postRequestBoardData: postRequestBoardData,
  getRequestBoardData: getRequestBoardData,
  getRequestBoardRowNum: getRequestBoardRowNum,
};
