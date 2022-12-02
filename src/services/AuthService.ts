import axios from 'axios';
import { ApiConfig } from '../util/ApiConfig';

export interface IAuthResponse {
    data : any;
    statusCode : number;
}

export class AuthService{

    public static login = async (userName : string, password : string) : Promise<IAuthResponse> => {

        let response = null;
        await axios({
            method: 'post',
            url: ApiConfig.loginRoute(),
            data: {
              userName: userName,
              password: password
            }
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
    
    public static register = async (userName : string, email : string, password : string) : Promise<IAuthResponse> => {
    
        let response = null;
        await axios({
            method: 'post',
            url: ApiConfig.registerRoute(),
            data: {
              userName: userName,
              email: email,
              password: password
            }
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