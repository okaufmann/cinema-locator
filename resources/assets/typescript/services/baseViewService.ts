namespace services {
    import ApiConfig = cinemaLocator.ApiConfig;

    export interface ILaravelPaginatedResult<TResult> {
        current_page:number;
        data:TResult;
        from:number;
        last_page:number;
        next_page_url:string;
        per_page:number;
        prev_page_url:string;
        to:number;
        total:number;
        total_pages:number;
    }

    import IHttpService = angular.IHttpService;

    export class BaseViewService {
        private http:ng.IHttpService;
        protected apiPrefix:string;
        private apiConfig:ApiConfig;

        constructor($injector:ng.auto.IInjectorService) {
            this.http = <any>$injector.get('$http');
            this.apiConfig = <any>$injector.get('apiConfig');
        }

        protected get<T>(url:string):ng.IHttpPromise<T> {
            var url = this.absUrl(url);
            console.log("get ", url);
            return this.http.get(url);
        }

        private absUrl(url:string):string {
            return this.apiConfig.baseUrl + "/" + this.apiPrefix + '/' + url;
        }
    }
}