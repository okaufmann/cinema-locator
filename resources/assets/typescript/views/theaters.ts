/**
 * Created by okaufmann on 26.02.2016.
 */
namespace views.theaters {
    import TheaterViewService = services.TheaterViewService;
    import TheaterDto = models.TheaterDto;
    export const route:ng.ui.IState = {
        name: 'theaters',
        url: '/theaters',
        templateUrl: 'templates/theaters.html',
        controller: ViewModel
    }

    interface IScope extends ng.IScope {
        theaters:TheaterDto[];
        queryTheaters(near:string):void;
    }

    function ViewModel($scope:IScope, theaterViewService:TheaterViewService) {
        $scope.theaters = [];

        $scope.queryTheaters = (near:string):void => {
            console.log("queryTheaters near := ", near);
            theaterViewService.queryTheatersNear(near).then((theaters:TheaterDto[]) => {
                $scope.theaters = theaters;
            });
        }
    }
}