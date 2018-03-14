const express = require('express');
const path = require('path');
// const sse = require('sse-express'); // https://www.npmjs.com/package/sse-express
const sse = require('./sse'); // custom module

const app = express();

app.get('/', sse, (req, res) => {
	let count = 1, timer;
	res.sseSetup();
	if(timer) {
		clearInterval(timer);
	}
	timer = setInterval(()=> {
		const data = `${count++}. Time: ${new Date().toLocaleString()}`;
		res.sseSend(data);
		// res.sse('', data);
	}, 2000);
});

app.listen(3000, () => console.log("App listening on port 3000!"));