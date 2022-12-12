import React from "react";
import { io, Socket } from "socket.io-client";
import { EnvConfig } from "../util/EnvConfig";

export type SocketContextType = {
    socket : any
};

type Props = {
    children?: React.ReactNode;
};

export const SocketContext = React.createContext<SocketContextType | null>(null);

export function SocketProvider({children} : Props) { 

    const socket = React.useState<Socket | null>(io(EnvConfig.SOCKET_URL, {transports: ["websocket"],
                                                                           reconnectionDelayMax: 1000}));
    
    const value : SocketContextType = {socket: socket}

    return <SocketContext.Provider value={value}>{children}</SocketContext.Provider>
};