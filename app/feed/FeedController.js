function HomeController($scope, $http) {
    $scope.feeds = []
    $http.get('/api/feed').then(response => {
        $scope.feeds = response.data
    })
        /*.catch(err => {
        // TODO: notify the user on the error
        console.log(err)})*/
}

module.exports = function(app) {
    app.controller('FeedController', ['$scope','$http', HomeController])
}