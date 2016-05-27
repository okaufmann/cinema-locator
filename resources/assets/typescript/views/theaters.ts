/**
 * Created by okaufmann on 26.02.2016.
 */

/*
 * Problem solving:
 * https://github.com/salmanarshad2000/demos/blob/v1.0.0/google-maps/zoom-to-fit-markers-v3.html
 * https://github.com/angular-ui/angular-google-maps/blob/cbd17a3a225dfe543faa124eb295e66db566f27c/example/assets/scripts/controllers/example.js
 * */

namespace views.theaters {
    import TheaterViewService = services.TheaterViewService;
    import TheaterDto = models.TheaterDto;
    import IModalService = angular.ui.bootstrap.IModalService;
    import IModalServiceInstance = angular.ui.bootstrap.IModalServiceInstance;
    import ShowtimeDayDto = models.ShowtimeDayDto;
    import MovieDto = models.MovieDto;
    import FavoriteService = services.FavoriteService;
    export const route:ng.ui.IState = {
        name: 'theaters',
        url: '/theaters',
        templateUrl: 'templates/theaters.html',
        controller: ViewModel
    }

    interface IScope extends ng.IScope {
        loading:boolean;
        clearFavorites();
        favoritedTheaters:models.TheaterDto[];
        nothingFound:boolean;
        bounds:any;
        maps:any;
        mapLoaded:Boolean;
        markerClick(theater:TheaterDto):void;
        map:{center: {latitude: number, longitude: number}, zoom: number, control:any};
        theaters:TheaterDto[];
        queryTheaters(near:string):void;
        near:string;
    }

    function ViewModel($scope:IScope, theaterViewService:TheaterViewService, uiGmapGoogleMapApi, $uibModal:IModalService, favoriteService:FavoriteService, $timeout) {
        $scope.theaters = [];
        $scope.near = '';
        $scope.map = {control: {}, center: {latitude: 46.680385, longitude: 8.1117656}, zoom: 8};
        $scope.mapLoaded = false;
        $scope.maps = {};
        $scope.nothingFound = false;
        $scope.loading = true;

        $scope.queryTheaters = (near:string):void => {
            console.log("queryTheaters near := ", near);

            $scope.nothingFound = false;

            $scope.loading = true;

            if(_.isEmpty(near)){
                $scope.nothingFound = true;
            }

            theaterViewService.queryTheatersNear(near).then(theaters => {

                if (theaters && theaters.length > 0) {
                    $scope.theaters = theaters;
                    setBounds();
                }else{
                    $scope.nothingFound = true;
                }

                $scope.loading = false;
            },() => {
                $scope.nothingFound = true;
                $scope.loading = false;
            });
        }

        $scope.markerClick = theater => {
            showShowtimes(theater);
        }

        uiGmapGoogleMapApi.then(function (maps) {

            $scope.maps = maps;
            $scope.mapLoaded = true;

            $timeout(initFavorites(), 1000);

            $scope.loading = false;
        });

        $scope.clearFavorites = () => {
            favoriteService.clearAll();
            $scope.theaters = null;
        }

        function initFavorites() {
            var theaters = favoriteService.getTheaters();

            if (theaters && theaters.length > 0) {
                $scope.theaters = theaters;
            }
        }

        function setBounds():void {

            var latlngbounds = new $scope.maps.LatLngBounds();

            for (var i = 0; i < $scope.theaters.length; i++) {
                var cords = $scope.theaters[i].coordinates;
                var latLng = new google.maps.LatLng(cords.latitude, cords.longitude);

                latlngbounds.extend(latLng);
            }

            console.log($scope.map.control);

            $scope.map.control.getGMap().fitBounds(latlngbounds);
        }

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

            modalInstance.result.then(function () {
                $scope.favoritedTheaters = favoriteService.getTheaters();
            }, function () {
                //$log.info('Modal dismissed at: ' + new Date());
            });
        };
    }

    interface IScopeModal extends ng.IScope {
        toggleFavorite(theater:TheaterDto);
        currentFavorit:boolean;
        loading:boolean;
        close();
        dayMovies:MovieDto[];
        theaterDays:ShowtimeDayDto[];
        selectedIndex:number;
        theater:TheaterDto;
        showMovieDay(index:number);
    }

    function ModalCtrl($scope:IScopeModal, theaterViewService:TheaterViewService, $uibModalInstance:IModalServiceInstance, favoriteService:FavoriteService, theater:TheaterDto) {
        $scope.theater = theater;
        $scope.selectedIndex = 0;
        $scope.loading = true;

        $scope.currentFavorit = false;

        theaterViewService.getShowtimesByTheater(theater.tid, theater.city).then(days => {
            $scope.theaterDays = days;
            $scope.showMovieDay(0);
            $scope.loading = false;
        });

        $scope.currentFavorit = favoriteService.isFavorit(theater);

        $scope.showMovieDay = (index:number) => {
            $scope.selectedIndex = index;
            $scope.dayMovies = $scope.theaterDays[index].movies;
        };

        $scope.toggleFavorite = (theater:TheaterDto)=> {
            if (favoriteService.isFavorit(theater)) {
                favoriteService.unfavourite(theater);
                $scope.currentFavorit = false;

            } else {
                favoriteService.favourite(theater);
                $scope.currentFavorit = true;
            }
        }

        $scope.close = () => {
            $uibModalInstance.close();
        };
    }
}