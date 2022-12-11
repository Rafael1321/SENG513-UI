import React from "react";
import { IUser } from "../models/AuthModels";
import { EnvConfig } from '../util/EnvConfig';

export type LoggedUserContextType = {
    loggedUser : IUser,
    updateLoggedUser : (loggedUser : IUser) => void
};

type Props = {
    children?: React.ReactNode;
};

export const LoggedUserContext = React.createContext<LoggedUserContextType | null>(null);

export function LoggedUserProvider({children} : Props) { 

    const [loggedUser, setLoggedUser] = React.useState<IUser | null>(null);
    
    React.useEffect(() => {
        if(EnvConfig.DEBUG) console.log(loggedUser);
    }, [loggedUser]); 

    const updateLoggedUser = (loggedUser: IUser) : void => {
        setLoggedUser(loggedUser);
    }

    const value : LoggedUserContextType = {loggedUser:loggedUser, updateLoggedUser:updateLoggedUser}

    return <LoggedUserContext.Provider value={value}>{children}</LoggedUserContext.Provider>
};