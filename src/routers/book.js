import Router from 'koa-express-router';
import * as bookCtrl from '../controllers/bookController'

const router = new Router();
export default router.routes();

router.route('/books')
.get(bookCtrl.getBooks)
    .post(bookCtrl.postBook)
    .delete(bookCtrl.deleteBook);