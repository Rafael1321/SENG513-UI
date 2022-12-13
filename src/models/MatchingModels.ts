import { IFilters } from "./FiltersModels";

/* DTOS */

export interface IFindMatchDTO{
    userId : string,
    filters : IFilters
}