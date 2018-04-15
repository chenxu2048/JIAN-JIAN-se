import Router from 'koa-express-router';
import * as userCtrl from '../controllers/user';

const router = new Router({ prefix: '/user' });
export default router.routes();

router.route('/login')
  .get(userCtrl.isLogin)
  .post(userCtrl.login);

router.route('/self')
  .get(userCtrl.getSelf);