function PostController($scope, $http,  $state, FileUploader) {
    $scope.uploader = new FileUploader({ url: '/api/product'})
    $scope.product = {}

    $scope.submit = function () {
        const array = Object.keys($scope.product).map(k=> {
            const obj = {}
            obj[k] = $scope.product[k]
            return obj
        })

        $scope.uploader.queue[0].onSuccess = function(p) {
            $state.go('product', {id: p.id})
        }
        $scope.uploader.queue[0].formData = array
        $scope.uploader.queue[0].upload()
    }
}

module.exports = function(app) {
    app.controller('PostController', ['$scope','$http',  '$state','FileUploader', PostController])
}