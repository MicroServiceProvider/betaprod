/**
 * Created by Benzo Media.
 * http://www.benzomedia.com
 * User: Oren Reuveni
 * Date: 24/03/2016
 * Time: 13:16
 */


function ToolbarController($scope, $http, $mdDialog, $mdMedia, $state) {

    //EDIT Project
    $scope.login = function(){
        openLogintDialog();
    }

    $scope.user = [];

    $http.get("/api/user").then(response => {
        $scope.user = response.data
    })


    //Open the Edit Project Dialog
    function openLogintDialog(){
        $scope.status = '';
        $scope.customFullscreen = $mdMedia('xs') || $mdMedia('sm');

        var useFullScreen = ($mdMedia('sm') || $mdMedia('xs')) && $scope.customFullscreen;

        $mdDialog.show({
            controller: 'LoginDialogController',
            template: require('./loginDialog.html'),
            parent: angular.element(document.body),
            openFrom: event.currentTarget,
            closeTo: event.currentTarget,
            clickOutsideToClose: true
        })
    }

    $scope.postProduct = function(){

        if(isLogged()){
            $state.go("post");
        } else {
            openLogintDialog()
        }


    }

    function isLogged() {
        if( $scope.user.id) {
            return true;
        } else {
            return false;
        }
    }
}

function LoginDialogController($scope) {
    $scope.closeDialog = function(){
        $mdDialog.cancel();
    }
};

module.exports = function(app) {
    app.controller('ToolbarController', ['$scope', '$http', '$mdDialog', '$mdMedia', '$state', ToolbarController])
    app.controller('LoginDialogController',['$scope', LoginDialogController])
}