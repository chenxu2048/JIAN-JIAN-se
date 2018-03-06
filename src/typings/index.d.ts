import * as Koa from 'koa';
import KoaSession from 'koa-session';
import KoaRouter from 'koa-express-router';
import mysql from 'mysql';

declare global {
  type Context = Koa.Context
  type Session = KoaSession.ContextSession
  type Router = KoaRouter
  type Obj = Object
  type Koa = Koa
  type DbConnection = mysql.Connection | mysql.PoolConnection | mysql.Pool
}

declare module 'koa' {
  interface Context {
    paramData: ParamData
    baseUrl: string
    sessionOptions: KoaSession.SessionOptions
  }
}