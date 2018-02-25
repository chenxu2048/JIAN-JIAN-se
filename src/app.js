import Koa from 'koa';

import route from './routers';
import { port } from './config';
import * as utils from './utils';

const app = new Koa();
app.use(
  utils.catchError,
  utils.logRequest,
);

app.on('error', (err, ctx) => {
  utils.handleError(ctx, err);
});

export default app;
