angular.module('myApp', [])
    .controller('MyController', function($scope, $timeout) {
        var updateClock = function() {
            $scope.clock = new Date().pattern("yyyy-MM-dd HH:mm:ss");
            $timeout(function() {
                updateClock();
            }, 1000);
        };
        updateClock();
    });