const crypto = require('crypto');
const urlencode = require('urlencode');
import {youdao} from '../../config';
import got from 'got';
import { sendData } from '../../utils';

const appKey = youdao.appId;
const appSecret = youdao.appSecret;
const url = youdao.url.http;

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
    // hash.update([appKey, img, salt, appSecret].join(''));
    hash.update(appKey + img + salt + appSecret)
    return hash.digest('hex').slice(0, 32).toUpperCase();
}

/**
 * OCR服务
 * @param {Buffer} image Buffer中的图片
 */
export async function OCR(image) {
    let imageEncoded = encodeImage(image);
    // let salt = Math.floor(Math.random() * 65535) + 1;
    let salt = Date.now();
    let sign = getSign(appKey, imageEncoded, salt, appSecret);
    let body = {
        img: imageEncoded,
        langType: 'zh-en',
        detectType: '10011',
        imageType: '1',
        appKey: appKey,
        salt: salt,
        sign: sign,
        docType: 'json'
    };
    body = URLEncoodeObj(body);
    try {
        let response = await got("111.230.135.232:5000/profile", {body: body, json: true,
                                method: 'POST'});
        // return JSON.parse(response.body);
        return response.body;
    } catch (err) {
        console.log(`ERROR::OCR::GOT: ${err}`);
    }
}

function encodeImage(image) {
    return image.toString('Base64');
}

function URLEncoodeObj(obj) {
    for (let key in obj) {
        obj[key] = urlencode(obj[key]);
    }
    return obj;
}