'use strict';

angular.module('myApp.Board')

.controller('BoardController', ['$scope', function($scope) {
        $scope.board = {
            ships : [
                {
                    type: 'Destroyer',
                    size: 5
                },
                {
                    type: 'Attacker',
                    size: 4
                },
                {
                    type: 'Attacker',
                    size: 4
                }
            ]
        };
        console.log('Board');
        console.log($scope.board);

}]);