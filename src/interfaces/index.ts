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
export interface Book{

    id?: string;    
    author?: string;
    title?: string;
    description?: string;    
    user?:User
}
export interface Books{
    books?: Book[];
    user?:User;

    errors?: any;
    errorMessage?:string;
    success?: boolean;    
}