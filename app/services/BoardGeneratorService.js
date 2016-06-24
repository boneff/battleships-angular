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
                var randomX = Math.floor((Math.random() * ConfigService.getBoardSize()));
                var randomY = Math.floor((Math.random() * ConfigService.getBoardSize()));
                var randomStartingCoordinate = [randomX, randomY];

                ship.coordinates = [];
                if(typeof board.coordinates[randomX][randomY] !== 'undefined' && board.coordinates[randomX][randomY].status === 'free') {
                    ship.coordinates.push({x: randomX, y: randomY, value: '.', status: 'taken'});
                    board.coordinates[randomX][randomY].status = 'taken';
                }
                board.ships.push(ship);
                
            });
        }
        
        return {
            init: init
        };
    }]);
})();