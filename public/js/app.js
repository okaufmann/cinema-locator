angular.module('cinema-locator', [
    'ngSanitize',
    'ui.router',
]);
angular.module('cinema-locator')
    .config(function ($stateProvider, $urlRouterProvider, $uiViewScrollProvider, $httpProvider) {
    $urlRouterProvider.otherwise("/");
    $uiViewScrollProvider.useAnchorScroll();
    $stateProvider
        .state(views.home.route)
        .state(views.theaters.route);
});
var views;
(function (views) {
    var home;
    (function (home) {
        home.route = {
            name: 'home',
            url: '/',
            templateUrl: 'templates/home.html',
            controller: ViewModel
        };
        function ViewModel($scope) {
            this.scope = $scope;
            this.scope.name = "Hans";
            this.scope.title = "Welcome";
        }
    })(home = views.home || (views.home = {}));
})(views || (views = {}));
var views;
(function (views) {
    var theaters;
    (function (theaters) {
        theaters.route = {
            name: 'theaters',
            url: '/',
            templateUrl: 'templates/theaters.html',
            controller: ViewModel
        };
        function ViewModel($scope) {
        }
    })(theaters = views.theaters || (views.theaters = {}));
})(views || (views = {}));
//# sourceMappingURL=app.js.map