const Koa = require('koa');
const Router = require('koa-express-router');
const multer = require('koa-multer');

const app = new Koa();
const router = new Router();

// var storage = multer.diskStorage({
//     destination: (req, file, cb) => {
//         console.log('destination');
//         cb(null, './uploads/');
//     },
//     filename: (req, file, cb) => {
//         console.log('filename');
//         cb(null, file.fieldname + '-' + Date.now()+ '.jpg');
//     }
// });
var storage = multer.memoryStorage();
const upload = multer({storage : storage});

router.route('/profile')
        .post(upload.any(), async function test(ctx) {
            console.log(ctx.req);
        });
app.use(router.routes(false));
app.listen(5000, () => {
    console.log("app listen on port 5000");
});