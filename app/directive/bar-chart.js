/**
 * Created by Loki.Luo on 2016/11/3.
 */
angular
    .module('main')
.directive('barChart',[function(){
        var option = {
            restrict:'AE',
            scope:{
                type : "@",
                barChartData : '='
            },
            template:'<div  ng-click="print()"></div><div class="main"  style="height:300px">{{component}}</div>',
            link:function(scope){
                scope.component = '这是组件';
               
            }
        };
        return option;
    }]);