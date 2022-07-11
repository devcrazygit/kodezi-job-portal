import { getToken } from './LocalStorage';
import axios from 'axios';
import { getAbsoluteUrl, getUrlWithParam } from '../helpers/url';
import { camelCaseKeys, snakeCaseKeys } from '../helpers/object';
import _ from 'lodash';

axios.defaults.headers.common['X-Requested-With'] = 'XMLHttpRequest';

const baseUrl = process.env.REACT_APP_API_URL;

const precessHeaders = (headers: Record<string, any> | null) => {
    if (!headers) headers = {};

    headers = {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        ...headers,
    };

    const token = getToken();
    if (token) {
        headers['Authorization'] = 'Bearer ' + token;
    }
    return headers;
};
export type ApiMethodType = 'GET' | 'POST' | 'DELETE' | 'PUT';

export const requestErrorHandler = (e: any, cb: Function) => {
    if (
        e.response &&
        e.response.data &&
        e.response.data.errors &&
        !_.isEmpty(e.response.data.errors)
    ) {
        let errors = [];
        for (const errorField in e.response.data.errors) {
            errors.push(e.response.data.errors[errorField]);
        }
        cb({ message: errors.join('<br/>') });
    } else if (e.response && e.response.data && e.response.data.message) {
        cb({ message: e.response.data.message, status: e.response.status });
    } else {
        cb(e);
    }
};

const apiWrapper = (
    method: 'GET' | 'POST' | 'DELETE' | 'PUT',
    url: string,
    headers: Record<string, any> | null,
    data?: any
) => {
    return new Promise<any>(async (resolve, reject) => {
        let postHeader = precessHeaders(headers);
        // if (data instanceof FormData) {
        //     delete postHeader['Content-Type'];
        // }

        if (data instanceof Object && !(data instanceof FormData)) {
            data = _.omit(data, 'errors');
        }
        let absUrl = getAbsoluteUrl(url, baseUrl);
        if (method === 'POST' || method === 'PUT') {
            if (!(data instanceof FormData)) {
                data = snakeCaseKeys(data);
            }
        } else {
            absUrl = getUrlWithParam(absUrl, data);
        }

        try {
            let response = null;
            if (method === 'GET') {
                response = await axios.get(absUrl, { headers: postHeader });
            } else if (method === 'POST') {
                response = await axios.post(absUrl, data, {
                    headers: postHeader,
                });
            } else if (method === 'PUT') {
                response = await axios.put(absUrl, data, {
                    headers: postHeader,
                });
            } else {
                response = await axios.delete(absUrl, { headers: postHeader });
            }
            resolve(camelCaseKeys(response.data));
        } catch (e) {
            // if (
            //     e.response &&
            //     e.response.data &&
            //     e.response.data.errors &&
            //     !_.isEmpty(e.response.data.errors)
            // ) {
            //     let errors = [];
            //     for (const errorField in e.response.data.errors) {
            //         errors.push(e.response.data.errors[errorField]);
            //     }
            //     reject({ message: errors.join('<br/>') });
            // } else if (
            //     e.response &&
            //     e.response.data &&
            //     e.response.data.message
            // ) {
            //     reject({ message: e.response.data.message });
            // } else {
            //     reject(e);
            // }
            requestErrorHandler(e, reject);
        }
    });
};

const Api = {
    get: (
        url: string,
        headers: Record<string, any> | null = null,
        data: any = {}
    ) => {
        return apiWrapper('GET', url, headers, data);
    },
    post: (
        url: string,
        headers: Record<string, any> | null = null,
        data: any = {}
    ) => {
        return apiWrapper('POST', url, headers, data);
    },
    put: (
        url: string,
        headers: Record<string, any> | null = null,
        data: any = {}
    ) => {
        return apiWrapper('PUT', url, headers, data);
    },
    delete: (
        url: string,
        headers: Record<string, any> | null = null,
        data: any = {}
    ) => {
        return apiWrapper('DELETE', url, headers, data);
    },
};

export default Api;
