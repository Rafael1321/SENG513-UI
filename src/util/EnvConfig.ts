export class EnvConfig{

    /* Enviroment variables for api config */
    public static API_HOST : string = process.env.REACT_APP_API_HOST ?? "";
    public static API_PORT : string = process.env.REACT_APP_API_PORT ?? "";

    /* Others */
    public static DEBUG : boolean = ( (process.env.REACT_APP_DEBUG??'true') === 'true');
}