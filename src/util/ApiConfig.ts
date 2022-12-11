import { EnvConfig } from "./EnvConfig";
import { IRetrieveDTO } from '../models/FiltersModels';

export class ApiConfig{

    private static baseRoute : string = `http://${EnvConfig.API_HOST}:${EnvConfig.API_PORT}/`;

    /* Start */
    public static loginRoute = () => this.baseRoute + `users/login`;
    public static registerRoute = () => this.baseRoute + `users/register`;

    /* Filters */
    public static upsertFiltersRoute = () => this.baseRoute + `filters`;
    public static retrieveFiltersRoute = (retrieveDTO : IRetrieveDTO) => this.baseRoute + `filters/${retrieveDTO.userId}`;
}