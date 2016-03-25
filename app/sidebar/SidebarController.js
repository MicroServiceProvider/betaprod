/**
 * Created by Benzo Media.
 * http://www.benzomedia.com
 * User: Oren Reuveni
 * Date: 24/03/2016
 * Time: 11:47
 */


function SidebarController($scope, $http) {

    $scope.featuredProducts = [];

    $http.get('/api/feed/featured').then(response => {
        $scope.featuredProducts = response.data
    })


}

module.exports = function(app) {
    app.controller('SidebarController', ['$scope', '$http', SidebarController])
}