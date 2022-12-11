/* Related */

export enum ServerPreference{
    ne=0,
    eu=1,
    ap=2,
    kr=3
}

export interface AgeRange{
    minAge: number;
    maxAge: number;
}

export enum GameMode{
    competitive = 0,
    casual = 1
}

export enum RankType{
    iron = 1,
    bronze = 2,
    silver = 3,
    gold = 4,
    platinum = 5,
    diamond = 6,
    ascendent = 7,
    immortal = 8,
    radiant = 9
}

export enum RankLevel{
    one = 1,
    two = 2,
    three = 3
}

export enum Gender{
    allGenders = 0,
    woman = 1,
    man = 2,
    nonBinary = 3    
}

/* Filters */

export interface IFilters {
    serverPreference: ServerPreference;
    gameMode : GameMode;
    rankDisparity : number[];
    ageRange : number[];
    genders : boolean[];
}

/* DTOs */

export interface IUpsertDTO{
    userId : string,
    filters : IFilters
}

export interface IRetrieveDTO{
    userId : string
}