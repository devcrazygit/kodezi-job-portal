import { SigninRequest, SignupRequest } from 'types/models/auth';
import Api from '../../global/Api';

const getSession = () => {
    return Api.get('users/me');
};
const signin = (data: SigninRequest) => {
    return Api.post('login', null, data);
}
const signup = (data: SignupRequest) => {
    return Api.post('register', null, data);
}
const commonApi = {
    getSession,
    signin,
    signup
};
export default commonApi;
