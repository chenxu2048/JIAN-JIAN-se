import { queryDb } from "../services/mysql";
import { resolveISBN } from "../services/ISBNService";
import { SoftError, Status } from "../utils";

/**
 * 在数据库中查找是否有该书籍信息，若没有，则采用线上API获取
 * @param {String(13)} ISBN 
 */
export async function getBookInfo(ISBN) {
    // 在数据库中查找
    const result = await getBookInfoFromDb(ISBN);
    console.log(result);
    // 如果没有，去豆瓣api获取
    if (result.length == 0) {
        const queryResult = await resolveISBN(ISBN);
        // 返回结果，并将该条记录插入数据库，此处不需要await
        await insertBookInfo(queryResult.isbn, queryResult.title,
                        queryResult.author, queryResult.title_page_url);
        return queryResult;
    }
    return result[0];
}
/**
 * 从数据库中获取book_info
 * @param {String(13)} ISBN 
 * @author 吴博文
 */
async function getBookInfoFromDb(ISBN) {
    return await queryDb(`SELECT * FROM book_info WHERE isbn='%{ISBN}'`, []);
}
/**
 * 向书籍信息表中插入一条数据
 * @param {String(13)} ISBN 
 * @param {String} title 
 * @param {String} author
 * @param {String} title_page_image 
 * @author 吴博文
 */
async function insertBookInfo(ISBN, title, author, title_page_image) {
    // const sql = `INSERT INTO book_info (isbn, title, author, title_page_image)
    //             VALUES ('?', '?', '?', '?');`;
    const sql = `INSERT INTO book_info SET ?;`;
    await queryDb(sql, {ISBN, title, author, title_page_image});
}

/**
 * 由于book表与book_info表之间的约束
 * 插入书籍之前需要保证书籍信息存在于book_info中
 * @param {String(13)} ISBN
 * @author 吴博文
 */
export async function makeBookInfoExist(isbn) {
    // 在数据库中查找
    const sql = `
        SELECT * from book_info WHERE ?;
    `;
    const result = await queryDb(sql, {isbn});
    console.log(`makeBookInfoExist${result}`);
    if (result.length == 0) {
        const queryResult = await resolveISBN(isbn);
        if (queryResult === undefined) {
            throw new SoftError(Status.NOT_FOUND, `此本书不存在，请检查ISBN是否正确`, 404);
        }
        // 返回结果，并将该条记录插入数据库
        await insertBookInfo(queryResult.isbn, queryResult.title,
                        queryResult.author, queryResult.title_page_url);
    }
}