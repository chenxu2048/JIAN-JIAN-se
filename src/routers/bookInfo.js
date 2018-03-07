import Router from 'koa-express-router';
import * as bookInfoCtrl from '../controllers/bookInfo'
import book from './book';

const router = new Router();
export default router.routes();

router.route('/isbn')
      .get(bookInfoCtrl.queryBookInfo);