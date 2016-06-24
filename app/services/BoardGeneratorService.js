(function(){
    angular.module('myApp').factory('BoardGeneratorService', ['ConfigService', function(ConfigService) {
        var ConfigService = ConfigService;
        var board = {
            labels: {},
            coordinates: [],
            ships: []
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
            var shipsCount = ConfigService.getShipsCount();
            var configShips = ConfigService.getShips();

            angular.forEach(configShips, function(ship) {
                var randomStartingCoordinate = getRandomStartingPosition();

                ship.coordinates = [];
                ship.coordinates.push({x: randomStartingCoordinate.x, y: randomStartingCoordinate.y, value: '.', status: 'taken'});
                board.coordinates[randomStartingCoordinate.x][randomStartingCoordinate.y].status = 'taken';
                board.ships.push(ship);
                
            });
        }
        
        function getRandomStartingPosition(){
            var randomX = Math.floor((Math.random() * ConfigService.getBoardSize()));
            var randomY = Math.floor((Math.random() * ConfigService.getBoardSize()));

            if(typeof board.coordinates[randomX][randomY] !== 'undefined' && board.coordinates[randomX][randomY].status === 'free') {
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