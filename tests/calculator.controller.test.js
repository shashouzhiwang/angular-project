/**
 * Created by Loki.Luo on 2016/11/25.
 */
describe('httpbackend test', function(){
    var greetings = [{message:'hello friend'}];
    var $controller;
    var $scope;
    var $httpBackend;
    var $q;
    beforeEach(function() {

        module('main');

        inject(function ($injector) {
            $scope = $injector.get('$rootScope').$new();
            $controller = $injector.get('$controller');
            $httpBackend = $injector.get('$httpBackend');
            $q = $injector.get('$q');
        });

    });
    it('should load mocked greetings', function(){
$httpBackend.when('GET','http:/localhost:3000/getGreeting').respond(200, greetings);
        // $httpBackend.expectGET('http:/localhost:3000/getGreeting').respond(200, greetings);
        $controller('contentController',{'$scope':$scope});
        $httpBackend.flush(); //needed to resolve and handle promise returned by $http

        expect($scope.greetings).toEqual(greetings);


        
    });
    
});
// describe('calculator', function () {

//   beforeEach(module('main'));

//   var $controller,memberServer,$httpBackend,authRequestHandler;

//   beforeEach(inject(function(_$controller_,_memberServer_,_$httpBackend_){
//     $controller = _$controller_;
//     memberServer = _memberServer_;
//     $httpBackend = _$httpBackend_;


//     authRequestHandler = $httpBackend.when('GET', 'test-data/bar.json')
//                             .respond({
//                                         "data":{
//                                         "title":"某地区蒸发量和降水量"    
//                                         }
//                                     });
//   }));
//    afterEach(function() {
//      $httpBackend.verifyNoOutstandingExpectation();
//      $httpBackend.verifyNoOutstandingRequest();
//    });

//   describe('sum', function () {

//        it('should fetch bar.json', function() {
//          $httpBackend.when('GET', './app/test-data/bar.json')
//                             .respond({
//                                         "data":{
//                                         "title":"某地区蒸发量和降水量"    
//                                         }
//                                     });
//          var $scope = {};
//          var controller = $controller('contentController', { $scope: $scope ,memberServer:memberServer});
//          $httpBackend.flush();
//        });

//         // it('1 + 1 should equal 2', function () {
//         //     var $scope = {};
//         //     var controller = $controller('contentController', { $scope: $scope ,memberServer:memberServer});
//         //     $scope.x = 1;
//         //     $scope.y = 3;
//         //     $scope.sum();
//         //     expect($scope.z).toBe(4);
//         // }); 

//         // it('z should default to zero', function () {
//         //   var $scope = {};
//         //   var controller = $controller('contentController', { $scope: $scope });
//         //   expect($scope.z).toBe(0);
//         // });
//     });

// });   

   



// describe('calculator', function () {

//   beforeEach(module('main'));

//   var $controller;

//   beforeEach(inject(function(_$controller_){
//     $controller = _$controller_;
//   }));

//   describe('sum', function () {
//         it('1 + 1 should equal 2', function () {
//             var $scope = {};
//             var controller = $controller('contentController', { $scope: $scope });
//             $scope.x = 1;
//             $scope.y = 2;
//             $scope.sum();
//             expect($scope.z).toBe(3);
//         }); 

//         it('z should default to zero', function () {
//           var $scope = {};
//           var controller = $controller('contentController', { $scope: $scope });
//           expect($scope.z).toBe(0);
//         });
//     });

// });


