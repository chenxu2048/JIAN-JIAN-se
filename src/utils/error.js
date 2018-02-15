export const OK = 'OK';
export const BAD_REQUEST = 'BAD_REQUEST';
export const NOT_AUTHORIZED = 'NOT_AUTHORIZED';
export const NO_PERMISSION = 'NO_PERMISSION';
export const NOT_FOUND = 'NOT_FOUND';
export const UNKNOWN_ERROR = 'UNKNOWN_ERROR';
export const INTERNAL_ERROR = 'INTERNAL_ERROR';

export const Status = {
  OK,
  BAD_REQUEST,
  NOT_AUTHORIZED,
  NO_PERMISSION,
  NOT_FOUND,
  UNKNOWN_ERROR,
  INTERNAL_ERROR,
};

const map = {
  OK: 200,
  BAD_REQUEST: 400,
  NOT_AUTHORIZED: 401,
  NO_PERMISSION: 403,
  NOT_FOUND: 404,
  UNKNOWN_ERROR: 500,
  INTERNAL_ERROR: 500,
};

/**
 * 从状态转换为状态码
 * @param {string} status
 *
 */
function statusToCode(status) {
  return map[status] || 500;
}


class ErrorBase extends Error {
  /**
   * 构造基础异常
   * @param {string} status 状态
   * @param {string} msg 附带消息
   * @param {number} [code] 状态码
   * @param {Error|string} [e] 异常
   * @param {any} [data] 附加数据
   */
  constructor(status, msg, code = statusToCode(status), e = undefined, data = undefined) {
    super(e || msg);
    this.name = Reflect.getPrototypeOf(this).constructor.name;
    let stack = '--------------------';
    if (e instanceof Error) {
      stack = e.stack.split('\n');
      stack[0] = '--------------------';
      stack = stack.join('\n');
    }
    this.ctx = {
      status,
      msg,
    };
    if (code !== undefined) { Object.assign(this.ctx, { code }); }
    if (data !== undefined) { Object.assign(this.ctx, { data }); }

    this.stack += `\n${stack}\nContext: ${JSON.stringify(this.ctx)}`;
  }
}

export class SoftError extends ErrorBase {
}

export class HardError extends ErrorBase {
}
