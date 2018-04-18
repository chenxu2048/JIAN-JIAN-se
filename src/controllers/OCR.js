import {OCR as OCRService} from '../services/youdaoOCR';
import { sendData, SoftError, Status } from '../utils';
import youdao from '../services/youdaoNode';
import {youdao as youdaoConfig} from '../config';

const threshold = 50;
// /**
//  * @param {Context} ctx
//  */
// export async function OCR(ctx, next) {
//     let result = await OCRService(ctx.req.files[0].buffer);
//     sendData(ctx, result);
// }
/**
 * 
 * @param {Context} ctx 
 */
export async function OCR(ctx, next) {
    try {
        youdao.config({appKey: youdaoConfig.appId, appSecret : youdaoConfig.appSecret});
        let img = ctx.req.files[0].buffer.toString('Base64');
        let {x, y, width, height} = ctx.paramData.query;
        let area_info = parseAreaInfo(x, y, width, height);
        if (checkAreaInfo(area_info)) {
            area_info = makeAreaLarger(area_info);
        }
        let result = await youdao.ocr({img : img});
        let sentence = resolveOCRResult(result, area_info);
        sendData(ctx, {content : sentence.join(' ')});
    } catch(error) {
        console.log(error);
        throw new SoftError(Status.UNKNOWN_ERROR);
    }
}

function resolveOCRResult(result, area_info) {
    let sentence = new Array();
    let regions = result.Result.regions;
    const whetherFilter = checkAreaInfo(area_info);
    if (whetherFilter) {
        for (let i in regions) {
            for (let j in regions[i].lines) {
                if (isInRegion(regions[i].lines[j].boundingBox, area_info)) {
                    sentence.push(regions[i].lines[j].text);                    
                }
            }
        }
    } else {
        for (let i in regions) {
            for (let j in regions[i].lines) {
                sentence.push(regions[i].lines[j].text);
            }
        }
    }
    return sentence;
}

/**
 * 判断区域信息是否合法
 * @param {Obj} obj 
 */
function checkAreaInfo(obj) {
    if (obj != null) {
        return     !Number.isNaN(obj.x)
                && !Number.isNaN(obj.y)
                && !Number.isNaN(obj.width)
                && !Number.isNaN(obj.height);
    }
    return false;
}

/**
 * 判断boundingBox是否在Region内
 * @param {String} boundingBox 
 * @param {*} area_info 
 */
function isInRegion(boundingBox, area_info) {
    let box = boundingBox.split(",");
    box = box.map((item)=>{
        return parseInt(item);
    })
    for (let i = 0; i < 4; ++i) {
        if (pointIsInRegion(box[2 * i], box[2 * i + 1], area_info) == false) {
            return false;
        }
    }
    return true;
}

function pointIsInRegion(x, y, area_info) {
    return x >= area_info.x && x <= area_info.x + area_info.width
            && y >= area_info.y && y <= area_info.y + area_info.height;
}

function parseAreaInfo(x, y, width, height) {
    return {
        x : parseInt(x),
        y : parseInt(y),
        width : parseInt(width),
        height : parseInt(height)
    };
}

function makeAreaLarger(area_info) {
    area_info.x -= threshold;
    area_info.y -= threshold;
    area_info.width += threshold;
    area_info.height += threshold;
    return area_info;
}