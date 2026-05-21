

export interface User {
    _id: string;
    name: string;
    phone: string;
    email: string;
    isEmailVerified: boolean;
    status: string;
    profilePic: string;
    createdAt: Date;
}