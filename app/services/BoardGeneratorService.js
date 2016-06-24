(function(){
    angular.module('myApp').factory('BoardGeneratorService', ['ConfigService', function(ConfigService) {
        var ConfigService = ConfigService;
        var board = {
            labels: {},
            coordinates: [],
            ships: [],
            steps: 0
        };
        
        function init() {
            generateBoardLabels();
            generateBoard();
            generateBoardShips();
            return board;
        }
        
        function generateBoard() {
            for (var i = 0; i < ConfigService.getBoardSize(); i++) {
                board.coordinates[i] = [];
                for(var j = 0; j< ConfigService.getBoardSize(); j++) {
                   board.coordinates[i].push({x: i, y: j, value: '.', status: 'free'});
                }
            }
        }
        
       function generateBoardLabels() {
           var arrXaxis = [];
           var arrYaxis = [];
            // return 2 arrays with numbers and letters - used to label the board fields
            // chr(65) - returns uppercase A
            for (var i = 65; i < (65 + ConfigService.getBoardSize()); i++) {
                arrYaxis.push(String.fromCharCode(i));
            }
            for (var j = 1; j <= ConfigService.getBoardSize(); j++) {
                arrXaxis.push(j);
            }

            board.labels = {
                x : arrXaxis,
                y : arrYaxis
            };
        }
        
        function generateBoardShips() {
            var configShips = ConfigService.getShips();

            angular.forEach(configShips, function(ship) {
                 generateShipCoordinates(ship);
            });
        }
        
        function generateShipCoordinates(ship) {
            var freePositions = [];
            var randomStartingCoordinate = getRandomStartingPosition();
            ship.coordinates = [];
            
            var shipSize = ship.size;
           
            
            var horizontalDirection = (randomStartingCoordinate.x > ConfigService.getBoardSize()/2) ? 'decrease': 'increase';
            var verticalDirection = (randomStartingCoordinate.y > ConfigService.getBoardSize()/2) ? 'decrease': 'increase';
            var orientation = ['horizontal', 'vertical'];
            var randomDirection = orientation[Math.floor(Math.random()*orientation.length)];
            
            if (randomDirection === 'horizontal' && horizontalDirection === 'decrease') {
                var startCoordinate = randomStartingCoordinate.x;
                var endCoordinate = startCoordinate - shipSize;
                for (var i = startCoordinate; i > endCoordinate; i --) {
                    if (typeof board.coordinates[i][randomStartingCoordinate.y] !== "undefined" && board.coordinates[i][randomStartingCoordinate.y].status !== 'taken') {
                        freePositions.push({x: i, y: randomStartingCoordinate.y, value: '.', status: 'taken'});
                    }
                }
            }
            if (randomDirection === 'horizontal' && horizontalDirection === 'increase') {
                var startCoordinate = randomStartingCoordinate.x;
                var endCoordinate = startCoordinate + shipSize;
                for (var i = startCoordinate; i < endCoordinate; i ++) {
                    if (typeof board.coordinates[i][randomStartingCoordinate.y] !== "undefined" && board.coordinates[i][randomStartingCoordinate.y].status !== 'taken') {
                        freePositions.push({x: i, y: randomStartingCoordinate.y, value: '.', status: 'taken'});
                    }
                }
            }
            if (randomDirection === 'vertical' && verticalDirection === 'decrease') {
                var startCoordinate = randomStartingCoordinate.y;
                var endCoordinate = startCoordinate - shipSize;
                for (var i = startCoordinate; i > endCoordinate; i --) {
                    if (typeof board.coordinates[randomStartingCoordinate.x][i] !== "undefined" && board.coordinates[randomStartingCoordinate.x][i].status !== 'taken') {
                        freePositions.push({x: randomStartingCoordinate.y, y: i, value: '.', status: 'taken'});
                    }
                }
            }
            if (randomDirection === 'vertical' && verticalDirection === 'increase') {
                var startCoordinate = randomStartingCoordinate.y;
                var endCoordinate = startCoordinate + shipSize;
                for (var i = startCoordinate; i < endCoordinate; i ++) {
                   if (typeof board.coordinates[randomStartingCoordinate.x][i] !== "undefined" && board.coordinates[randomStartingCoordinate.x][i].status !== 'taken') {
                        freePositions.push({x: randomStartingCoordinate.y, y: i, value: '.', status: 'taken'});
                    }
                }
            }
            
            // if positions found for the whole ship - add coordinates to ship object
            if(freePositions.length === shipSize) {
                angular.forEach(freePositions, function(value) {
                    console.log(value);
                    ship.coordinates.push(value);
                    board.coordinates[value.x][value.y].status = 'taken';
                    board.ships.push(ship);
                });
            } else {
                return generateShipCoordinates(ship);
            }
        }
        
        function getRandomStartingPosition(){
            var randomX = Math.floor((Math.random() * (ConfigService.getBoardSize() -1)));
            var randomY = Math.floor((Math.random() * (ConfigService.getBoardSize() -1)));

            if(typeof board.coordinates[randomX][randomY] !== "undefined" && board.coordinates[randomX][randomY].status === 'free') {
                return { x: randomX,  y: randomY};
            } else {
                getRandomStartingPosition();
            }
        }
       
        return {
            init: init
        };
    }]);
})();