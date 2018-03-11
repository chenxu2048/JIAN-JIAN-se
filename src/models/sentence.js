import { queryDb } from "../services/mysql";
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