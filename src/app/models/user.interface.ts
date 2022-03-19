export enum UserType {
    Admin = 'admin',
    Customer = 'customer'
}

export interface User{
    id: string;
    type: UserType;
    name: string;
    email: string;
    password: string;
    token?: string;
    tel?: string;
    address?: string;
}

export interface UserTypeOption<T> {
    label: string,
    value: T
}

