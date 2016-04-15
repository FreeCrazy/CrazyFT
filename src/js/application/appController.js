define(['app'], function(app){
  app.controller('BaiduWeatherCtrl', ['$scope', '$http', function($scope, $http) {
    require(["weather"], function(BMap){
      //var city;
      $scope.loading = true;
      $scope.updateWeather = function(){
        var citys, city;
        //百度定位，获取所在城市名 在index中引用相应js,需ak
        var localCity = new BMap.LocalCity();
          localCity.get(function (r) {
            citys = r.name;
            city = citys.substring(0, citys.length-1); 
          var apiKey = "hBDoMmfaQvkxwifiKdsQij6s";
          var url = "http://api.map.baidu.com/telematics/v3/weather?location="+city+"&output=json&ak="+apiKey+"&callback=JSON_CALLBACK&error={error}";
          $http({
            url: url,
            method: 'JSONP'
          }).then(function(data) {
            $scope.weathers =  data;
          }, function(error) {
            console.warn('JSON Fail or '+ error)
          }).finally(function() {
            $scope.loading = false;
          });
        });
      };
      $scope.updateWeather();
    });
  }]);
});