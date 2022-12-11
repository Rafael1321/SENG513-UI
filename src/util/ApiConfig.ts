import env from "ts-react-dotenv";

export class ApiConfig{

    private static baseRoute : string = `http://${env.API_HOST}:${env.API_PORT}/`;

    /* Start */
    public static loginRoute = () => this.baseRoute + `users/login`;
    public static registerRoute = () => this.baseRoute + `users/register`;
}