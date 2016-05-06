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

    $scope.tags = {
        "normal": true,
        "dry": false,
        "hot": false,
        "cold": false,
        "weekend":false,
        "lunchtime":false,
        "dark":false
    }
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
        $scope.getRemainingCharacters()
    }

    $scope.insertLightening = function(){
        $scope.message = $scope.message + " {lum} ";
        $scope.getRemainingCharacters()
    }

    $scope.insertTemperature = function(){
        $scope.message = $scope.message + " {temp} ";
        $scope.getRemainingCharacters()
    }

    $scope.setRandomTwit = function(){
        
        var data = {
            "username": $scope.username,
            "message": $scope.message,
            "tags": []
        }

        if($scope.tags.normal){
            data.tags.push("normal")
        }
        if($scope.tags.dry){
            data.tags.push("dry")
        }
        if($scope.tags.hot){
            data.tags.push("hot")
        }
        if($scope.tags.cold){
            data.tags.push("cold")
        }
        if($scope.tags.weekend){
            data.tags.push("weekend")
        }
        if($scope.tags.lunchtime){
            data.tags.push("lunchtime")
        }
        if($scope.tags.dark){
            data.tags.push("dark")
        }

        //console.log(data);

        HttpService.setRandomTwit(data, onReady);

        function onReady(response){
            console.log(response);
        }
    }

    $scope.getRandomTwit = function(){
        HttpService.getRandomTwit(onReady);

        function onReady(items){
            $scope.twits = items;
        }
    }

    $scope.getRandomTwit();
}