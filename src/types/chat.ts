export interface Member {
    _id: string;
    name: string;
    profilePic?: string;
}

export interface Chat {
    _id: string;
    chatType: string;
    memberDetails: Member[];
}

export interface Message {
    _id: string;
    chatId: string;
    sender: {
        _id: string;
        name: string;
        profilePic?: string;
    };
    senderModel: "User" | "Doctor";
    text: string;
    isDeleted: boolean;
    createdAt: string;
}