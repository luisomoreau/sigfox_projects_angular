/**
 * Http Service
 * This service let you connect to the REST API
 */

angular
    .module('SgfProjects')
    .service('HttpService', ['$http', HttpService]);


function HttpService($http) {
    this.getBaseURL = getBaseURL;

    this.getDevices = getDevices;
    this.getMessages = getMessages;
    this.getMessagesFromSpecificDay = getMessagesFromSpecificDay;

    this.setRandomTwit = setRandomTwit;
    this.getRandomTwit = getRandomTwit;

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

    function getMessagesFromSpecificDay(day, id, onReady, onError){
        var timezone = new Date().getTimezoneOffset();
        var offset = new Date(new Date().getTime() - (day * 24 * 60 * 60 * 1000) + (timezone * 60 * 1000));

        var url = baseURL + 'messages?filter[where][device]='+id+'&filter[where][time][gt]='+offset,


            onError = onError || function () {
                    console.log('Failure loading messages');
                };

        $http
            .get(url)
            .success(onReady)
            .error(onError);
    }

    function setRandomTwit(data, onReady, onError){
        var url = baseURL + 'randomTwits',

            onError = onError || function () {
                    console.log('Failure setting random Twit');
                };

        $http
            .post(url, data)
            .success(onReady)
            .error(onError);
    }

    function getRandomTwit(onReady, onError){
        var url = baseURL + 'randomTwits',

            onError = onError || function () {
                    console.log('Failure getting random Twit');
                };

        $http
            .get(url)
            .success(onReady)
            .error(onError);
    }

}
