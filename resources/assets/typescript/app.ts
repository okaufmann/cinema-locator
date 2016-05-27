/// <reference path="includes.ts" />

import IStateProvider = angular.ui.IStateProvider;
import IUrlRouterProvider = angular.ui.IUrlRouterProvider;
import IUiViewScrollProvider = angular.ui.IUiViewScrollProvider;

declare var google:any;
declare var _:UnderscoreStatic;

angular.module('cinemaLocator', [
        'cinemaLocator.config',
        'uiGmapgoogle-maps',
        'ngSanitize',
        'ui.bootstrap',
        'ui.router',
        'LocalStorageModule',
    ])
    .config(function (uiGmapGoogleMapApiProvider) {
        uiGmapGoogleMapApiProvider.configure({
            key: 'AIzaSyBWM97ybdGFr1zWA7R6w3o9IF0oCu7DWGQ',
            libraries: 'weather,geometry,visualization'
        });
    }).config(function (localStorageServiceProvider) {
    localStorageServiceProvider
        .setPrefix('cinemaLocator');
});

function mdLoader():ng.IDirective {
    return {
        restrict: 'E',
        template: `
        <div class="md-loader">
    <svg class="spinner" width="50px" height="50px" viewBox="0 0 66 66" xmlns="http://www.w3.org/2000/svg">
   <circle class="path" fill="none" stroke-width="6" stroke-linecap="round" cx="33" cy="33" r="30"></circle>
</svg></div>`,
        replace: true
    }
}

angular.module('cinemaLocator').directive('mdLoader', mdLoader);