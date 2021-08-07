export interface User {
    id?: string;
    uid?: string;
    name?: string;
    email?: string;
    password?: string;
    errors?: any;
    errorMessage?:string;
    success?: boolean;
    isAuthenticated?: boolean;
}