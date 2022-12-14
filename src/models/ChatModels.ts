export interface IMessage {
    userId : string;
    type: string;
    text: string;
    userIcon: string;
}

export interface IReceiveMsgDTO{
    msg: string;
}