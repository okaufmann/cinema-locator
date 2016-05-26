/**
 * Created by okaufmann on 26.02.2016.
 */
namespace views.theaters {
    export const route:ng.ui.IState = {
        name: 'theaters',
        url: '/',
        templateUrl: 'templates/theaters.html',
        controller: ViewModel
    }

    interface IScope extends ng.IScope {
        setTitle:Function;
        title:String;
        name:String;
    }

    function ViewModel($scope:IScope) {

    }
}