/*Created by Loki Luo on 2016/6/28*/
angular
    .module('main')
    .factory('commonServer', ['$http','$location','config','$stateParams','$timeout',commonServer]);
    function commonServer($http,$location,config,$stateParams,$timeout) {
        return {
            loadAjax: loadAjax,
            showLoading:showLoading,
            hideLoading:hideLoading,
            fadeIn:fadeIn,
            fadeOut:fadeOut
        };
        /**   
        option={
                "localhostUrl": ,
                "url": "",
                "data": {},
                "loading":true
        }
        */
        function loadAjax(option){
            var URL = config.TEST ? option.localhostUrl : config.DOMAIN + option.url;
            if(option.loading)
                showLoading({"tipText":"loading"});
            return $http({
                method: config.REQUIRT_STYLE,
                headers: {
                    'Content-Type': 'application/json'
                },
                url: URL,
                data: option.data
            }).
            then(function successCallback(response) {
                console.log('含头地址===' + JSON.stringify(response));
                if(option.loading)
                    // $timeout(function(){
                    //     hideLoading({
                    //         "tip":true,
                    //         "tip_option":"success",
                    //         "time":3000
                    //     });
                    // },2000);
                    hideLoading();
                if(config.TEST)
                    return response.data.data;
                return response.data;
              }, function errorCallback(error) {
                if(option.loading)
                    hideLoading();
                console.log(JSON.stringify("出错了===" + JSON.stringify(error)));
                return {
                    "fail":true
                };
              });
        }
        function showLoading(option){
            var $loading_cover = $(".loading_cover");
            fadeIn($loading_cover,{
                    "in_animate":"fadeIn",
                    "out_animate":"fadeOut"
            });
            $loading_cover.find(".loadding_text").html(option.tipText);
                
        }
        /**
        option = {
            tip:true/false,
            tip_option:success/fail,
            time:
        }
        */
        function hideLoading(option){
            var $loading_cover = $(".loading_cover");
            fadeOut($loading_cover,{
                        "in_animate":"fadeIn",
                        "out_animate":"fadeOut"
                });
            if(option&&option.tip){
                var time = option.time || 1500;
                var $loading_success = $(".loading_"+option.tip_option);
                fadeIn($loading_success,{
                    "in_animate":"fadeIn",
                    "out_animate":"fadeOut"
                });
                $timeout(function(){
                    fadeOut($loading_success,{
                        "in_animate":"fadeIn",
                        "out_animate":"fadeOut"
                    });
                },time);
            }

        }
        /**
        option = {
            in-animate:
            out-animate
        }
        */
        function fadeIn($obj,option){
            $obj.show();
            $.each($obj,function(){
                $(this).addClass('animated');
                $(this).removeClass(option.out_animate).addClass(option.in_animate);
                // i==0 ? $(this).removeClass('fadeOut').addClass('fadeIn'):$(this).removeClass('fadeOut').addClass('fadeIn');
            });
        }
        function fadeOut($obj,option){
            $.each($obj,function(){
                $(this).addClass(option.out_animate);
                //i==0 ? $(this).addClass('fadeOut'):$(this).addClass('fadeOut');
            });
            $timeout(function(){$obj.hide();},500);
        }

    }