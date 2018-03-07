import Router from 'koa-express-router';
import * as sentenceCtrl from '../controllers/sentenceController'

const router = new Router();
export default router.routes();

router.route('/sentence')
      .get(sentenceCtrl.getSentences)
      .post(sentenceCtrl.postSentence);