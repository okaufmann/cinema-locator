namespace services {
    import TheaterDto = models.TheaterDto;
    import ShowtimeDayDto = models.ShowtimeDayDto;
    export class TheaterViewService extends BaseViewService {
        constructor($injector:ng.auto.IInjectorService) {
            super($injector);
            this.apiPrefix = "showtimes";
        }

        public queryTheatersNear(near:string):ng.IPromise<TheaterDto[]> {

            var query = this.get<ILaravelPaginatedResult<TheaterDto[]>>('theaters/near/' + near + "?language=de");

            return query.then(result => {
                return result.data.data;
            })

        }

        public getShowtimesByTheater(tid:string, near:string):ng.IPromise<ShowtimeDayDto[]> {

            return this.get<ILaravelPaginatedResult<ShowtimeDayDto[]>>('theater/' + tid + '/' + near).then(result => {
                return result.data.data;
            });

        }
    }
}

angular.module('cinemaLocator')
    .service('theaterViewService', ['$injector',
        ($injector:ng.auto.IInjectorService) => new services.TheaterViewService($injector)])
;