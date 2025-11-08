export interface UserAvatar {
    file?: File;
    previewUrl?: string;
}

export interface User {
    id?: number;
    fullname: string;
    email: string;
    email_verified_at?: string;
    avatar?: string;
    avatar_payload?: UserAvatar;
    phone_number: string;
    address: string;
    role_id: number;
    createAt?: string;
    updatedAt?: string;
}
