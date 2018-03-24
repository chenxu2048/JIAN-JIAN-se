import { queryDb } from "../services/mysql";

/**
 * 遍历某条动态的评论以及用户的头像nickname等信息
 * @param {Int} squareId 动态的唯一标示
 * @author 吴博文
 */
export async function retriveCommentBySquareId(squareId) {
    const sql = `
    SELECT * FROM
    comment LEFT JOIN user
    ON comment.comment_user_id = user.user_id
    WHERE comment.square_square_id = ${squareId};
    `;
    return await queryDb(sql);
}

/**
 * 
 * @param {Int} squareId 动态的唯一标示
 * @param {Int} user_id 用户的唯一标示
 * @param {varchar(140)} content 评论的内容
 */
export async function addCommentBySquareId(squareId, user_id, content) {
    const sql = `
    INSERT INTO comment
    (square_square_id, comment_user_id, content)
    VALUES(?, ?, ?);
    `;
    await queryDb(sql, [squareId, user_id, content]);
}