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
                   board.coordinates[i].push({x: i, y: j, value: '.'});
                }
            }
        }
        
       function generateBoardLabels() {
           var arrXaxis = [];
           var arrYaxis = [];
            // return 2 arrays with numbers and letters - used to label the board fields
            // chr(65) - returns uppercase A
            for (var i = 65; i <= (65 + ConfigService.getBoardSize()); i++) {
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

            angular.forEach(configShips, function(value) {
                var randomX = Math.floor((Math.random() * ConfigService.getBoardSize()) + 1);
                var randomY = Math.floor((Math.random() * ConfigService.getBoardSize()) + 1);
                var randomStartingCoordinate = [randomX, randomY];
                console.log(value, randomStartingCoordinate);
            });
        }
        
        return {
            init: init
        };
    }]);
})();