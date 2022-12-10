
export class ApiConfig{

    private static baseRoute : string = '';

    /* Start */
    public static loginRoute = () => this.baseRoute + ``;
    public static registerRoute = () => this.baseRoute + ``;

    /* Filters */
    public static saveFilters = () => this.baseRoute + ``;
    public static retrieveFilters = (userId : string) => this.baseRoute + ``;
}