import * as User from '../models/user';
import * as WeChServ from '../services/wechat';
import { sendData, Status } from '../utils';
/**
 * 用户登录
 * @param {Context} ctx
 */
export async function login(ctx) {
  const {
    code,
    nickname,
    avatar,
  } = ctx.paramData.body;
  const { openid, sessionKey } = await WeChServ.getSessionKey(code);
  let [user] = await User.retrieveUserByOpenId(openid);
  if (user === undefined) {
    user = await User.createUser(openid, nickname, avatar);
  }
  user.sessionKey = sessionKey;
  ctx.session.user = user;
  sendData(ctx, {}, Status.OK, `用户${user.nick_name}登录成功`);
}

/**
 * 判断是否登录
 * @param {Context} ctx
 */
export async function isLogin(ctx) {
  const { user } = ctx.session;
  if (user) {
    return sendData(ctx, {}, Status.OK, '已登录');
  }
  return sendData(ctx, {}, Status.NOT_AUTHORIZED, '未登录');
}
