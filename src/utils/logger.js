import { formattedNow } from './utils';

const logLevels = [
  'debug',
  'info',
  'warn',
  'error',
];

const logger = getLogger();

export default logger;

/**
 * 日志函数
 * @param {Context} ctx
 * @param {(): Promise<any>} next
 */
export async function logRequest(ctx, next) {
  const start = process.hrtime();
  await next();
  const elapsed = process.hrtime(start);
  const interval = `${(elapsed[0] * 1000 + elapsed[1] / 1e6).toFixed(3)} ms`;

  const {
    body: { msg = '', status = '' } = {},
    session = {},
    status: statusNum,
    method,
    originalUrl,
  } = ctx;

  const { extMsg } = ctx.paramData;

  const urlText = originalUrl && `- ${decodeURIComponent(originalUrl)}` || '';
  const statusText = status && `- ${status}` || '';
  const extMsgText = extMsg && `- ${extMsg}` || '';
  const msgText = msg && `${msg}${extMsgText}` || '';

  let logging = logger.info;
  const user = session.user || '未登录';
  if (statusNum >= 400 && statusNum < 400) {
    logging = logger.warn;
  } else if (statusNum >= 500) {
    logging = logger.error;
  }
  logging(`${formattedNow()} ${method} ${interval} ${urlText}${statusText} | ${user}: ${msgText}`);
}

function getLogger() {
  const _logger = console;
  for (const level of logLevels) {
    _logger[`${level}Timed`] = (...args) => _logger[level](formattedNow(), ...args);
  }
  return _logger;
}
