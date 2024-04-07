export interface IUser {
    id: number;
    login: string;
    password: string;
    fio: string;
    phone: string;
    email: string;
    role: IRole;
}
export enum IRole {
    user="user",
    admin="admin"
}