function PostController($scope) {
}

module.exports = function(app) {
    app.controller('PostController', ['$scope', PostController])
}