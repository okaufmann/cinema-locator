angular.module('cinema-locator')
    .config(($stateProvider: ng.ui.IStateProvider, $urlRouterProvider: ng.ui.IUrlRouterProvider, $uiViewScrollProvider: any, $httpProvider: ng.IHttpProvider) => {
        // For any unmatched url, redirect to /state1
        $urlRouterProvider.otherwise("/");
        $uiViewScrollProvider.useAnchorScroll();

        $stateProvider
            .state(views.home.route)
            .state(views.theaters.route);
    });