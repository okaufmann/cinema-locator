namespace services {
    import TheaterDto = models.TheaterDto;
    export class TheaterViewService extends BaseViewService {
        constructor($injector:ng.auto.IInjectorService) {
            super($injector);
            this.apiPrefix = "showtimes";
        }

        public queryTheatersNear(near:string):ng.IPromise<TheaterDto[]> {

            return this.get<TheaterDto[]>('theaters/near/' + near).then((result:ILaravelPaginatedResult<TheaterDto[]>) => {
                return result.data;
            })

        }

        public getShowtimesByTheater(tid:string, near:string):ng.IPromise<TheaterDto[]> {

            return this.get<TheaterDto[]>('theater/' + tid + '/' + near).then((result:any) => {
                console.log("got back:=" , result);
                return result.data;
            });

        }
    }
}

angular.module('cinemaLocator')
    .service('theaterViewService', ['$injector',
        ($injector:ng.auto.IInjectorService) => new services.TheaterViewService($injector)])
;