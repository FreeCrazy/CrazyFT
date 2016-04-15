requirejs.config({
    baseUrl: './',
    waitSeconds: 30,
    paths: {
        domready: 'public/js/domReady/domReady',
        angular: 'public/js/angular/angular',
        angularUIRouter: 'public/js/angular-ui-router/angular-ui-router',
        angularResource: 'public/js/angular-resource/angular-resource',
        angularTouch: 'public/js/angular-touch/angular-touch',
    	angularSanitize: 'public/js/angular-sanitize/angular-sanitize',
        ngInfiniteScroll: 'public/js/ngInfiniteScroll/ng-infinite-scroll',
        angularCarousel: 'public/js/angular-carousel/angular-carousel',
        app: 'js/application/app',
        appRun: 'js/application/appRun',
        appRoute: 'js/application/appRoute',
        appService: 'js/application/appService',
        appDirective: 'js/application/appDirective',
        appConstants: 'js/application/appConstants',
        appController: 'js/application/appController',
        weather:'http://api.map.baidu.com/getscript?v=2.0&ak=ws1sCbTnCigrSgle6uOER9NL&services=&t=20160224094302',
        /* 微信提供的js功能模块 */
        jweixin: 'public/js/jweixin/jweixin',
        angularQrcodeDep: 'public/js/qrcode-generator/qrcode',
        angularQrcode: 'public/js/angular-qrcode/angular-qrcode',
        /* 模块引入文件 */
        includes: 'js/include/index',

    },
    shim: {
        angular: {
            exports: "angular"
        },
        weather: {
            exports: "BMap"
        },
        'angularUIRouter': {
            deps: ['angular']
        },
        'angularResource': {
            deps: ['angular']
        },
        'angularTouch': {
            deps: ['angular']
        },
        'angularSanitize': {
            deps: ['angular']
        },
        'angularCarousel': {
            deps: ['angular', 'angularTouch']
        },
        'ngInfiniteScroll': {
             deps : ['angular']
        },
        'angularQrcode': {
            deps: ['angular', 'angularQrcodeDep']
        }
    }
});

require([
    "domready!", "angular","angularUIRouter", "angularCarousel",
    "angularResource", "angularTouch", "angularSanitize", "app", "appController",
    "appRoute", "appRun", "appService", "appDirective", "appConstants", 
    "angularQrcodeDep", "angularQrcode", "ngInfiniteScroll"
    ], 
    function(document, angular){
        //angularjs 启动
        angular.bootstrap(document,['mobileApp']);
});