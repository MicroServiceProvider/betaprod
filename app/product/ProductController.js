/**
 * Created by Benzo Media.
 * http://www.benzomedia.com
 * User: Oren Reuveni
 * Date: 22/03/2016
 * Time: 15:43
 */
function ProductController($scope, $stateParams,$http) {
    console.log($stateParams)
    $scope.product = {}
    $http.get(`api/product/${$stateParams.id}`).then(response=> {
        $scope.product = response.data

        DISQUS.reset({
            reload: true,
            config: function () {
                this.page.identifier = $scope.product.id;
                this.page.url = `http://betaprod.co/product/${$scope.product.id}`;
            }
        });
    }).catch(err=>{
        console.log(err)
    })
}

module.exports = function(app) {
    app.controller('ProductController', ['$scope', '$stateParams','$http', ProductController])
}