import Router from 'koa-express-router';

const router = new Router();
export default router.routes();

router.route('/square_comment')
    .get()
    .post();