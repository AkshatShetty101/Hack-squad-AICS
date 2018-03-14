# Server codebase

Nodejs **v8.9.4** is required
To run the server:
1. `npm install` in directory
2. `npm start` in any directory should run the server
3. Navigate to `localhost:3000` on your browser

## Details

1. ocr-test: Optical Character Recognition using [Tesseract](https://github.com/naptha/tesseract.js). The image should be of high quality. Test images are provided. Change the image source in `index.html` and reload page to test with other images.
2. quill-test: [WYSIWYG text editor](https://quilljs.com).
3. sse-test: Server Sent Events. Run this and electron app using dist-sse to see how SSE works. In this, there are 2 ways to implement it. One is the custom sse.js and other is sse-express node-module. Both work perfectly (route to `/push` for sse).
4. tag-test: 
5. translate-test: 
6. http2-push-test: Using HTTP2 push event files(apart from index.html) from server are sent to client even before it is requested. 
