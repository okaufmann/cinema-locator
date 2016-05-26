namespace models {
    export interface TheaterDto {
        id:number;
        tid:string;
        name:string;
        street_name:string;
        street_number:number;
        postal_code:number;
        city:string;
        state:string;
        country:string;
        country_code:string;
        latitude:number;
        longitude:number;
        created_at:Date;
        updated_at:Date;
        street:string;
    }
}