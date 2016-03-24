/**
 * Created by Benzo Media.
 * http://www.benzomedia.com
 * User: Oren Reuveni
 * Date: 24/03/2016
 * Time: 23:27
 */
function BannerController($scope, $http) {


   

    $scope.dismissBanner = function(){

        $scope.bannerShown = false;
    }


    $scope.user = [];

    $http.get("/api/user").then(response => {
        $scope.user = response.data

        if($scope.user.id){
            $scope.bannerShown = false;
        } else {
            $scope.bannerShown = true;
        }
    })




}

module.exports = function(app) {
    app.controller('BannerController', ['$scope','$http', BannerController])
}