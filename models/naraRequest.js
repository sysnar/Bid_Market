'use strict';
const axios = require('axios');
const iconv = require('iconv-lite');
const Iconv = require('iconv').Iconv; 
const jsdom = require('jsdom');
const { JSDOM } = jsdom;

axios.interceptors.response.use(response => {
	let ktype = response.headers["content-type"];	
	if (ktype.includes("charset=EUC-KR")) {
			response.data = iconv.decode(response.data, 'EUC-KR').toString();
	}
	return response;
});


// @params : object
// Crawl data from url
async function getNaraData(params) {
	try	{
		// Converting Parameters from UTF-8 to EUC-KR encoding
		params.instNm = await cvtEUCKR(params.instNm);
		params.bidNm = await cvtEUCKR(params.bidNm);

		let url = `http://www.g2b.go.kr:8101/ep/tbid/tbidList.do?taskClCds=${params.taskClCds}&bidNm=${params.bidNm}&searchDtType=${params.searchDtType}&fromBidDt=${params.fromBidDt}&toBidDt=${params.toBidDt}&fromOpenBidDt=${params.fromOpenBidDt}&toOpenBidDt=${params.toOpenBidDt}&radOrgan=${params.radOrgan}&instNm=${params.instNm}&area=${params.area}&regYn=${params.regYn}&bidSearchType=${params.bidSearchType}&searchType=${params.searchType}&currentPageNo=${params.currentPageNo}`;
		let options = {
			method: "GET",
			responseType: "arraybuffer"
		};
		let response = await axios.get(url, options);
		let dom	= new JSDOM(response.data);
		let document	= dom.window.document;
		let nodeList = await document.getElementsByClassName('tl');
		let results = [];
		let listNum = nodeList.length/4;

		// End if nothing searched
		if (listNum == 0){
			return 'Search Done';
		}

		// Make response into array
		for (let i=0; i < listNum; i++){
			let result = `${nodeList [i*4].textContent},${nodeList[i*4+1].textContent},${nodeList[i*4+2].textContent},${nodeList[i*4+3].textContent}`;
			results.push(result);
		}

		return results;
	}
	catch (error) {
		console.log(error);
	}
}


// @params : object
// Crawl data from url
async function getNaraData_test(params) {
	try	{
		// Converting Parameters from UTF-8 to EUC-KR encoding
		params.instNm = await cvtEUCKR(params.instNm);
		params.bidNm = await cvtEUCKR(params.bidNm);

		let url = `http://www.g2b.go.kr:8101/ep/tbid/tbidList.do?taskClCds=${params.taskClCds}&bidNm=${params.bidNm}&searchDtType=${params.searchDtType}&fromBidDt=${params.fromBidDt}&toBidDt=${params.toBidDt}&fromOpenBidDt=${params.fromOpenBidDt}&toOpenBidDt=${params.toOpenBidDt}&radOrgan=${params.radOrgan}&instNm=${params.instNm}&area=${params.area}&regYn=${params.regYn}&bidSearchType=${params.bidSearchType}&searchType=${params.searchType}&currentPageNo=${params.currentPageNo}`;
		let options = {
			method: "GET",
			responseType: "arraybuffer"
		};
		let response = await axios.get(url, options);
		let dom	= new JSDOM(response.data);
		let document	= dom.window.document;

		let nodeList = await document.getElementsByClassName('tl');
		let nodeBlue = await document.querySelectorAll('span.blue');
		let nodeUrl = await document.querySelectorAll('td.tl div a');
		let results = [];
		let listNum = nodeBlue.length;

		// End if nothing searched
		if (listNum == 0){
			return 'Search Done';
		}

		// Make response into array
		for (let i=0; i < listNum; i++){
			// let result = `${nodeList[i*4].textContent},${nodeList[i*4+1].textContent},${nodeList[i*4+2].textContent},${nodeList[i*4+3].textContent},${nodeBlue[i].textContent},${nodeUrl[i].href}`;
			let result = {
				name: nodeList[i*4].textContent,
				req: nodeList[i*4+1].textContent,
				res: nodeList[i*4+2].textContent,
				contract: nodeList[i*4+3].textContent,
				time: nodeBlue[i].textContent,
				url: nodeUrl[i].href,
			};
			results.push(result);
		}

		return results;
	}
	catch (error) {
		console.log(error);
	}
}


// @data : string
// Converting Parameters from UTF-8 to EUC-KR encoding
async function cvtEUCKR(data){
	let cvtIconv = new Iconv('utf-8', 'euc-kr'); 
	let buffer = cvtIconv.convert(data);
	let param = escape(buffer.toString('binary'));

	return param;
}


module.exports = {
  getNaraData: getNaraData,
  getNaraData_test: getNaraData_test,
  cvtEUCKR: cvtEUCKR,
};
