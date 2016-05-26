/**
 * Created by okaufmann on 26.02.2016.
 */
namespace views.home {
    export const route:ng.ui.IState = {
        name: 'home',
        url: '/',
        templateUrl: 'templates/home.html',
        controller: ViewModel
    }

    interface IScope extends ng.IScope {
        setTitle:Function;
        title:String;
        name:String;
    }

    function ViewModel($scope:IScope) {
        this.scope = $scope;

        this.scope.name = "Hans";
        this.scope.title = "Welcome";
    }
}