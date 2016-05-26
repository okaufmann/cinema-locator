/// <reference path="includes.ts" />

import IStateProvider = angular.ui.IStateProvider;
import IUrlRouterProvider = angular.ui.IUrlRouterProvider;

angular.module('cinema-locator', [
    'ngSanitize',
    'ui.router',
]);

angular.module('cinema-locator').config(($stateProvider:IStateProvider, $urlRouterProvider:IUrlRouterProvider) => {
    // For any unmatched url, redirect to /state1
    $urlRouterProvider.otherwise("/");

    $stateProvider
        .state(views.home.route);
});

angular.module('cinema-locator').controller("HomeController", ['$scope',
    ($scope:views.home.IHomeControllerScope) => new views.home.HomeController($scope)]
);