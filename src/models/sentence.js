import { queryDb, transaction } from "../services/mysql";
import book from "../routers/book";

/**
 * 添加书摘
 * @param {int} book_id 书籍唯一标示
 * @param {String} content 内容
 * @author 吴博文
 */
export async function insertSentenceByBookId(book_id, content) {
    const sql = `
    INSERT INTO sentence (book_id, content, add_time) VALUES (?, ?, NOW())
    `;
    const result = await queryDb(sql, [book_id, content]);
    console.log(`Insert Sentence ${result}`);
}

/**
 * 
 * @param {String(13)} ISBN 书籍ISBN
 * @param {int} user_id 用户唯一标示
 * @param {String} content 内容
 * @param {String} thought 想法
 */
export async function insertSentenceByISBN(ISBN, user_id, content, thought) {
    // 首先获取该图书的book_id
    const book_id_query = await queryDb(`SELECT book.book_id FROM book
                            WHERE book.user_id = ${user_id}
                            AND book.isbn = ${ISBN};`);
    const book_id = book_id_query[0].book_id;
    // const sql = `
    // INSERT INTO sentence SET
    // book_id = (SELECT book.book_id FROM book
    //     WHERE book.user_id = ${user_id}
    //     AND book.isbn = ${ISBN})
    // AND content = '${content}'
    // AND thought = '${thought}';
    // `;
    const sql = `
    INSERT INTO sentence
    (book_id, content, thought)
    VALUES (${book_id}, '${content}', '${thought}');
    `;
    console.log(sql);
    await queryDb(sql);
}
/**
 * 获取某本书的书摘
 * @param {int} ISBN 书籍ISBN
 * @param {int} user_id 用户唯一标示
 * @param {int} num 获取书摘的最大数量，默认返回全部
 * @author 吴博文
 */
export async function retriveSentencesByISBN(ISBN, user_id, num = 1000) {
    console.log(typeof num);
    const sql = `
    SELECT sentence.content, sentence.thought, sentence.sentence_id FROM
    book INNER JOIN sentence
    ON book.book_id = sentence.book_id
    WHERE book.isbn = ? AND book.user_id = ?
    LIMIT ${num};
    `;
    console.log(sql);
    const result = await queryDb(sql, [ISBN, user_id]);
    console.log(result);
    return result;
}

/**
 * 删除属于某个用户的句子，如果此句子不属于特定的用户，
 * 则没有任何操作
 * @param {int} sentence_id 句子唯一标示
 * @param {int} user_id 用户唯一标示
 */
export async function removeSentence(sentence_id, user_id) {
    const sql = `
    DELETE sentence
    FROM sentence INNER JOIN book ON
    book.book_id = sentence.book_id
    WHERE sentence.sentence_id = ?
    AND book.user_id = ?;
    `;
    return await queryDb(sql, [sentence_id, user_id]);
}

/**
 * 从广场上批量摘抄
 * @param {Number} user_id 用户id
 * @param {Number} square_id 摘抄的广场id
 */
export async function addBulkSentences(user_id, square_id) {

    return transaction(addBulkSentencesImpl);
    /**
     * 批量摘抄，事务中完成
     * @param {Connection} conn
     */
    async function addBulkSentencesImpl(conn) {
        const addBooks = `
            INSERT IGNORE
            INTO book(user_id, isbn)
                SELECT DISTINCT
                    ? AS user_id,
                    B.isbn AS isbn
                FROM
                    square AS SQ
                    INNER JOIN square_sentence AS SS
                        ON SQ.square_id = SS.square_id
                    INNER JOIN sentence AS S
                        ON SS.sentence_id = S.sentence_id
                    INNER JOIN book AS B
                        ON S.book_id = B.book_id
                WHERE
                    SQ.square_id = ?
                    AND SQ.author_user_id != ?
                ORDER BY B.isbn
            ;
        `;
        await queryDb(addBooks, [user_id, square_id, user_id], conn);
        const addSentences = `
            INSERT
            INTO sentence(book_id, content, thought)
                SELECT
                    OB.book_id AS book_id,
                    OS.content AS content,
                    OS.thought AS thought
                FROM (
                    SELECT
                        B.isbn AS isbn,
                        S.content AS content,
                        S.thought AS thought
                    FROM
                        square AS SQ
                        INNER JOIN square_sentence AS SS
                            ON SQ.square_id = SS.square_id
                        INNER JOIN sentence AS S
                            ON SS.sentence_id = S.sentence_id
                        INNER JOIN book AS B
                            ON B.book_id = S.book_id
                    WHERE
                        SQ.square_id = ?
                        AND SQ.author_user_id != ?
                        AND B.user_id = ?
                    ) AS OS
                    INNER JOIN book AS OB
                        ON OS.isbn = OB.isbn
                WHERE
                    OB.user_id = ?
                ORDER BY OB.book_id
            ;
        `;
        await queryDb(addSentences, [square_id, user_id, user_id, user_id], conn);
    }
}