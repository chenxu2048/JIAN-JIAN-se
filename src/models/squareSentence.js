import { queryDb } from "../services/mysql";

/**
 * 向广场添加一条动态
 * @param {int} author_id 作者唯一标示
 * @param {int} sentence_num 分享的句子数量（1～3）
 * @param {String(150)} thoughts 分享时的想法
 * @param {int} sentence_id1 分享的第一句
 * @param {int} sentence_id2 分享的第二句
 * @param {int} sentence_id3 分享的第三句
 * @author 吴博文
 */
export async function insertSquareSentences(author_user_id, sentence_num, thoughts, sentence_id1, sentence_id2 = null, sentence_id3 = null) {
    // const sql = `
    //     INSERT INTO square
    //     (author_user_id, sentence_id1, sentence_id2, sentence_id3, sentence_num,
    //     thoughts, add_time) VALUES
    //     (?, ?, ?, ?, ?, ?, NOW());
    // `;
    const sql = `
        INSERT INTO square SET ?;
    `
    return await queryDb(sql, {author_user_id, sentence_num, thoughts,
                                sentence_id1, sentence_id2, sentence_id3});
}

/** 
 * 获取世界频道
*/
export async function getAllSquareSentences() {
    const sql = `
    SELECT * FROM 
    `
}