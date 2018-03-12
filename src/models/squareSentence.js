import { queryDb } from "../services/mysql";

/**
 * 向广场添加一条动态
 * @param {int} author_id 作者唯一标示
 * @param {Text(65536)} sentences 很多句子使用某个分隔符分开
 * @param {String(150)} thought 分享时的想法
 * @author 吴博文
 */
export async function insertSquareSentences(author_id, sentences, thoughts) {
    // const sql = `
    //     INSERT INTO square
    //     (author_user_id, sentence_id1, sentence_id2, sentence_id3, sentence_num,
    //     thoughts, add_time) VALUES
    //     (?, ?, ?, ?, ?, ?, NOW());
    // `;
    const sql = `
        INSERT INTO square
        (author_user_id, sentence, thoughts)
        VALUES(${author_id}, "${sentences}", "${thoughts}");
    `;
    console.log(sql);
    return await queryDb(sql);
}

/** 
 * 获取世界频道
 * @author 吴博文
*/
export async function getAllSquareSentences() {
    const sql = `
    SELECT square.*, user.nick_name, user.avator_url
    FROM square INNER JOIN user
    ON user.user_id = square.author_user_id
    ;
    `;
    let square_record = await queryDb(sql);
    console.log(square_record);
    return square_record;
}

/**
 * 获取某条动态的评论
 * @param {int} square_id 广场中动态的唯一标示
 * @author 吴博文
 */
export async function retriveCommentsBySquareId(square_id) {
    const sql = `
        SELECT comment.content, comment.add_time, user.nick_name, user.avator_url
        FROM comment INNER JOIN user ON comment.comment_user_id = user.user_id
        WHERE comment.square_square_id = ?;
    `;
    return await queryDb(sql, [square_id]);
}

/**
 * 向某条动态插入一条记录
 * @param {int} square_id 广场动态的标示
 * @param {String} content 评论的内容
 * @param {int} user_id 用户的唯一标示
 * @author 吴博文
 */
export async function insertCommentBySquareId(square_id, content, user_id) {
    const sql = `
        INSERT INTO comment SET
        square_square_id = ? AND
        content = ? AND
        comment_user_id = ?;
    `;
    await queryDb(sql, [square_id, content, user_id]);
}

