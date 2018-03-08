import { queryDb } from "../services/mysql";
import { resolveISBN } from "../services/ISBNService";

/**
 * 在数据库中查找是否有该书籍信息，若没有，则采用线上API获取
 * @param {String(13)} ISBN 
 */
export async function getBookInfo(ISBN) {
    // 在数据库中查找
    const sql = `
        SELECT * from book_info;
    `;
    const result = await queryDb(sql, []);
    console.log(result);
    // 如果没有，去豆瓣api获取
    if (result.length == 0) {
        const queryResult = await resolveISBN(ISBN);
        // 返回结果，并将该条记录插入数据库，此处不需要await
        insertBookInfo(queryResult.isbn, queryResult.title,
                        queryResult.author, queryResult.title_page_url);
        return queryResult;
    }
    return result[0];
}
/**
 * 向书籍信息表中插入一条数据
 * @param {String(13)} ISBN 
 * @param {String} title 
 * @param {String} author 
 * @param {String} title_page_image 
 */
async function insertBookInfo(ISBN, title, author, title_page_image) {
    // const sql = `INSERT INTO book_info (isbn, title, author, title_page_image)
    //             VALUES ('?', '?', '?', '?');`;
    const sql = `INSERT INTO book_info SET ?;`;
    queryDb(sql, {ISBN, title, author, title_page_image});
}