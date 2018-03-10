import { queryDb } from "../services/mysql";

/**
 * 向广场添加一条动态
 * @param {int} author_id 作者唯一标示
 * @param {Text(65536)} sentence 很多句子使用某个分隔符分开
 * @param {String(150)} thoughts 分享时的想法
 * @author 吴博文
 */
export async function insertSquareSentences(author_id, sentence, thoughts) {
    // const sql = `
    //     INSERT INTO square
    //     (author_user_id, sentence_id1, sentence_id2, sentence_id3, sentence_num,
    //     thoughts, add_time) VALUES
    //     (?, ?, ?, ?, ?, ?, NOW());
    // `;
    const sql = `
        INSERT INTO square SET author_user_id = ? AND sentence = ? AND thoughs = ?;
    `
    return await queryDb(sql, [author_id, sentence, thoughts]);
}

/** 
 * 获取世界频道
*/
export async function getAllSquareSentences() {
    const sql = `
    SELECT * FROM square;
    `;
    let square_record = await queryDb(sql);
    console.log(square_record);
    return square_record;
}

/**
 * 获取某条动态的评论
 * @param {int} square_id 广场中动态的唯一标示
 */
export async function retriveCommentsBySquareId(square_id) {

}