namespace services {
    import TheaterDto = models.TheaterDto;
    import ShowtimeDayDto = models.ShowtimeDayDto;
    import ILocalStorageService = angular.local.storage.ILocalStorageService;
    export class FavoriteService {
        private localStorageService:ILocalStorageService;

        private keys = {
            favourited: 'FAVORITED_THEATERS'
        };

        private tmpList;

        constructor($injector:ng.auto.IInjectorService) {
            this.localStorageService = <ILocalStorageService>$injector.get('localStorageService');
            this.tmpList = [];
        }

        getTheaters():TheaterDto[] {

            if (!this.tmpList || this.tmpList.length <= 0) {
                var favs = <string>this.localStorageService.get(this.keys.favourited);
                this.tmpList = <TheaterDto[]>this.jsonDecode<TheaterDto[]>(favs);
            }

            return this.tmpList;
        }

        isFavorit(theater:models.TheaterDto):any {

            var theaters = this.getTheaters();

            return _.filter(theaters, (item) => {
                    return item.tid == theater.tid;
                }).length > 0;
        }

        favourite(theater:models.TheaterDto):void {
            if (!this.isFavorit(theater)) {
                var theaters = this.getTheaters();

                if(!theaters){
                    theaters = [];
                }

                theaters.push(theater);

                this.save(theaters);
            }
        }

        unfavourite(theater:models.TheaterDto):void {
            if (this.isFavorit(theater)) {
                var theaters = this.getTheaters();

                theaters = _.reject(theaters, (item) => {
                    return item.tid == theater.tid;
                });

                this.save(theaters);
            }
        }

        clearAll():void {
            this.localStorageService.remove(this.keys.favourited);
        }

        private save(theaters){

            this.localStorageService.remove(this.keys.favourited);
            this.localStorageService.set(this.keys.favourited, this.jsonEncode(theaters));

            this.tmpList = theaters;
        }

        private jsonEncode(obj:any):string {
            return JSON.stringify(obj);
        }

        private jsonDecode<T>(text:string):T {
            return JSON.parse(text);
        }


    }
}

angular.module('cinemaLocator')
    .service('favoriteService', ['$injector',
        ($injector:ng.auto.IInjectorService) => new services.FavoriteService($injector)])
;