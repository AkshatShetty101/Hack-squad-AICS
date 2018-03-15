const express = require('express');
const fs = require('mz/fs');

const app = express();

app.use(express.static(__dirname));

app.get('/', (req, res) => {
	
});

app.get('/push', (req, res) => {
	Promise.all([
		fs.readFile('index.html'),
		fs.readFile('main.js'),
		fs.readFile('sample.png')
	]).then(files => {
		if (res.push) {
			const jsstream = res.push('/main.js', {
				req: { 'accept': '**/*' },
				res: { 'content-type': 'application/javascript' }
			});
			jsstream.on('error', err => console.log(err));
			jsstream.end(files[1]);
			
			const imgstream = res.push('/sample.png', {
				req: {'accept': '**/*'},
              	res: {'content-type': 'image/png'}
			});
			imgstream.on('error', err => console.log(err));
			imgstream.end(files[2]);
		}
		res.writeHead(200);
		res.end(files[0]);
	}).catch(err => res.status(500).send(err.toString()));
});

const creds = {
	key: fs.readFileSync('./server.key'),
	cert: fs.readFileSync('./server.crt')
};

require('spdy')
	.createServer(creds, app)
	.listen(3000, () => console.log("App listening on port 3000!"));