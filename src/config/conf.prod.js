export default {
  port: 8080,
  host: '127.0.0.1',
  mysql: {
    host: 'localhost',
    user: 'username',
    password: 'password',
    database: 'jianjian',
    port: '3306',
    charset: 'utf8mb4_general_ci',
  },
  redis: {
    host: 'localhost',
    port: '6379',
    password: 'jianjian',
    db: 1,
    namespaces: {
      session: 'jian-jian:session',
    },
  },
  session: {
    secret: 'Jian-Jian-is-the-best-book-digest-application',
    key: 'jian-jian-session-id',
    maxAge: 24 * 60 * 60 * 1000,
    signed: false,
    httpOnly: true,
    overwrite: true,
  },
  wechatAuth: {
    appId: 'app_id',
    appSecret: 'app_secret',
    url: {
      getSession: 'https://api.weixin.qq.com/sns/jscode2session',
    },
  },
};
