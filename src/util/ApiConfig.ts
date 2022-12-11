import { EnvConfig } from "./EnvConfig";

export class ApiConfig{

    private static baseRoute : string = `http://${EnvConfig.API_HOST}:${EnvConfig.API_PORT}/`;

    /* Start */
    public static loginRoute = () => this.baseRoute + `users/login`;
    public static registerRoute = () => this.baseRoute + `users/register`;
}