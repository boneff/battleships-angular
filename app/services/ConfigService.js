(function(){
    angular.module('myApp').factory('ConfigService', function() {
        var config = {
            applicationName: 'Battleships',
            board: { 
                size: 10,
            },
            ships: [
                {
                    type: 'battleship',
                    count: 1,
                    size: 5
                },
                {
                    type: 'destroyer',
                    count: 1,
                    size: 4
                },
                {
                    type: 'destroyer',
                    count: 1,
                    size: 4
                }
            ]
        };
        
        function getShips(){
            return config.ships;
        }
        
        function getShipsCount(){
            return config.ships.length;
        }
        
        function getBoardSize(){
            return config.board.size;
        }
        
        return {
            getShips: getShips,
            getBoardSize: getBoardSize,
            getShipsCount: getShipsCount
        };
    });
})();
