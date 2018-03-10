import { queryDb } from "../services/mysql";

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
 */
export async function insertSentenceByISBN(ISBN, user_id, content) {

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
    SELECT sentence.content FROM
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
