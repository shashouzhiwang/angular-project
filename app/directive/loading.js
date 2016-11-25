/**
 * Created by Loki.Luo on 2016/11/3.
 */
angular
    .module('main')
.directive('loading',[function(){
        var option = {
            restrict:'AE',
            scope:{
                
            },
            templateUrl:'./directive/loading-temp.html',
            link:function(scope){
                scope.tipText = scope.tipText || "数据加载中...";
            }
        };
        return option;
    }]);