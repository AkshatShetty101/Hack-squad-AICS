const express = require('express');
const path = require('path');

const app = express();

app.use(express.static(path.join(__dirname)));

app.listen(3300, () => console.log("App listening on port 3300!\nOpen console to check OCR progress!\nTry out different images in index.html"));