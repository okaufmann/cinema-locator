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
angular.module('cinema-locator', [
    'ngSanitize',
    'ui.router',
]);
angular.module('cinema-locator').config(function ($stateProvider, $urlRouterProvider) {
    $urlRouterProvider.otherwise("/");
    $stateProvider
        .state(views.home.route);
});
angular.module('cinema-locator').controller("HomeController", ['$scope',
    function ($scope) { return new views.home.HomeController($scope); }]);
//# sourceMappingURL=app.js.map