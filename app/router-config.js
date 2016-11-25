/**
 * Created by Loki.Luo on 2016/9/3.
 */
angular
    .module('main')
    .config(['$stateProvider','$locationProvider','$urlRouterProvider',
        function($stateProvider,$locationProvider,$urlRouterProvider){
            $urlRouterProvider.otherwise('/index');
            $stateProvider
                .state('index',{
                    url: "/index",
                        controller:"contentController",
                        templateUrl:'component/content/content.html',
                        controllerAs:'vm'
                })
                .state('page1',{
                    url: "/page1",
                        controller:"page1Controller",
                        templateUrl:'component/page1/page1.html',
                        controllerAs:'vm'
                })
            ;
    }]);