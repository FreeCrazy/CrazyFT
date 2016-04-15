define(['app'], function(app){
  /** 全局变量对象 */
  app.constant("globalContants", 
    {
      "id":"",
      "phone":"",     // 注册用电话
      "userType":"",   // 账户状态
      "cardAsn":"",    // 客户卡号
      //页面起始坐标参数位置
      "pageParamIndex": 0,
      //页面长度坐标参数位置
      "pageLengthIndex": 1,
      "isDouble": false, // 积分商城页面一行两条数据加载时用，其它正常页面不用处理
      "openId":"",     // 个人openId
      "integeration":"", // 个人积分
      "activateStatus": 1, //激活状态
      "backPath":"", //返回地址保存，同一页面被不同页面调用时返回路径设置
      "headimgurl":"", // 获取头像的url
      "nikename":"", // 获取昵称
      "btnClkCk":false, // 为购物车和礼品详情中的button追加校验，如果页面没有加载完成就false 使不同不可用
      "credit":null, //积分兑换礼品详情
      "carousel":{}, //滑动
      "notice": {},  //公告
      "serviceUrl":"",//服务器地址及端口 http://192.168.1.12:9999
      "imgUrl":"http://192.168.1.12:9999/workspace/upload/",//服务器图片地址
     });
  
  /** 加油站模块变量对象 */
  app.constant("gasStationContants", 
    {
      //纬度，浮点数，范围为90 ~ -90,默认0
      "latitude": 0,
      //经度，浮点数，范围为180 ~ -180,默认0。
      "longitude": 0,
      "currentStationId":"",
     });

});