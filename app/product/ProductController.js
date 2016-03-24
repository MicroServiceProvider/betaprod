/**
 * Created by Benzo Media.
 * http://www.benzomedia.com
 * User: Oren Reuveni
 * Date: 22/03/2016
 * Time: 15:43
 */
function ProductController($scope, $stateParams,$http) {
    $scope.product = {}
    $scope.loading = true
    $http.get(`api/product/${$stateParams.id}`).then(response=> {
        $scope.product = response.data
        $scope.fb_comments_url = `http://betaprod.co/product/${$scope.product.id}`

        setImmediate(function() {
            if (typeof FB !== 'undefined') {
                FB.XFBML.parse()
            }
        })
    }).catch(err=> {
        console.log(err)
    })
}

module.exports = function(app) {
    app.controller('ProductController', ['$scope', '$stateParams','$http', ProductController])
}