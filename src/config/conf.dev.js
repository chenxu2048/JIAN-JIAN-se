export default {
  port: 3000,
  host: '127.0.0.1',
  mysql: {
    host: '119.29.146.176',
    user: 'jian_jian',
    password: 'jianjiandb',
    database: 'JIAN-JIAN',
    port: '6033',
    charset: 'utf8mb4_general_ci',
  },
  redis: {
    host: '119.29.146.176',
    port: '9736',
    password: 'jianjian',
    db: 1,
    namespaces: {
      session: 'jian-jian:session',
    },
  },
  session: {
    secret: 'Jian-Jian-is-the-best-book-digest-application',
    key: 'jian-jian-session-id',
    maxAge: 10 * 60 * 1000,
    signed: false,
    httpOnly: true,
    overwrite: true,
  },
  wechatAuth: {
    appId: 'wx705b90272f798f75',
    appSecret: '68c1f35441727f3480d2c163e84ec7a6',
    url: {
      getSession: 'https://api.weixin.qq.com/sns/jscode2session',
    },
  },
};
