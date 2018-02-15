import moment from 'moment';
import { promisify } from 'util';

export function formattedNow() {
  return moment(new Date()).format('YYYY-MM-DD HH:mm:ss.SSS');
}

/**
 * 对于对象的所有普通函数进行promisify
 * @param {Obj} obj
 * @param {string} suffix
 * @return {Obj}
 */
export function promisifyAll(obj, suffix = 'Async') {
  for (const [key, fn] of Object.entries(obj)) {
    const asyncKey = `${key}${suffix}`;
    const isNormalFunction = (Object.prototype.toString.call(fn) === '[object Function]');
    const hasAsyncKey = Reflect.hasOwnProperty.call(obj, asyncKey);

    if (!isNormalFunction && hasAsyncKey) {
      continue;
    }

    Object.assign(obj, { [asyncKey]: promisify(fn) });
  }
  return obj;
}
