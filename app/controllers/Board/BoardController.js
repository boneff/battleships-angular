(function(){
    'use strict';

    angular.module('myApp.Board')

    .controller('BoardController', ['$scope', 'BoardGeneratorService',  function($scope, BoardGeneratorService) {
        // variable bond to form input field - populated on submit
        $scope.currentCoordinates = '';
        $scope.gameSteps = 0;
        $scope.gameFinished = 0;
        // init board
        $scope.board = BoardGeneratorService.init();
        
        // add watcher of board ship elements
        // once they are all removed - finsh game
        $scope.$watch('board.ships.length', function() {
            if ($scope.board.ships.length === 0) {
                $scope.$apply(function() {
                    $scope.gameFinished = 1;
                    console.log($scope.gameFinished);
                });
            }
        });
        
        $scope.restartGame = function() {
            // variable bond to form input field - populated on submit
            $scope.currentCoordinates = '';
            $scope.gameSteps = 0;
            $scope.gameFinished = false;
            // init board
            $scope.board = BoardGeneratorService.init();
        };
        
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
               $scope.gameSteps ++;
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
                // check each ship coordinates to see which we hit
                angular.forEach($scope.board.ships, function(ship, index){
                    angular.forEach(ship.coordinates, function(value){
                        if(value.x === y && value.y === x) {
                            console.log(value.x, value.y);
                            ship.size --;
                            if (ship.size === 0) {
                                toastr.success('Ship sunk!');
                                $scope.board.ships.splice(index, 1);
                            }
                        }
                    });
                });
            } else {
                $scope.board.coordinates[y][x].status = 'open';
                $scope.board.coordinates[y][x].value = '-';
                toastr.info('Missed!');
            }
        }
    }]);
})();