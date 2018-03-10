import { queryDb } from "../services/mysql";
import { SoftError, Status } from "../utils";

/**
 * 向某位用户的书架添加一本书
 * @param {String(13)} isbn 
 * @param {int} user_id
 * @author 吴博文
 */
export async function createBook(isbn, user_id) {
    const sql = `
    INSERT INTO book SET ?;
    `;
    try {
        const result = await queryDb(sql, {isbn, user_id});
    } catch (err) {
        throw new SoftError(Status.INTERNAL_ERROR, 'DB ERROR WHEN POST NEW BOOK');
    }
}

/**
 * 删除某位用户的一本书以及对应的书摘
 * @param {String(13)} isbn
 * @param {int} user_id
 * @author 吴博文
 */
export async function removeBook(isbn, user_id) {
    const sql = `
    DELETE FROM book where ?;
    `;
    await queryDb(sql, {isbn, user_id});
}

/**
 * 获取某一用户书架上的书
 * @param {String(13)} isbn
 * @param {int} user_id
 * @author 吴博文
 */
export async function retrieveBooks(user_id) {
    // 获取图书列表以及图书信息
    const sql = `
    SELECT book_info.*
    FROM book LEFT JOIN book_info
    ON book.isbn=book_info.isbn
    WHERE book.user_id = ?;
    `;
    const result = await queryDb(sql, [user_id]);
    console.log(result);
    return result;
}
