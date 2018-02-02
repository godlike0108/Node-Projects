const http = require('http');
const fs = require('fs');
const path = require('path');
const uuidv1 = require('uuid/v1');


const downloadPage = (url='nodeprogram.com') => {

	console.log(`Start downloading: ${url} ...`)	
	// 定義存取網頁的函式
	const fetchPage = (urlF, callback) => {
		// GET 該網頁
		http.get(urlF, res => {
			let buff = '';
			res.on('data', (chunk) => {
				buff += chunk;
			});
			res.on('end', (chunk) => {
				callback(null, buff);
			})
		}).on('error', (err) => {
			console.error(`Got error: ${error.message}`);
			callback(err);
		})
	};

	// 產生 uuid
	const folderName = uuidv1();
	// 開名字為 uuid 的資料夾
	fs.mkdirSync(folderName);
	// 把存取的網頁轉成檔案放進去
	fetchPage(url, (error, data) => {
		if(error) return console.log(error);
		// 存網址
		fs.writeFileSync(path.join(__dirname, folderName, 'url.txt'), url);
		// 存網頁
		fs.writeFileSync(path.join(__dirname, folderName, 'file.html'), data);
		console.log(`Downloading is done in folder: ${folderName}`);
	});
};

downloadPage(process.argv[2]);




