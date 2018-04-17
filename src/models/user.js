import { queryDb } from '../services/mysql';
import { open } from 'fs';

/**
 * 通过open_id获取用户信息
 * @param {string} open_id 微信用户的openid
 */
export async function retrieveUserByOpenId(open_id) {
  const sql = `
    SELECT * FROM user
      WHERE user.open_id = ?;
  `;
  return queryDb(sql, [open_id]);
}

/**
 * 创建一个新用户
 * @param {string} open_id 用户open_id
 * @param {string} nick_name 昵称
 * @param {string} avator_url 头像URL
 */
export async function createUser(open_id, nick_name, avator_url) {
  const sql = `
    INSERT INTO user
      SET ?;
  `;
  await queryDb(sql, { open_id, nick_name, avator_url });
  const [user] = await retrieveUserByOpenId(open_id);
  return user;
}

export async function getUserByUserId(user_id) {
  const sql = `
    SELECT * FROM user
      WHERE user_id = ?;
  `;
  return queryDb(sql, [user_id]);
}

export async function updateUserInfo(open_id, nick_name, avator_url) {
  const sql = `
    UPDATE IGNORE
      user
    SET
      user.nick_name=${nick_name}
      , user.avator_url=${avator_url}
    WHERE
      user.open_id=${open_id};
  `;
  await queryDb(sql);
}