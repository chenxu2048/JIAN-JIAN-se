import * as DriftingModel from '../models/drifting';
import { sendData, SoftError, Status } from '../utils';

/**
 * 获取路由中的drifting_id
 * @param {Context} ctx
 * @param {() => Promise<any>} next
 * @param {string} drifting_id
 */
export async function fetchDriftingId(ctx, next, drifting_id) {
  const [drifting] = await DriftingModel.retrieveDriftingById(drifting_id);
  if (!drifting) throw new SoftError(Status.BAD_REQUEST, '不存在此漂流');
  // 我不确定是否这样fetch参数
  ctx.paramData.drifting_id = drifting_id;
  return next();
}

/**
 * 获取漂流信息
 * @param {Context} ctx
 */
export async function getMyDrifting(ctx) {
  const { user_id } = ctx.paramData.session;
  const driftings = await DriftingModel.retrieveDriftingByUserId(user_id);
  sendData(ctx, { driftings });
}

/**
 * 获取某本图书的漂流信息
 * @param {Context} ctx
 */
export async function getBookDritfing(ctx) {
  const { isbn } = ctx.paramData.query;
  const driftings = await DriftingModel.retrieveDriftingByISBN(isbn);
  sendData(ctx, { driftings });
}

/**
 * 删除自己的漂流信息
 * @param {Context} ctx
 */
export async function dropBookDritfing(ctx) {
  // const { drifting_id } = ctx.paramData;
  // const { user_id } = ctx.paramData.session;
  /**
   * Edited by 吴博文
   */
  const {
    drifting_id,
    session : {
      user : {user_id}
    }
  } = ctx.paramData;
  console.log(ctx.paramData);
  const { affectedRows } = await DriftingModel.removeDrifting(drifting_id, user_id);
  const success = affectedRows >= 1;
  sendData(ctx, { success });
}


/**
 * 创建新的图书漂流
 * @param {Context} ctx
 */
export async function createDritfing(ctx) {
  const { user_id } = ctx.paramData.session.user;
  console.log(user_id);
  const { isbn, content } = ctx.paramData.body;
  const { insertId: drifting_id } = await DriftingModel.createDrifting(user_id, isbn, content);
  sendData(ctx, { drifting_id });
}

export async function updateDriftingContent(ctx) {
  const {
    session: { user : {user_id} },
    body: { content } = {},
    drifting_id
  } = ctx.paramData;
  console.log(`${drifting_id}`);
  const {
    affectedRows,
    changedRows,
  } = await DriftingModel.updateContent(drifting_id, user_id, content);
  const success = affectedRows > 0;
  const update = changedRows > 0;
  sendData(ctx, { update, success });
}

export async function getAllDrifting(ctx) {
  const result = await DriftingModel.retrieveAllDrifting();
  sendData(ctx, {result});
}