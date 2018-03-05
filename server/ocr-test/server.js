const express = require('express');
const path = require('path');

const app = express();

app.use(express.static(path.join(__dirname)));

app.listen(3000, () => console.log("App listening on port 3000!\nOpen console to check OCR progress!\nTry out different images in index.html"));