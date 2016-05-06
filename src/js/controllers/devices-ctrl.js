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

    $scope.getAllDevices = function () {
        HttpService.getDevices(onReady);

        function onReady(items) {
            //console.log(items)
            $scope.devices = items;
        }
    };

    $scope.getAllDevices();

    $scope.getInfo = function () {
        if($scope.showMessage==false){
            $scope.getMessagesFromSpecificDay(1);
        }else{
            $scope.showMessage = false;
            $scope.showMore = "Show more";
        }

    }
    
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
        $scope.data = [];
        for (i = 0; i < $scope.messages.length; i++) {
            //console.log($scope.messages[i]);
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
        console.log($scope.data);
        $scope.showGraph = true;

        //$scope.labels = ['2006', '2007', '2008', '2009', '2010', '2011', '2012'];
        // $scope.data = [
        //     [65, 59, 80, 81, 56, 55, 40],
        //     [28, 48, 40, 19, 86, 27, 90],
        //     [58, 28, 30, 79, 82, 47, 80]
        // ];
    }


}