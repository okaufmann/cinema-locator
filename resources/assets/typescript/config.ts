module cinemaLocator {
    export interface ApiConfig {
        baseUrl:string;
    }

    angular.module('cinemaLocator.config', [])
        .constant('apiConfig', {
            baseUrl:'http://dev.mm-dev.com/api/v1'
        });
}