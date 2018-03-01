import Koa from 'koa';

import route from './routers';
import * as utils from './utils';

const app = new Koa();
app.use(utils.logRequest);
app.use(utils.catchError);
route(app);

app.on('error', (err, ctx) => {
  utils.handleError(ctx, err);
});

export default app;
