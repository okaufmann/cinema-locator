/**
 * Created by okaufmann on 26.02.2016.
 */
var views;
(function (views) {
    var home;
    (function (home) {
        home.route = {
            name: 'home',
            url: '/',
            templateUrl: 'templates/home/index.html',
            controller: 'HomeController'
        };
        var HomeController = (function () {
            function HomeController($scope) {
                this.scope = $scope;
                this.scope.name = "Hans";
                this.scope.title = "Welcome";
            }
            return HomeController;
        }());
        home.HomeController = HomeController;
    })(home = views.home || (views.home = {}));
})(views || (views = {}));
/// <reference path="..\typings\browser.d.ts" />
/// <reference path="views\home\HomeController.ts" /> 
/// <reference path="includes.ts" />
angular.module('cinema-locator', [
    'ngSanitize',
    'ui.router',
]);
angular.module('cinema-locator').config(function ($stateProvider, $urlRouterProvider) {
    // For any unmatched url, redirect to /state1
    $urlRouterProvider.otherwise("/");
    $stateProvider
        .state(views.home.route);
});
angular.module('cinema-locator').controller("HomeController", ['$scope',
    function ($scope) { return new views.home.HomeController($scope); }]);
