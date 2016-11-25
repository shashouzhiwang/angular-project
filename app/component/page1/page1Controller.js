/**
 * Created by Loki.Luo on 2016/9/3.
 */
angular
    .module('main')
    .controller('page1Controller',["$scope",page1Controller]);
    function page1Controller($scope){
        //var vm = this;
        $scope.content = "这是page1";
        

    }
