import React from "react";

export interface ILoggedUser {
    id?: string;
    userName : string;
    email : string;
}

export type LoggedUserContextType = {
    loggedUser : ILoggedUser,
    updateLoggedUser : (loggedUser : ILoggedUser) => void
};

type Props = {
    children?: React.ReactNode;
};

export const LoggedUserContext = React.createContext<LoggedUserContextType | null>(null);

export function LoggedUserProvider({children} : Props) { 

    const [loggedUser, setLoggedUser] = React.useState<ILoggedUser | null>(null);
    
    const updateLoggedUser = (loggedUser: ILoggedUser) : void => {
        setLoggedUser(loggedUser);
    }

    const value : LoggedUserContextType = {loggedUser:loggedUser, updateLoggedUser:updateLoggedUser}

    return <LoggedUserContext.Provider value={value}>{children}</LoggedUserContext.Provider>
};