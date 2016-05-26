var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var cinemaLocator;
(function (cinemaLocator) {
    angular.module('cinemaLocator.config', [])
        .constant('apiConfig', {
        baseUrl: 'http://dev.mm-dev.com/api/v1'
    });
})(cinemaLocator || (cinemaLocator = {}));
angular.module('cinemaLocator', [
    'cinemaLocator.config',
    'ngSanitize',
    'ui.router',
]);
angular.module('cinemaLocator')
    .config(function ($stateProvider, $urlRouterProvider, $uiViewScrollProvider, $httpProvider) {
    $urlRouterProvider.otherwise("/");
    $uiViewScrollProvider.useAnchorScroll();
    $stateProvider
        .state(views.home.route)
        .state(views.theaters.route);
});
var services;
(function (services) {
    var BaseViewService = (function () {
        function BaseViewService($injector) {
            this.http = $injector.get('$http');
            this.apiConfig = $injector.get('apiConfig');
        }
        BaseViewService.prototype.get = function (url) {
            var url = this.absUrl(url);
            console.log("get ", url);
            return this.http.get(url);
        };
        BaseViewService.prototype.absUrl = function (url) {
            return this.apiConfig.baseUrl + "/" + this.apiPrefix + '/' + url;
        };
        return BaseViewService;
    }());
    services.BaseViewService = BaseViewService;
})(services || (services = {}));
var services;
(function (services) {
    var TheaterViewService = (function (_super) {
        __extends(TheaterViewService, _super);
        function TheaterViewService($injector) {
            _super.call(this, $injector);
            this.apiPrefix = "showtimes";
        }
        TheaterViewService.prototype.queryTheatersNear = function (near) {
            return this.get('theaters/near/' + near).then(function (result) {
                return result.data;
            });
        };
        TheaterViewService.prototype.getShowtimesByTheater = function (tid, near) {
            return this.get('theater/' + tid + '/' + near).then(function (result) {
                console.log("got back:=", result);
                return result.data;
            });
        };
        return TheaterViewService;
    }(services.BaseViewService));
    services.TheaterViewService = TheaterViewService;
})(services || (services = {}));
angular.module('cinemaLocator')
    .service('theaterViewService', ['$injector',
    function ($injector) { return new services.TheaterViewService($injector); }]);
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
    (function (theaters_1) {
        theaters_1.route = {
            name: 'theaters',
            url: '/theaters',
            templateUrl: 'templates/theaters.html',
            controller: ViewModel
        };
        function ViewModel($scope, theaterViewService) {
            $scope.theaters = [];
            $scope.queryTheaters = function (near) {
                console.log("queryTheaters near := ", near);
                theaterViewService.queryTheatersNear(near).then(function (theaters) {
                    $scope.theaters = theaters;
                });
            };
        }
    })(theaters = views.theaters || (views.theaters = {}));
})(views || (views = {}));
//# sourceMappingURL=app.js.map