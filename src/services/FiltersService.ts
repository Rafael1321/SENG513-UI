import axios from 'axios';
import { ApiConfig } from '../util/ApiConfig';
import { IFilters } from '../contexts/FilterContext';

export interface IFiltersResponse {
    data : any;
    statusCode : number;
}

export class FiltersService{

    public static save = async (filters : IFilters) : Promise<IFiltersResponse> => {

        let response = null;
        await axios({
            method: 'post',
            url: ApiConfig.saveFilters(),
            data: filters
        }).then((response : any) => {
            response = {
                data:response.data,
                statusCode:response.status
            }
        }).catch( (err : any) => {
            response = {
                data:null,
                statuCode: err.response.status
            } 
        });
        return response;
    }
    
    public static retrieve = async () : Promise<IFiltersResponse> => {
    
        let response = null;
        await axios({
            method: 'get',
            url: ApiConfig.retrieveFilters(),
        }).then((response : any) => {
            response = {
                data:response.data,
                statusCode:response.status
            }
        }).catch( (err : any) => {
            response = {
                data:null,
                statuCode: err.response.status
            } 
        });
        return response;
    }
}