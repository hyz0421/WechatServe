const sha1 = require("sha1");

const Wechat = function(config) {
  // 拿出配置文件内容

  this.token = config.token;

  /*
   *
   *           验证微信
   */
  Wechat.prototype.auth = function(ctx) {
    //这么做是为了省去req req.query...
    let { query } = ctx;

    // 拿出里面的内容

    //微信加密签名 == 通过 时间戳+随机数+token 生成的
    let signature = query.signature; //query.signature 等价与  req.query.signature

    // 时间戳
    let timestamp = query.timestamp;

    //随机数
    let nonce = query.nonce;

    // 随机字符串
    let echostr = query.echostr;

    console.log(this.token);
    let arr = [this.token, timestamp, nonce];

    let str = arr.sort().join("");

    // 使用 sha1加密

    let resultCode = sha1(str);

    //如果后端的加密签名与前端加密签名结果一致则成功
    if (resultCode === signature) {
      // 验证成功 返回echostr

      ctx.body = echostr;
    } else {
      // 验证失败
      console.log("微信验证失败!");
    }
  };
};

module.exports = Wechat;
