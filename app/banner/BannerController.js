/**
 * Created by Benzo Media.
 * http://www.benzomedia.com
 * User: Oren Reuveni
 * Date: 24/03/2016
 * Time: 23:27
 */
function BannerController($scope, $http) {

    $scope.bannerShown = true;

    $scope.dismissBanner = function(){

        $scope.bannerShown = false;
    }
}

module.exports = function(app) {
    app.controller('BannerController', ['$scope','$http', BannerController])
}