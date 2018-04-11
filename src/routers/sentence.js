import Router from 'koa-express-router';
import * as sentenceCtrl from '../controllers/sentence';

const router = new Router();
export default router.routes();

router.param('squareId', sentenceCtrl.fetchSquareId);

router.route('/sentence')
      .get(sentenceCtrl.getSentences)
      .post(sentenceCtrl.postSentence)
      .delete(sentenceCtrl.deleteSentences);

router.route('/sentence/:squareId')
      .post(sentenceCtrl.pickSentenceFromSquare);