import { IUser } from "./AuthModels";
import { IFilters } from "./FiltersModels";

/* DTOS */

export interface IFindMatchDTO{
    userId : string,
    filters : IFilters
}

export interface IMatchFoundDTO{
    user : IUser
}