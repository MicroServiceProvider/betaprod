function PostController($scope, $http, $state) {
    $scope.product = {}

    $scope.submit = function () {
        $http.post('/api/product', $scope.product).
            then(p => {
                console.log(p)
                $state.go('product', {id: p.data.id})
            })
    }
}

module.exports = function(app) {
    app.controller('PostController', ['$scope','$http', '$state', PostController])
}