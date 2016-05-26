/// <reference path="includes.ts" />

import IStateProvider = angular.ui.IStateProvider;
import IUrlRouterProvider = angular.ui.IUrlRouterProvider;
import IUiViewScrollProvider = angular.ui.IUiViewScrollProvider;

angular.module('cinemaLocator', [
    'cinemaLocator.config',
    'ngSanitize',
    'ui.router',
]);