/**
 * Created by Benzo Media.
 * http://www.benzomedia.com
 * User: Oren Reuveni
 * Date: 24/03/2016
 * Time: 13:16
 */


function ToolbarController($rootScope, $scope, $http, $mdDialog, $mdMedia, $state ) {

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

        if($scope.isLogged()){
            $state.go("post");
        } else {
            openLogintDialog()
        }


    }

    $scope.isLogged = function () {
        if( $scope.user.id) {
            return true;
        } else {
            return false;
        }
    }


    //Listen to time change and reBootstrap the app
    var unbindPopLogin = $rootScope.$on('popLogin', function (event) {
        openLogintDialog();
    });

    //Unbinding from rootScope (see more at:"http://stackoverflow.com/questions/11252780/whats-the-correct-way-to-communicate-between-controllers-in-angularjs")
    $scope.$on('$destroy', unbindPopLogin);


}

function LoginDialogController($scope) {
    $scope.closeDialog = function(){
        $mdDialog.cancel();
    }
};

module.exports = function(app) {
    app.controller('ToolbarController', ['$rootScope', '$scope', '$http', '$mdDialog', '$mdMedia', '$state' , ToolbarController])
    app.controller('LoginDialogController',['$scope', LoginDialogController])
}