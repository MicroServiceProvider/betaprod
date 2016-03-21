function PostController($scope) {
    $scope.message = 'hello posts'
}

module.exports = function(app) {
    app.controller('PostController', ['$scope', PostController])
}