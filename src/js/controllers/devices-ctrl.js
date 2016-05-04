/**
 * Devices Controller
 */

angular
    .module('SgfProjects')
    .controller('DevicesCtrl', ['$scope', 'HttpService', DevicesCtrl]);


function DevicesCtrl($scope, HttpService) {
    $scope.devices = [];
    $scope.messages = [];
    $scope.showMessage = false;

    $scope.getAllDevices = function() {
        HttpService.getDevices(onReady);
        
        function onReady(items){
            //console.log(items)
            $scope.devices = items;
        }
    };

    $scope.getAllDevices();
    
    $scope.getAllMessages = function (){
        HttpService.getMessages(onReady);

        function onReady(items){
            //console.log(items)
            $scope.messages = items;
            $scope.showMessage = true;
            
        }
    }
}