import * as Koa from 'koa';
declare module 'koa' {
  interface ParamData {
    [x: string]: any
    isInWhiteList: boolean
    body: any
    query: any
    session: Session
    curUser: User
    extraMsg: string
    ip: string
    host: string
  }
}