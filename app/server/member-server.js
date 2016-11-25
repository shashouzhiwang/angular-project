/*Created by Loki Luo on 2016/11/18*/
angular
    .module('main')
    .factory('memberServer', ['$http','$location','config','$stateParams','commonServer',memberServer]);
    function memberServer($http,$location,config,$stateParams,commonServer) {
        return {
            test: test
        };
        function test(){
            //commonServer.showLoading();
            return commonServer.loadAjax({
            "localhostUrl": "./test-data/bar.json",
            "url": "",
            "data": {},
            "loading":true
            }).then(getComplete);
            function getComplete(data) {
                // commonServer.hideLoading();
                return data;
            }
        }
    }