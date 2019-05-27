const Koa = require("koa");
const Router=require('koa-router')
const config = require("./config.json");
const Wechat = require("./wechat/wechat.js");

const app = new Koa();
const router=new Router();

let wechatApp = new Wechat(config);


router.get('/',async ctx=>{
  wechatApp.auth(ctx);
})


app.use(router.routes());
app.use(router.allowedMethods());
app.listen(3000);
