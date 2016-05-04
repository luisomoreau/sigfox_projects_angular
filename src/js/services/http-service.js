/**
 * Http Service
 */

angular
    .module('SgfProjects')
    .service('HttpService', ['$http', HttpService]);


function HttpService($http) {
    this.getBaseURL = getBaseURL;

    this.getDevices = getDevices;
    this.getMessages = getMessages;

    var baseURL = 'http://sigfox.louismoreau.eu:3001/api/';

    function getBaseURL() {
        return baseURL;
    }

    function getDevices(onReady, onError) {
        var url = baseURL + 'devices',

            onError = onError || function () {
                    console.log('Failure loading devices');
                };

        $http
            .get(url)
            .success(onReady)
            .error(onError);
    }
    
    function getMessages(onReady, onError){
        var url = baseURL + 'messages',

            onError = onError || function () {
                    console.log('Failure loading messages');
                };

        $http
            .get(url)
            .success(onReady)
            .error(onError);
    }

}