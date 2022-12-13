import { Gender, RankLevel, RankType, ServerPreference } from "../models/FiltersModels";

export class Micellaneous{

    // Converts a string to Title Case
    public static toTitleCase(str : string) {
        return str?.replace(
          /\w\S*/g,
          function(txt) {
            return txt?.charAt(0).toUpperCase() + txt?.substr(1).toLowerCase();
          }
        );
    }

    // Map rank to string 
    public static rankToString(rank : number[]){
        
        let rankType = "";
        let rankLevel = "";

        switch(rank[0]){
            case RankType.iron:
                rankType = "Iron";
                break;
            case RankType.bronze:
                rankType = "Bronze";
                break;
            case RankType.silver:
                rankType = "Silver";
                break;
            case RankType.gold:
                rankType = "Gold";
                break;
            case RankType.platinum:
                rankType = "Platinum";
                break;
            case RankType.diamond:
                rankType = "Diamond";
                break;
            case RankType.ascendant:
                rankType = "Ascendant";
                break;
            case RankType.immortal:
                rankType = "Immortal";
                break;
            case RankType.radiant:
                rankType = "Radiant";
                break;
        }

        switch(rank[1]){
            case RankLevel.one:
                rankLevel = " 1"
                break;
            case RankLevel.two:
                rankLevel = " 2";
                break;
            case RankLevel.three:
                rankLevel = " 3";
                break;
        }      
        
        return rankType + rankLevel;
    }

    // Map server preference to string 
    public static serverPreferenceToString(serverPref : ServerPreference, longVersion : boolean = false){
        switch(serverPref){
            case ServerPreference.na:
                return longVersion?'North America':'NA';
            case ServerPreference.eu:
                return longVersion?'Europe':'EU';
            case ServerPreference.ap:
                return longVersion?'Asia Pacific':'AP';
            case ServerPreference.kr:
                return longVersion?'Korea :)':'KR'
        }
    }

    // Map gender to string
    public static genderToString(gender : Gender, longVersion : boolean = false){
        switch(gender){
            case Gender.woman:
                return longVersion ? "Woman" : "W";
            case Gender.man:
                return longVersion ? "Man" : "M";
            case Gender.nonBinary:
                return longVersion ? "Non-Binary" : "NB";
        }
    }
}