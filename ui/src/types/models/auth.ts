export type SigninRequest = {
    email: string;
    password: string;
}
export type SignupRequest = {
    name: string;
    email: string;
    password: string;
    confirmPassword: string;
}