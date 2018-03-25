import Router from 'koa-express-router';
import { addComment, getComment } from '../controllers/comment';

const router = new Router();
export default router.routes();

router.route('/comment')
    .get(getComment)
    .post(addComment);