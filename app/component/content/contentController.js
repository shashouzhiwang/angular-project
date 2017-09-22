/**
 * Created by Loki.Luo on 2016/9/3.
 */
angular
    .module('main')
    .controller('contentController',["$scope","memberServer",contentController]);
    function contentController($scope,memberServer){
        //var vm = this;
        $scope.index = "这是首页";
        memberServer.test({})
            .then(function(data) { 
                $scope.parkingData = data;
            });
     
        $scope.z = 0;
      $scope.sum = function() {   
        $scope.z = $scope.x + $scope.y;   
      };
    }   
//    angular.module('main').controller('contentController',[
//         '$http',
//         '$scope',
//         function($http,$scope){
//             $http.get('http:/localhost:3000/getGreeting').then(function(result){
//                 $scope.greetings = result.data;
//             });
// }]);