/**
 * Created by Loki.Luo on 2016/9/3.
 */
angular
    .module('main')
    .controller('contentController',["$scope","$rootScope","$http","$timeout","memberServer",contentController]);
    function contentController($scope,$rootScope,$http,$timeout,memberServer){
        //var vm = this;
        $scope.index = "这是首页";
        memberServer.test({})
            .then(function(data) { 
                $scope.parkingData = data;
            });
     

    }   
   