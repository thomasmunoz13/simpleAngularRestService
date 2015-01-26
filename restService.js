myApp.service('REST', function($http, $q, $timeout) {

    RestService = {};

    // Main urls for the requests
    RestService.url = "";

    RestService.REST = function(method, part, data, headers){
        RestService.testConnect();

        // Simplify the requests (because we're all lazy) :)
        headers = (headers === 'json') ? 'application/json' : headers;
        headers = (headers !== undefined) ? headers : "application/x-www-form-urlencoded";

        // Make data looks like url parameter for urlencoded requests
        data = (headers === "application/x-www-form-urlencoded") ? $.param(data) : data;

        // Clean parameters
        data = (data !== undefined) ? data : {} ;
        part = (part !== undefined) ? part : '';

        method = (method === 'GET' || method === 'POST' || method === 'PUT' || method === 'DELETE') ? method : 'GET';

        // Return the promise that you can access like every other promise in AngularJS (best comment ever)
        return $http({
            url: RestService.url + '/' + part,
            method: method,
            headers: {'Content-Type': headers},
            data: data,
            withCredentials: true
        });
    };

    /* Function you can call everytime you make a request to your API
     * It wait (timeout or 2 seconds) for a response and display a message if it's not.
     */
    RestService.testConnect = function(timeout) {
        var timeoutPromise = $timeout(function() {
            canceler.resolve(); //aborts the request when timed out
            RestService.displayMessage("The server didn't respond in time, please try again.");
        }, (timeout === undefined) ? 2000 : timeout);

        var canceler = $q.defer();

        $http.get(RestService.url).success(function(){
            $timeout.cancel(timeoutPromise);
        });
    };

    // Yeah it's a simple alert(), but you can make your own message displaying if you want ...
    RestService.displayMessage = function($message){
      alert($message);
    };

    return RestService;
});