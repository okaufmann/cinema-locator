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
    'uiGmapgoogle-maps',
    'ngSanitize',
    'ui.bootstrap',
    'ui.router',
])
    .config(function (uiGmapGoogleMapApiProvider) {
    uiGmapGoogleMapApiProvider.configure({
        key: 'AIzaSyBWM97ybdGFr1zWA7R6w3o9IF0oCu7DWGQ',
        libraries: 'weather,geometry,visualization'
    });
});
function mdLoader() {
    return {
        restrict: 'E',
        template: "\n        <div class=\"md-loader\">\n    <svg class=\"spinner\" width=\"65px\" height=\"65px\" viewBox=\"0 0 66 66\" xmlns=\"http://www.w3.org/2000/svg\">\n   <circle class=\"path\" fill=\"none\" stroke-width=\"6\" stroke-linecap=\"round\" cx=\"33\" cy=\"33\" r=\"30\"></circle>\n</svg></div>",
        replace: true
    };
}
angular.module('cinemaLocator').directive('mdLoader', mdLoader);
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
            var query = this.get('theaters/near/' + near + "?language=de");
            return query.then(function (result) {
                return result.data.data;
            });
        };
        TheaterViewService.prototype.getShowtimesByTheater = function (tid, near) {
            return this.get('theater/' + tid + '/' + near).then(function (result) {
                return result.data.data;
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
        function ViewModel($scope, theaterViewService, uiGmapGoogleMapApi, $uibModal) {
            $scope.theaters = [];
            $scope.near = 'Interlaken';
            $scope.map = { control: {}, center: { latitude: 46.680385, longitude: 8.1117656 }, zoom: 8 };
            $scope.mapLoaded = false;
            $scope.maps = {};
            $scope.nothingFound = false;
            $scope.queryTheaters = function (near) {
                console.log("queryTheaters near := ", near);
                theaterViewService.queryTheatersNear(near).then(function (theaters) {
                    if (theaters && theaters.length > 0) {
                        $scope.theaters = theaters;
                        var latlngbounds = new $scope.maps.LatLngBounds();
                        for (var i = 0; i < $scope.theaters.length; i++) {
                            var cords = $scope.theaters[i].coordinates;
                            var latLng = new google.maps.LatLng(cords.latitude, cords.longitude);
                            latlngbounds.extend(latLng);
                        }
                        $scope.map.control.getGMap().fitBounds(latlngbounds);
                    }
                });
            };
            $scope.markerClick = function (theater) {
                showShowtimes(theater);
            };
            uiGmapGoogleMapApi.then(function (maps) {
                $scope.maps = maps;
                $scope.mapLoaded = true;
            });
            function showShowtimes(theater) {
                var modalInstance = $uibModal.open({
                    templateUrl: 'templates/showtimesModal.html',
                    controller: ModalCtrl,
                    resolve: {
                        theater: function () {
                            return theater;
                        }
                    }
                });
            }
            ;
        }
        function ModalCtrl($scope, theaterViewService, $uibModalInstance, theater) {
            $scope.theater = theater;
            $scope.selectedIndex = 0;
            $scope.loading = true;
            theaterViewService.getShowtimesByTheater(theater.tid, theater.city).then(function (days) {
                $scope.theaterDays = days;
                $scope.showMovieDay(0);
                $scope.loading = false;
            });
            $scope.showMovieDay = function (index) {
                $scope.selectedIndex = index;
                $scope.dayMovies = $scope.theaterDays[index].movies;
            };
            $scope.close = function () {
                $uibModalInstance.close();
            };
        }
    })(theaters = views.theaters || (views.theaters = {}));
})(views || (views = {}));
//# sourceMappingURL=app.js.map