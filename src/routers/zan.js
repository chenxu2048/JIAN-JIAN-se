import Router from 'koa-express-router';
import * as zanCtrl from '../controllers/zan';

const router = new Router();
export default router.routes();

router.route('/zan')
        .post(zanCtrl.zanSquare)
        .delete(zanCtrl.cancleZanSquare);