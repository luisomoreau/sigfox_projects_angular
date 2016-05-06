/**
 * Settings Controller
 */

angular
    .module('SgfProjects')
    .controller('SettingsCtrl', ['$scope', 'HttpService', SettingsCtrl]);


function SettingsCtrl($scope, HttpService) {
    $scope.remaining = 140;
    $scope.message = "";
    $scope.disableButton = true;
    $scope.getRemainingCharacters = function(){
        var length = $scope.message.length;
        $scope.remaining = 140 - length;
        if($scope.message!=""){
            $scope.disableButton = false;
        }else{
            $scope.disableButton = true;
        }
        if($scope.remaining<0){
            $scope.disableButton = true;
        }

    }

    $scope.insertHumidity = function(){
        $scope.message = $scope.message + " {hum} ";
    }

    $scope.insertLightening = function(){
        $scope.message = $scope.message + " {lum} ";
    }

    $scope.insertTemperature = function(){
        $scope.message = $scope.message + " {temp} ";
    }
}