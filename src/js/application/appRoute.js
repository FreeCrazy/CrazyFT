define([ 'app' ], function(app) {

  app.config(["$stateProvider", "$urlRouterProvider", function($stateProvider, $urlRouterProvider) {

	    $urlRouterProvider.otherwise("/tpls1");

	    $stateProvider
		/* 测试页面1*/
		.state('tpls1', {
	      url: '/tpls1',
	      templateUrl : 'tpls/tpls1.html'
	    })
		/* 测试页面2*/
		.state('tpls2', {
	      url: '/tpls2',
	      templateUrl : 'tpls/tpls2.html'
	    });
    }]);
 });
