import KoaRouter from 'koa-express-router';
import * as DriftingCtrl from '../controllers/drifting';

const DriftingRtr = new KoaRouter();
export default DriftingRtr.routes();

// DriftingRtr.get(
//   '/',
//   DriftingCtrl.getMyDrifting
// );

DriftingRtr.param('drifting_id', DriftingCtrl.fetchDriftingId);

DriftingRtr.route('/driftings/:drifting_id')
  .get(DriftingCtrl.getAllDrifting)
  .post(DriftingCtrl.createDritfing)
  .put(DriftingCtrl.updateDriftingContent)
  .delete(DriftingCtrl.dropBookDritfing);
