import request from 'request-promise-native';
import { SoftError, Status, HardError } from '../../utils';
import { wechat } from '../../config';
import { pick } from '../../utils/utils';

export async function getSessionKey(js_code) {
  const grant_type = 'authorization_code';
  const {
    appId: appid,
    appSecret: secret,
  } = wechat;
  const option = {
    method: 'GET',
    uri: wechat.url.getSession,
    qs: {
      js_code,
      appid,
      secret,
      grant_type,
    },
    json: true,
  };
  let result = null;
  try {
    result = await request(option);
  } catch (e) {
    throw new HardError(Status.INTERNAL_ERROR, '访问微信服务器失败', 500, e);
  }
  const { errcode, errmsg = '原因未知' } = result;
  if (errcode !== undefined) {
    throw new SoftError(Status.BAD_REQUEST, `授权失败, ${errmsg}, ${errcode}`);
  }
  return pick(result, 'openid', 'session_key');
}
