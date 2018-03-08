import mysql from 'mysql';
import Connection from 'mysql/lib/Connection';
import Pool from 'mysql/lib/Pool';
import { promisifyAll } from '../../utils';
import { mysql as db } from '../../config';
import { HardError, Status } from '../../utils/error';

promisifyAll(Connection.prototype);
promisifyAll(Pool.prototype);

const option = {
  ...db,
  connectionLimit: 10,
};

export const pool = mysql.createPool(option);

/**
 * 封装数据库查询
 * @param {string} sql
 * @param {any[]} values
 * @param {DbConnection} conn
 */
export async function queryDb(sql, values = undefined, conn = pool) {
  try {
    return await conn.queryAsync(sql, values);
  } catch (e) {
    throw new HardError(Status.INTERNAL_ERROR, '数据库查询出错', 500, e);
  }
}

/**
 * 封装数据库事务
 * @param {(DbConnection) => Promise<void>} func
 */
export async function transaction(func) {
  /** @type {DbConnection} */
  let conn = null;
  let funcError = false;
  try {
    conn = await pool.getConnectionAsync();
    await conn.beginTransactionAsync();

    try {
      await func(conn);
    } catch (e) {
      funcError = true;
    }

    await conn.commitAsync();
  } catch (e) {
    if (conn) {
      try {
        await conn.rollbackAsync();
      } catch (_e) {
        e.stack += `\n--------------------\n${_e.stack}`;
      }
    }

    if (funcError) {
      throw e;
    }

    throw new HardError(Status.INTERNAL_ERROR, '数据库事务失败', 500, e);
  } finally {
    // release connection
    if (conn) conn.release();
  }
}
