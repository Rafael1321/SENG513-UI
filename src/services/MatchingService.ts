import axios from 'axios';
import { IFindMatchDTO } from '../models/MatchingModels';
import { ApiConfig } from '../util/ApiConfig';

export interface IMatchingResponse {
    data : any;
    statusCode : number;
}

export class MatchingService{

    public static findMatch = async (findMatchDTO : IFindMatchDTO) : Promise<IMatchingResponse> => {
        try{
            let response = await axios({method: 'post', url: ApiConfig.findMatchRoute(), data: findMatchDTO});
            return {data:response?.data, statusCode:response?.status};
        }catch(err){
            return {data:err?.response?.data, statusCode:err?.response?.status};
        }
    }
}