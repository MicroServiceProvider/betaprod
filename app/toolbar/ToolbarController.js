/**
 * Created by Benzo Media.
 * http://www.benzomedia.com
 * User: Oren Reuveni
 * Date: 24/03/2016
 * Time: 13:16
 */


function ToolbarController($scope, $http, $mdDialog, $mdMedia) {

    //EDIT Project
    $scope.login = function(){
        openLogintDialog();
    }


    //Open the Edit Project Dialog
    function openLogintDialog(){
        $scope.status = '';
        $scope.customFullscreen = $mdMedia('xs') || $mdMedia('sm');

        var useFullScreen = ($mdMedia('sm') || $mdMedia('xs')) && $scope.customFullscreen;

        $mdDialog.show({
            controller: LoginDialogController,
            template: require('./loginDialog.html'),
            parent: angular.element(document.body),
            openFrom: event.currentTarget,
            closeTo: event.currentTarget,
            clickOutsideToClose: true
        })
    }

    function LoginDialogController($scope) {

        $scope.closeDialog = function(){
            $mdDialog.cancel();
        }
    };

}

module.exports = function(app) {
    app.controller('ToolbarController', ['$scope', '$http', '$mdDialog', '$mdMedia', ToolbarController])
}