const express = require('express');
const naraRequest = require('../../models/naraRequest');
const router = express.Router();

// URL : /naraMarketplace
router.get('/', function(req, res, next){
  res.send('Response is this');
});

// URL : /naraMarketplace/list
router.get('/list', async function(req, res, next){
  let result = [];
  let pageNo = 1;

  while (true) {
    let params = {
      taskClCds: '',
      bidNm: '', // 검색어
      searchDtType: '1',
      fromBidDt: '2020/04/01', // 처음 공고 게시일 ~ 
      toBidDt: '2020/04/01', // ~ 마지막 공고 게시일
      fromOpenBidDt: '',
      toOpenBidDt: '',
      radOrgan: '2',
      instNm: '진흥원', // 수요처
      area: '',
      regYn: 'Y',
      bidSearchType: '1',
      searchType: '1',
      currentPageNo: `${pageNo}` // 현재 페이지
    };

    let data  = await naraRequest.getNaraData_test(params);

    if (data == 'Search Done'){
      break;
    }
    pageNo++;
    result.push(data);
  }

  res.send(JSON.stringify(result));
});

// URL : /naraMarketplace/list
// Method : POST
router.post('/list', async function(req, res, next){
  let result = [];
  let pageNo = 1;

  while (true) {
    let params = {
      taskClCds: '',
      bidNm: req.body.q, // 검색어
      searchDtType: '1',
      fromBidDt: req.body.s, // 처음 공고 게시일 ~ 
      toBidDt: req.body.e, // ~ 마지막 공고 게시일
      fromOpenBidDt: '',
      toOpenBidDt: '',
      radOrgan: '2',
      instNm: '진흥원', // 수요처
      area: '',
      regYn: 'Y',
      bidSearchType: '1',
      searchType: '1',
      currentPageNo: `${pageNo}` // 현재 페이지
    };

    let data  = await naraRequest.getNaraData_test(params);

    if (data == 'Search Done'){
      break;
    }
    pageNo++;
    result.push(data);
  }
  console.log(result);
  res.render('adsiter/browseResults.ejs', {data: JSON.stringify(result)});
});

module.exports = router;