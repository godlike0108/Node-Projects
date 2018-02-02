// 版本一，先讀整個檔案再處理

const fs = require('fs');
const path = require('path');

// 轉檔
const csvToJson = (url='customer-data.csv') => {

	// ES5 寫法: var url = url || 'customer-data.csv';

	// 先存取整個檔案
	const csvData = fs.readFileSync(url, 'utf8').trim();
	
	// 轉換成陣列
	const csvDataArray = csvData.split('\r\n');

	// 把標頭取出
	const headerList = csvDataArray.shift().split(',');

	// 用來裝轉檔的陣列
	const jsonData = [];

	csvDataArray.forEach(data => {
		let dataBlock = {};
		data.split(',').forEach((item, index) => {
			dataBlock[headerList[index]] = item;
		})
		// console.log(dataBlock)
		jsonData.push(dataBlock);
	});

	// 拆出 名字
	const fileName = url.split('.').shift();
	console.log(fileName);
	// 寫入 data
	fs.writeFileSync(path.join(__dirname, `${fileName}.json`), JSON.stringify(jsonData, null, '\t'));
}

csvToJson(process.argv[2]);

// 版本二

