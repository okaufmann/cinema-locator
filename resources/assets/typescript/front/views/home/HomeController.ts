/**
 * Created by okaufmann on 26.02.2016.
 */
namespace views.home {
    export const route:ng.ui.IState = {
        name: 'home',
        url: '/',
        templateUrl: 'templates/home/index.html',
        controller: 'HomeController'
    }

    export interface IHomeControllerScope {
        setTitle:Function;
        title:String;
        name:String;
    }

    export class HomeController {
        private scope:IHomeControllerScope;

        constructor($scope:IHomeControllerScope) {
            this.scope = $scope;

            this.scope.name = "Hans";
            this.scope.title = "Welcome";
        }
    }
}