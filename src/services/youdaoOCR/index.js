const crypto = require('crypto');
/**
 * 生成有道OCR接口的签名
 * 拼接以下参数形成字符串str，再对str进行md5，得到32位大写的sign
 * @param {String} appKey 应用Id
 * @param {String} img Base64编码的图片
 * @param {String} salt 随机数
 * @param {String} appSecret 
 * @author 吴博文
 */
function getSign(appKey, img, salt, appSecret) {
    let hash = crypto.createHash('md5');
    hash.update([appKey, img, salt, appSecret].join(''));
    return hash.digest('hex').toUpperCase();
}

