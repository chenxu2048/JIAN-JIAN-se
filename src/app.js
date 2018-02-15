import Koa from 'koa'
const { port } = require('./config')
const { handleError, requestLogger, handleException } = require('./utils')
const initRouter = require('./routers')
const app = new Koa()
app.use(requestLogger).use(handleException)
initRouter(app)

app.on('error', (err, ctx) => {
  handleError(ctx, err)
})

export default app
