export interface singleUserData {
    _id: number;
    email: string;
    password: string;
    first_name: string;
    last_name: string;
    phone_number: string;
}

export interface singleUserResponse {
    data: singleUserData;
}