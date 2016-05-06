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
    $scope.showGraph = false;
    $scope.showMore = "Show more";

    //Get all devices
    $scope.getAllDevices = function () {
        HttpService.getDevices(onReady);

        function onReady(items) {
            //console.log(items)
            $scope.devices = items;
        }
    };

    //activate the function when the view is loaded
    $scope.getAllDevices();

    //get device info
    $scope.getInfo = function () {
        if($scope.showMessage==false){
            //We only get the last 24 hours at first to reduce loading time
            $scope.getMessagesFromSpecificDay(1);
        }else{
            $scope.showMessage = false;
            $scope.showMore = "Show more";
        }

    }

    //Filter to get only messages from specific day
    $scope.getMessagesFromSpecificDay = function(day){
        HttpService.getMessagesFromSpecificDay(day, onReady);

        function onReady(items) {
            //console.log(items)
            $scope.messages = items;
            $scope.showMessage = true;
            $scope.showMore = "Show less";
            buildGraph();
        }
    }



    //Build graph
    function buildGraph(){
        $scope.series = ['Ground moisture (%)', 'Lightening (%)', 'temperature(°C)'];
        $scope.labels = [];
        var hum = [];
        var lum = [];
        var temp = [];
        //the data array contains three arrays : hum, lum and temp
        $scope.data = [];
        //iteration to build the graph arrays
        for (i = 0; i < $scope.messages.length; i++) {
            //only get the messages where the time is set
            if ($scope.messages[i].time != null) {
                var date = new Date($scope.messages[i].time);
                var dateLabel = date.toLocaleTimeString()
                //console.log(dateLabel);
                $scope.labels.push(dateLabel);
                hum.push($scope.messages[i].hum);
                lum.push($scope.messages[i].lum);
                temp.push($scope.messages[i].temp);
            }
        }
        $scope.data.push(hum);
        $scope.data.push(lum);
        $scope.data.push(temp);
        $scope.showGraph = true;
    }


}