define([ 'app' ], function(app) {
	/** 备用滚动指令 */
	app.directive('whenScrolled', function() { 
	  return function(scope, elm, attr) { 
	    var raw = elm[0]; 
	    elm.bind('scroll', function() { 
	      if (raw.scrollTop+raw.offsetHeight >= raw.scrollHeight) { 
	        scope.$apply(attr.whenScrolled); 
	      } 
	    }); 
	  }; 
	});

	/** 弹窗指令 --只有确定*/
	app.directive('compop', function(){
		return{
			restrict:'E',
			templateUrl:'tpls/popup/popup2.html'
		}
	});

	/** 弹窗指令 --有确定和取消*/
	app.directive('compopsure', function(){
		return{
			restrict:'E',
			templateUrl:'tpls/popup/popup1.html'
		}
	});

	/** 加载请求等待页面指令 */
	app.directive('waitRpc', function(){
		return{
			restrict:'E',
			templateUrl:'tpls/popup/loading.html'
		}
	});

	/** 返回指令 */
	app.directive('onBack', ["$window", "$log", function($window,$log){
		var link = function(scope, element, attrs){

			element.on("click", function(){
				$window.history.back();
			})
		}

		return{
			restrict:'A',
			link: link
		}
	}]);
	/* 公用tab标签指令 */
	app.directive('pubTabs', function() {
	  return {
	    restrict: 'E',
	    transclude: true,
	    scope: {
	    	divClass: '@',
	    	ulClass: '@',
	    	liClass: '@',
	    	method: '&'
	    },//隔离作用域
	    controller: ['$scope', function($scope) {

	      var panes = $scope.panes = [];

	      $scope.select = function(pane) {
	        angular.forEach(panes, function(pane) {
	          pane.selected = false;
	        });
	        pane.selected = true;
	        if(pane.liType){
		        $scope.method()(pane.liType);
	        }
	      };

	      this.addPane = function(pane) {
	        if (panes.length === 0) {
	          $scope.select(pane);
	        }
	        panes.push(pane);
	      };
	    }],
	    templateUrl: 'tpls/public/tabsLabel.html'
	  };
	});

	app.directive('pubPane', function() {
	  return {
	    require: '^pubTabs',
	    restrict: 'E',
	    transclude: true,
	    scope: {
	      title: '@',
	      liType: '@'
	    },
	    link: function(scope, element, attrs, tabsCtrl) {
	      tabsCtrl.addPane(scope);
	    },
	    templateUrl: 'tpls/public/tabPane.html'
	    
	  };
	});

	/* cavas图片指令 */
	app.directive('canvasImg', ['$window', function($window) {

	    var canvas2D = !!$window.CanvasRenderingContext2D;

	    return {
	      restrict: 'A',
	      template: function(elem, attr){
	      	var cssVal = "";
	      	if(attr.css){
	      		cssVal = attr.css;
	      	}
	      	return '<canvas class="' + cssVal + '"></canvas>';
	      },
	      link: function(scope, element, attrs) {
	        var domElement = element[0],
	            $canvas = element.find('canvas'),
	            canvas = $canvas[0],
	            context = canvas2D ? canvas.getContext('2d') : null;

	            canvas.width = domElement.offsetWidth;
	            canvas.height = domElement.offsetHeight;

	            var img = new Image();
	            //img.width = domElement.offsetWidth;
	            //img.height = domElement.offsetHeight;
	  			img.onload = function(){
	  				if(context){
	  					context.drawImage(img, 0, 0, img.width, img.height,
	  						0, 0, canvas.width, canvas.height);

	  				}
	  			}

	        attrs.$observe('imgSrc', function(value) {
	          if (!value) {
	            return;
	          }
	          img.src = value;
	        });
	      }
	    };
	}]);

	/* 获取ng-bind中包含html代码的内容 */
	app.directive('bindHtmlCompile', ['$compile', function ($compile) {
        return {
            restrict: 'A',
            link: function (scope, element, attrs) {
                scope.$watch(function () {
                    return scope.$eval(attrs.bindHtmlCompile);
                }, function (value) {
                    // In case value is a TrustedValueHolderType, sometimes it
                    // needs to be explicitly called into a string in order to
                    // get the HTML string.
                    element.html(value && value.toString());
                    // If scope is provided use it, otherwise use parent scope
                    var compileScope = scope;
                    if (attrs.bindHtmlScope) {
                        compileScope = scope.$eval(attrs.bindHtmlScope);
                    }
                    $compile(element.contents())(compileScope);
                });
            }
        };
    }]);
    /* 公用密码弹窗输入框指令 */
    app.directive('gridPassword', function(){
		// Runs during compile
		return {
			restrict: 'AE', // E = Element, A = Attribute, C = Class, M = Comment
			scope: {
				mark: '=isShow'
			},
			controller: ['$scope','RPCService','globalContants','$rootScope',function($scope,RPCService,globalContants,$rootScope) {
				$scope.inputpass = {
					inputA:'',
					inputB:'',
					inputC:'',
					inputD:'',
					inputE:'',
					inputF:'',
					clickFunction: function(){
						var password = this.inputA+this.inputB+this.inputC+this.inputD+this.inputE+this.inputF;
						$rootScope.gridPassword.sure(password);
					}
				}
			}],
			templateUrl: 'tpls/popup/input-password.html',
		};
	});
    app.directive('changeFocus', function(){
		return {
			restrict: 'A', // E = Element, A = Attribute, C = Class, M = Comment
			link: function($scope, iElm, iAttrs, controller) {

				var active = 0;

				var inputs = iElm.find('input');

				angular.forEach(inputs, function(value, key){
					angular.element(value).on("click", function(){
						inputs[active].focus();
					});

					angular.element(value).on("focus", function(){
						angular.element(value).on('keyup', listenKeyUp);
					});

					angular.element(value).on("blur", function(){
						angular.element(value).off('keyup', listenKeyUp);
					});
				})


				/**
			     * 监听键盘的敲击事件
			     */
			    function listenKeyUp() {
			        if(isNaN(this.value)){
			        	this.value = '';
			        	if (active < 5) {
			                active += 1;
			            }
			        }
			        if (!isNaN(this.value) && this.value.length != 0) {
			            if (active < 5) {
			                active += 1;
			            }
			            inputs[active].focus();
			        } else if (this.value.length == 0) {
			            if (active > 0) {
			                active -= 1;
			            }
			            inputs[active].focus();
			        }
			        
			    }
			}
		}
	});

});