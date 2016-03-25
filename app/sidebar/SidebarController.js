/**
 * Created by Benzo Media.
 * http://www.benzomedia.com
 * User: Oren Reuveni
 * Date: 24/03/2016
 * Time: 11:47
 */


function SidebarController($scope, $http) {




}

module.exports = function(app) {
    app.controller('SidebarController', ['$scope', '$http', SidebarController])
}