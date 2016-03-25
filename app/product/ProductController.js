/**
 * Created by Benzo Media.
 * http://www.benzomedia.com
 * User: Oren Reuveni
 * Date: 22/03/2016
 * Time: 15:43
 */
function ProductController($rootScope, $scope, $stateParams,$http) {
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



    $scope.user = [];

    $http.get("/api/user").then(response => {
        $scope.user = response.data
    })


    $scope.vote = function(vote) {

        if(!$scope.user.id){
            $rootScope.$broadcast("popLogin");
        } else {

            if(vote == "notYet") {

                $http.post("api/product/notyet/"+$scope.product.id).then(response => {
                    $scope.product = response.data
                })

            } else if( vote == "launch") {

                $http.post("api/product/launch/"+$scope.product.id).then(response => {
                    $scope.product = response.data
                })

            }

        }

    }



}

module.exports = function(app) {
    app.controller('ProductController', ["$rootScope",'$scope', '$stateParams','$http', ProductController])
}