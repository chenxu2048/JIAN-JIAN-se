import { SoftError } from './error';
import logger, { Status } from './logger';
import { isInDev } from '../config';

export { promisifyAll, formattedNow } from './utils';
export { SoftError, HardError, Status } from './error';
export { logRequest, default as logger } from './logger';

export async function catchError(ctx, next) {
  try {
    await next();
  } catch (e) {
    if (e instanceof SoftError) {
      return sendData(ctx, e);
    }
    return handleError(ctx, e);
  }
}

/**
 * @description 发送非服务器内部错误
 *
 * @param  {Object}    ctx
 * @param  {Object}    data            发送数据
 * @param  {String}    [status]        状态枚举码，默认 OK
 * @param  {String}    [msg]           状态枚举码对应的信息， 默认 Success
 * @param  {Number}    [statusCode]    HTTP 状态码, 默认 200
 *
 * @author 陈序
 */
export async function sendData(ctx, data = {}, status = 'OK', msg = 'Success', code = 200) {
  if (data instanceof SoftError) {
    ({
      status: status = 'BAD_REQUEST',
      msg: msg = '请求非法',
      code: code = 400,
    } = data.ctx || {});
    data = data.ctx.data || {};
  }
  ctx.status = code;
  ctx.body = {
    status,
    msg,
    data,
    time: new Date(),
  };
}

const defaultErrMsg = '严重！未知内部错误！';
/**
 * @description 处理服务器内部错误
 *
 * @param  {Object}    ctx
 * @param  {HardError} e             Error 对象
 * @param  {String}    [status]      状态枚举码，默认 UNKNOWN
 * @param  {String}    [msg]         状态枚举码对应的信息，默认 Unknown Error
 * @param  {Number}    [statusCode]  HTTP 状态码, 默认 500
 *
 * @author 陈序
 */
export async function handleError(ctx, e) {
  const {
    info: {
      code = 500,
      status = Status.INTERNAL_ERROR,
      msg = defaultErrMsg,
    } = {},
    stack,
  } = e;
  ctx.status = code;
  ctx.body = {
    status,
    msg,
    stack,
    time: new Date(),
  };
  logger.error(`Error Occur:\nstatus: ${status}\nmsg: ${msg}\nstack: ${stack}`);
}
