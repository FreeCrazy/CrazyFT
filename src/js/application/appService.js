define(['app'], function(app){
  
  app.factory("RPCService",[
    "$rootScope", "$http", "$log", "globalContants",
   function($rootScope, $http, $log, globalContants){

    var actionNameKey;
    var paramsKey;
    var callbackKey;
    var callbackErrKey;
    var path;
    var dataResult = [];
    var rpcSuccessed = false;

    /**
     * 单次请求后台接口
     * 参数1: 模块名称XXX.XXX
     * 参数2: 参数列表数组形式
     * 参数3: 成功回调函数
     * 参数4: 失败回调函数
     * 参数5: 请求类型为
     *   "single"代表单次请求不弹出等待框
     *   "scroll"代表接下来页面要加载无限滚动组件
     */
    var rpc = function(actionName, params, callback, callbackErr, reqType){
        //判断是不是单词请求
        if(reqType && reqType == "single"){
          $rootScope.waitingDiv = false;
        } else {
          $rootScope.waitingDiv = true;
        }
        
        //重置第一次请求为未执行
        rpcSuccessed = false;
        //是否积分商城功能判断
        globalContants.isDouble = false;

        //如果是滚动功能记录回调函数为滚动提供支撑
        if(reqType && reqType == "scroll"){
          actionNameKey = actionName;
          paramsKey = params;
          callbackKey = callback;
          callbackErrKey = callbackErr;
        }

        //拼接请求地址
        var func = actionName.split('.');
        path = globalContants.serviceUrl+"/d/dwr/"+func[0];
        if (func[1]){
          path += "/" + func[1];
        }

        //合并请求参数
        var param = params.join();
        $log.debug(param);
        $log.debug(path);
        var req = {
            method: 'POST',
            url: path,
            data: { ps : "[" + param + "]"},
          };

          $http(req).success(function(data, status, headers, config, statusText){
            data = eval("obj="+data+";");
            if (typeof callback == "function") {
              callback(data, status);
            }
            dataResult = data;
            rpcSuccessed = true;
            $rootScope.waitingDiv = false;
          }).error(function(data, status, headers, config, statusText){
            if (typeof callbackErr == "function") {
              callbackErr(data, status);
            }
            dataResult = data;
            $rootScope.waitingDiv = false;
          });
        
    };

    /**
     * 滚动查询对象需要实例化才能使用
     * items负责存储累加的查询结果
     * busy负责存储是否繁忙需要继续加载与否的状态
     * after 存储是否显示加载中的特效
     */
    var ScroolQuery = function() {
        this.items = [];
        this.busy = false;
        this.after = false;
    };

    /* 原型方法供页面指令调用加载下一页 */
    ScroolQuery.prototype.nextPage = function() {
        if (this.busy || !rpcSuccessed) {
          return
        };

        // 保存当前被实例化的滚动对象
        var objInts = this;
        //默认设置为繁忙不加载
        this.busy = true;
        this.after = true;
        //this.items = dataResult;
        //从全局变量中获取本页起始下标在参数数组中的位置
        var pIndex = globalContants.pageParamIndex;
        //从全局变量中获取本页长度在参数数组中的位置
        var pLenIndex = globalContants.pageLengthIndex;

        //自动累加下一页起始下标
        paramsKey[pIndex] += paramsKey[pLenIndex];

        //积分商城查询定制
        var isDbl = globalContants.isDouble;
        //判断滚动结果集长度
        var itemLen = this.items.length;
        //积分商城长度乘以二
        if(isDbl){
          itemLen = itemLen * 2;
        }

        //item长度小于期望的记录页数倍数长度结束查询
        if(itemLen < paramsKey[pIndex]){
          this.after = false;
          rpcSuccessed = false;
          return false;
        }
        //paramsKey[1] += paramsKey[1] + 6;

        var param = paramsKey.join();
        //param = null;

        var req = {
            method: 'POST',
            url: path,
            data: { ps : "[" + paramsKey + "]"},
          };

        $http(req).success(function(data, status, headers, config, statusText){
          data = eval("obj="+data+";");
          if (typeof callbackKey == "function") {
            callbackKey(data, status);
          }
          objInts.busy = false;
          objInts.after = false;
        }).error(function(data, status, headers, config, statusText){
          if (typeof callbackErrKey == "function") {
            callbackErrKey(data, status);
          }
          objInts.busy = false;
          objInts.after = false;
        });
    };

    /* 获取URL中的参数 */
    var GetQueryString = function (para,s) {
    	  if (!para){
          return
        }
        
    	  var str = s ? s : document.location.href;
    	  var m = new RegExp("[\\?&]"+para+"=([^&]*)","i");
		    var r = str.match(m)
		    return r ? unescape(r[1]) : "";
		    //return r?decodeURIComponent(r[1]):""
    }

    /**
     * 为Run中获取OPENID单独开辟方法
     */
    var rpcOpenId = function(actionName, params, callback, callbackErr){
        $rootScope.waitingDiv = true;
        var func = actionName.split('.');
        path = globalContants.serviceUrl+"/d/dwr/"+func[0];
        if (func[1]){
          path += "/" + func[1];
        }

        var param = params.join();
        $log.debug(param);

        var req = {
            method: 'POST',
            url: path,
            data: { ps : "[" + param + "]"},
          };

        $http(req).success(function(data, status, headers, config, statusText){
          data = eval("obj="+data+";");
          $rootScope.waitingDiv = false;
          if (typeof callback == "function") {
            callback(data, status);
          }
          
        }).error(function(data, status, headers, config, statusText){
          $rootScope.waitingDiv = false;
          if (typeof callbackErr == "function") {
            callbackErr(data, status);
          }
          
        });
        
    };

    /**
     * 仿照JAVA中的HashMap的实现
     */
    var HashMap = function() {
        /** Map 大小 * */
        var size = 0;
        /** 对象 * */
        var entry = new Object();
        /** 存 * */
        this.put = function(key, value) {
          if (!this.containsKey(key)) {
            size++;
          }
          entry[key] = value;
        };
        /** 取 * */
        this.get = function(key) {
          if (this.containsKey(key)) {
            return entry[key];
          } else {
            return null;
          }

        };
        /** 删除 * */
        this.remove = function(key) {
          if (delete entry[key]) {
            size--;
          }
        };

        /** 是否包含 Key * */
        this.containsKey = function(key) {
          return (key in entry);
        };

        /** 是否包含 Value * */
        this.containsValue = function(value) {
          for ( var prop in entry) {
            if (entry[prop] == value) {
              return true;
            }
          }
          return false;
        };

        /** 所有 Value * */

        this.values = function() {
          var values = new Array(size);
          for ( var prop in entry) {
            values.push(entry[prop]);
          }
          return values;
        };

        /** 所有 Key * */
        this.keys = function() {
          var keys = new Array(size);
          for ( var prop in entry) {
            keys.push(prop);
          }
          return keys;
        };

        /** Map Size * */

        this.size = function() {
          return size;
        };
    };

    return {
      getRPC: rpc,
      getScrollRPC: ScroolQuery,
      getUrlParam:GetQueryString,
      getRpcId: rpcOpenId,
      HashMap: HashMap
    }

  }]);

});