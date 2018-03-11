import got from 'got';
import { sendData, SoftError, Status } from '../utils';

/**
 * 将传入的ISBN码解析为书籍格式
 * @param {String} ISBN
 * @author 吴博文
 */
export async function resolveISBN(ISBN) {
    try {
      const response = await got(`https://api.douban.com/v2/book/isbn/${ISBN}`, {json : true});
      return {
        title : response.body.title,
        isbn : response.body.isbn13,
        title_page_url : response.body.images.large,
        author : (response.body.author)[0]
      };
    } catch(err) {
      throw new SoftError(Status.NOT_FOUND, '未找到此书');
    }
}
