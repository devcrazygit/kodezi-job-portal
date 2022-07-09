import { toast } from 'react-toastify';
import {
    AppErrorType,
    ErrorType,
    ToastOptionType,
} from '../types/common';

export const formatError = (e: any): string => {
    if (!e) return '';
    if (e.message) {
        return e.message;
    }
    let msg = String(e);
    if (msg === '[object Object') {
        msg = 'Unknown Error';
    }
    return msg;
};

export const showError = (
    error: ErrorType,
    option: Partial<ToastOptionType> = {}
): void => {
    if (!error) return;

    if (Array.isArray(error)) {
        return error.forEach((item: string | AppErrorType) => showError(item));
    }

    const _DEFAULT: ToastOptionType = {
        position: 'top-right',
        autoClose: 5000,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
    };

    const postOption = { ..._DEFAULT, ...option };

    if (error instanceof Object) {
        let message = error.message;
        if (error?.message === 'Network request failed') {
            message = 'ネットワーク要求が失敗しました';
        }
        if (error.name === 'SyntaxError') {
            message = 'Syntax Error';
        }
        if (error?.code === 'Too Many Requests') {
            message =
                'Too Many Requests';
        }
        if (error?.code === 'Internal Server Error') {
            // if (!__DEV__) {
            message = 'Internal Server Error';
            // }
        }
        if (error.message === 'Request failed with status code 401') {
            message = 'Unauthorized';
        }
        toast.error(message);
    } else {
        toast.error(error, postOption);
    }
    return;
};
