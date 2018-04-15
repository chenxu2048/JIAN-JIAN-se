import { queryDb, transaction } from "../services/mysql";

/**
 * 向广场添加一条动态
 * @param {int} author_id 作者唯一标示
 * @param {Text(65536)} sentences 很多句子使用某个分隔符分开
 * @param {String(150)} thought 分享时的想法
 * @param {String(13)} isbn 书的唯一标示
 * @author 吴博文
 */
export async function insertSquareSentences(author_id, sentences, thoughts, isbn) {
    // const sql = `
    //     INSERT INTO square
    //     (author_user_id, sentence_id1, sentence_id2, sentence_id3, sentence_num,
    //     thoughts, add_time) VALUES
    //     (?, ?, ?, ?, ?, ?, NOW());
    // `;
    return transaction(insertSquareSentencesImpl);
    /**
     * 事务中向广场添加一条动态
     * @param {Connection} conn 
     */
    async function insertSquareSentencesImpl(conn) {
        const sql = `
            INSERT
                INTO square
                SET ?;
        `;
        const { insertId } = await queryDb(sql, { author_user_id: author_id, isbn ,thoughts}, conn);
        const addSentences = `
        INSERT
            INTO square_sentence(square_id, sentence_id)
            VALUES ?;
        `;

        const values = [];
        for (let i of sentences) {
            values.push([insertId, i]);
        }
        await queryDb(addSentences, [values], conn);
    }
    // const sql = `
    //     INSERT INTO square
    //     (author_user_id, sentence, thoughts, isbn)
    //     VALUES(${author_id}, "${sentences}", "${thoughts}", "${isbn}");
    // `;
    // console.log(sql);
    // return await queryDb(sql);
}

/** 
 * 获取世界频道
 * @author 吴博文
*/
export async function getAllSquareSentences() {
    const sql = `
    SELECT
        square.*,
        user.nick_name,
        user.avator_url,
        book_info.*,
        CONCAT(
            "[",
            GROUP_CONCAT(
                 JSON_OBJECT(
                    "sentence_id", sentence.sentence_id,
                    "content", content,
                    "thought", thought
                )
                SEPARATOR ", "
            ),
            "]"
        ) AS sentences
    FROM
        square
        NATURAL JOIN square_sentence
        INNER JOIN sentence
            ON square_sentence.sentence_id = sentence.sentence_id
        LEFT JOIN user
            ON user.user_id = square.author_user_id
        INNER JOIN book_info
            ON square.isbn = book_info.isbn
    GROUP BY square.square_id
    ORDER BY square.add_time DESC
    ;
    `;
    let square_record = await queryDb(sql);
    return square_record.map((record) => {
        try {
            record.sentences = JSON.parse(record.sentences);
        } catch (e) {}
        return record;
    });
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

/**
 * 点赞
 * @param {Number} square_id 广场id
 * @param {Number} user_id 用户id
 */
export async function addZan(square_id, user_id) {
    const sql = `
        INSERT
            INTO zan_record
        SET ?;
    `;
    return await queryDb(sql, { square_id, user_id });
}

export async function pickSentences(square_id, user_id) {
    const sql = `
        SELECT
            S.sentence_id AS sentence_id,
            S.content AS content,
            S.thought AS thought,
            SQ.isbn AS isbn
        FROM
            square AS SQ
            INNER JOIN square_sentence AS SS
                ON SQ.square_id = SS.square_id
            INNER JOIN sentence AS S
                ON SS.sentence_id = S.sentence_id
        WHERE
            SQ.square_id = ?
            AND SQ.author_user_id != ?
        ;
    `
    return await queryDb(sql, [square_id, user_id]);
}

export async function retriveSquareById(squareId) {
    const sql = `
        SELECT
            *
        FROM square
        WHERE square_id = ?;
    `;
    return queryDb(sql, [squareId]);
}

export async function insertZanRecord(square_id, zan_user_id) {
    const sql = `
        INSERT IGNORE
        INTO zan_record
        SET ?;
    `;
    await queryDb(sql, {square_id, zan_user_id});
}

export async function removeZanRecord(square_id, zan_user_id) {
    const sql = `
        DELETE IGNORE
        FROM
            zan_record
        WHERE
            ?;
    `;
    await queryDb(sql, {square_id, zan_user_id});
}


/**
 * 获取某条动态的赞的个数
 * @param {number} square_id 动态id
 */
export async function getZanNum(square_id) {
    const sql = `
        SELECT COUNT(*)
        FROM
            zan_record
        WHERE
            ?;
    `;
    return await queryDb(sql, {square_id});
}

/**
 * 根据给定条件查找点赞记录
 */
export async function retriveZanRecord(square_id, zan_user_id) {
    const sql = `
        SELECT
            *
        FROM
            zan_record
        WHERE
            ?;
    `;
    return await queryDb(sql, {square_id, zan_user_id});
}