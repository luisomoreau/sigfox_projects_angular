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
    $scope.id = "";

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
    $scope.getInfo = function (id) {
        $scope.id=id;
        $scope.getMessagesFromSpecificDay(1, id);

    }

    //Filter to get only messages from specific day
    $scope.getMessagesFromSpecificDay = function(day, id){
        HttpService.getMessagesFromSpecificDay(day, id, onReady);

        function onReady(items) {
            //console.log(items)
            $scope.messages = items;
            $scope.showMessage = true;
            buildGraph();
        }
    }



    //Build graph
    function buildGraph(){
        $scope.series = ['Ground moisture (%)', 'Brightness (%)', 'temperature (°C)'];
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
                var days = ["Sun","Mon","Tu","Wed","Thu","Fri","Sat"];
                var date = new Date($scope.messages[i].time);
                var dateLabel = days[date.getDay()] +" "+ date.toLocaleTimeString();
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

    $scope.TestTwits = function(){
        var statuses = [
            {
                "tag" : "hot",
                "message":"Wow it's so hot in the office 28°C, can someone turn on the air conditioning system? https://t.co/qblek65GFk"
            },
            {
                "tag" : "dry",
                "message":"Can someone give me some water please? I just passed below 12% of humidity https://t.co/qblek65GFk"
            },
            {
                "tag" : "normal",
                "message":"Everything's fine, the temperature is at 28°C, the lightening is at 80% and the ground moisture is at 30% https://t.co/qblek65GFk"
            }
        ];

        var length = statuses.length;

        var random = getRandomTwit(length);

        $scope.status = statuses[random].message;

        $scope.nbChar = $scope.status.length;

        function getRandomTwit(length){
            return Math.floor((Math.random() * length));
        }
    }


}