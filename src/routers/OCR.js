import Router from 'koa-express-router';
import * as OCRCtrl from '../controllers/OCR';

const root = new Router();
export default root.routes();

root.route('/OCR')
    .post(OCRCtrl.OCR);