const express = require('express');
const boardFunction = require('../../../models/boardFunction');
const router = express.Router();

// URL : /main/requests
router.get('/', async function(req, res, next){
  const page = req.query.page;
  const pageSize = req.query.pageSize;
  let boardData = await boardFunction.getRequestBoardData(page, pageSize);
  let boardRowNum = await boardFunction.getRequestBoardRowNum(page, pageSize);

  let data = {
    boardData: boardData,
    boardRowNum: boardRowNum,
  };

  res.render('requests/requests.ejs', data);
});

// URL : /main/requests/form
router.get('/form', function(req, res, next){
  res.render('requests/request_form.ejs');
});

// URL : /main/requests/form
router.post('/form', function(req, res, next){
  
  let params = [req.body.title, req.body.content, 'Test_User', 'n', '', 'y', '1111', '1111'];
  console.log(params);
  boardFunction.postRequestBoardData(params);
  
  res.redirect('/main/requests?page=0&pageSize=10');
});

module.exports = router;