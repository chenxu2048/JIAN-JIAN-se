import { createBook, retrieveBooks, removeBook } from "../models/book";
import { getBookInfo, makeBookInfoExist } from "../models/bookInfo";
import { sendData, Status, getUserID } from "../utils";
import { queryDb } from "../services/mysql";
import { retriveSentencesByISBN } from "../models/sentence";

/**
 * 添加书
 * @param {Context} ctx
 */
export async function postBook(ctx, next) {
    await makeBookInfoExist(ctx.paramData.body.isbn);
    const result = await createBook(ctx.paramData.body.isbn, getUserID(ctx));
    // 判断是否成功
    sendData(ctx, {}, Status.OK);
}

/**
 * 查询某用户书架上的书
 * @param {Context} ctx
 */
export async function getBooks(ctx, next) {
    // 获取书的列表
    let book_list = retrieveBooks(ctx.paramData.query.isbn, getUserID(ctx));
    // 查询每本书前几条书摘
    for (var i = 0; i < book_list.length; ++i) {
        book_list[i].sample_sentence = await retriveSentencesByISBN(ctx.paramData.query.isbn, getUserID(ctx), 3);
    }
    sendData(ctx, book_list);
}

/**
 * 删除某用户书架上的一本书已经对应的所有书摘
 * @param {Context} ctx
 */
export async function deleteBook(ctx, next) {
    const result = removeBook(ctx.paramData.body.isbn, getUserID(ctx));
    // 判断是否成功
    sendData(ctx, {}, Status.OK);
}