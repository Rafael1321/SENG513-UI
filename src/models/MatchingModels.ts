import { IUser } from "./AuthModels";
import { IFilters } from "./FiltersModels";

export interface IMatchFoundDTO {
  user: IUser;
}

export interface IFindMatchDTO {
  userId: string;
  filters: IFilters;
}
