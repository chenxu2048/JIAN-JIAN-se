import Router from 'koa-express-router';
import * as OCRCtrl from '../controllers/OCR';
const multer = require('koa-multer');

const root = new Router();
export default root.routes();

var storage = multer.memoryStorage();
const upload = multer({storage : storage});

root.route('/OCR')
    .post(upload.any(),OCRCtrl.OCR);