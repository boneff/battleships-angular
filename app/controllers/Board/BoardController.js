(function(){
    'use strict';

    angular.module('myApp.Board')

    .controller('BoardController', ['$scope', 'BoardGeneratorService',  function($scope, BoardGeneratorService) {
        // variable bond to form input field - populated on submit
        $scope.currentCoordinates = '';
        // init board
        $scope.board = BoardGeneratorService.init();
        
        $scope.submitCoordinates = function() {
            if (typeof($scope.currentCoordinates) !=="undefined" && $scope.currentCoordinates.length >= 2) {
                // get second character of coordinates
                var xLabel = parseInt($scope.currentCoordinates.toUpperCase().charAt(1) + $scope.currentCoordinates.toUpperCase().charAt(2)); 
                // get first character of coordinates 
                var yLabel = $scope.currentCoordinates.toUpperCase().charAt(0); 
                
                // check if submitted coordinates are in the X and Y arrays of 
                // board labels
                var xCoordinate = $scope.board.labels.x.indexOf(xLabel);
                var yCoordinate = $scope.board.labels.y.indexOf(yLabel);
                if (xCoordinate !== -1 && yCoordinate !== -1) {
                    //set submitted coordinates as marked on board
                    checkBoardHit(xCoordinate, yCoordinate);
                } else {
                    // show error on wrong coordinates (out of board range)
                    toastr.error('Wrong coordinates!');
               }
            } else {
                toastr.info('Provide at least 2 coordinates!');
            }
            // reset input field
            $scope.currentCoordinates = '';
        };
        
        // check if we have a hit on given coordinate
        function checkBoardHit(x, y) {
            if (typeof $scope.board.coordinates[y][x] !=="undefined" && $scope.board.coordinates[y][x].status === 'taken') {
                toastr.success('Ship hit!');
                $scope.board.coordinates[y][x].status = 'hit';
                $scope.board.coordinates[y][x].value = 'x';
                console.log($scope.board);
            } else {
                $scope.board.coordinates[y][x].status = 'open';
                $scope.board.coordinates[y][x].value = '-';
                toastr.info('Missed!');
            }
        }
    }]);
})();