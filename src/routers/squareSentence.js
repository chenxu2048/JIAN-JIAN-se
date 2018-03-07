import Router from 'koa-express-router';
import * as squareSenterceCtrl from '../controllers/squareSentenceController'

const router = new Router();
export default router.routes();

router.route('/square_sentences')
      .get(squareSenterceCtrl.getSquareSenteces)
      .post(squareSenterceCtrl.postSquareSentences)
      .put(squareSenterceCtrl.putSquareSentences);