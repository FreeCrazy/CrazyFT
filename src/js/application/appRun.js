define([ 'app',"jweixin" ], function(app,wx) {

	app.run(['$rootScope','$location','globalContants','RPCService','gasStationContants', '$state', '$stateParams', function($rootScope,$location,globalContants,RPCService,gasStationContants,$state,$stateParams){
		
		/* 密码输入框的弹窗对象 */
		// $rootScope.showInput = false;
		$rootScope.gridPassword = {
			"showInput": false,
			"callback":'',
			"showPop":function(callback){
				this.showInput = true;
				this.callback = callback;
			},
			"sure":function(param){
				this.showInput = false;
				if (typeof this.callback == "function"){
      				this.callback(param);
      			}
			}
		};
		/* 只有确定按钮的弹窗对象 */
		$rootScope.popSample = {
			"popup":false,
      		"popText":"",
      		"callback":'',
      		//显示弹窗方法，test内容，stateGo点击确定的回调方法
     		"showPop":function(test,callback){
      			this.popText=test;
      			this.popup=true;
      			this.callback= callback;
      		},
      		//确定按钮的点击事件
      		"change":function(){
      			this.popup=false;
      			if (typeof this.callback == "function"){
      				this.callback();
      			}
      		}
		};

		/* 有确定和取消按钮的弹窗对象 */
		$rootScope.popSure = {
			"popup":false,
      		"popText":"",
      		"callback":'',
      		//显示弹窗方法，test内容，stateGo点击确定的回调方法
     		"showPop":function(test,callback){
      			this.popText=test;
      			this.popup=true;
      			this.callback= callback;
      		},
      		//确定按钮的点击事件
      		"change":function(){
      			this.popup=false;
      			if (typeof this.callback == "function"){
      				this.callback();
      			}
      		}
		};

		/* 扩展数组根据值获取下标 */
		Array.prototype.indexOf = function(val) {
			for (var i = 0; i < this.length; i++) {
				if (this[i] == val) return i;
			}
			return -1;
		};  

		/* 扩展数组根据值从数组中移除对应值 */
		Array.prototype.remove = function(val) {
			var index = this.indexOf(val);
			if (index > -1) {
				this.splice(index, 1);
			} 
		};
		$rootScope.carousel = {};
		$rootScope.notice = {};
		//轮播 globalContants.carousel;
		$rootScope.carouselDo = function(successCallback, errCallback){
			$rootScope.carousel = globalContants.carousel;
			 if(typeof successCallback == "function"){
				successCallback();
			}
			if(typeof errCallback == "function"){
				errCallback();
			}
		}
		//公告 globalContants.notice;
		$rootScope.noticeDo = function(successCallback, errCallback){
			$rootScope.notice = globalContants.notice;
			 if(typeof successCallback == "function"){
				successCallback();
			}
			if(typeof errCallback == "function"){
				errCallback();
			}
		}
		//页面等待页面默认设置为隐藏
        $rootScope.waitingDiv = false;

        $rootScope.isArray = function(obj) {
			return Object.prototype.toString.call(obj) === '[object Array]';
		};

		$rootScope.$state = $state;
		$rootScope.$stateParams = $stateParams;

		Date.prototype.format = function(format) {
		    var date = {
		           "M+": this.getMonth() + 1,
		           "d+": this.getDate(),
		           "h+": this.getHours(),
		           "m+": this.getMinutes(),
		           "s+": this.getSeconds(),
		           "q+": Math.floor((this.getMonth() + 3) / 3),
		           "S+": this.getMilliseconds()
		    };
		    if (/(y+)/i.test(format)) {
		           format = format.replace(RegExp.$1, (this.getFullYear() + '').substr(4 - RegExp.$1.length));
		    }
		    for (var k in date) {
		           if (new RegExp("(" + k + ")").test(format)) {
		                  format = format.replace(RegExp.$1, RegExp.$1.length == 1
		                         ? date[k] : ("00" + date[k]).substr(("" + date[k]).length));
		           }
		    }
		    return format;
		}
	}]);
});