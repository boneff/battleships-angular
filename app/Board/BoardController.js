'use strict';

angular.module('myApp.Board')

.controller('BoardController', [function($scope) {
        $scope.board = [
            'ships' => [],
        ];
        console.log('Board');

}]);