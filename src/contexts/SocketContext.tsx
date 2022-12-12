import React from "react";
import { io, Socket } from "socket.io-client";
import { EnvConfig } from "../util/EnvConfig";

export const socket = io(EnvConfig.SOCKET_URL, {transports: ["websocket"], reconnectionDelayMax: 1000});
export const SocketContext = React.createContext<Socket | null>(null);