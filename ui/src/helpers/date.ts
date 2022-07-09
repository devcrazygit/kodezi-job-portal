import moment from 'moment';

export const calcLeftDays = (d1: string | null | Date) => {
    if (!d1) return '';
    const date: any = typeof d1 === 'string' ? new Date(d1) : d1;
    const now: any = new Date();

    const diffInMs = Math.abs(date - now);
    return Math.round(diffInMs / (1000 * 60 * 60 * 24));
};

export const formatDate = (dateString: string | null | undefined) => {
    if (!dateString) return '';
    const dateTime = new Date(dateString);
    return (
        dateTime.getUTCFullYear() +
        '/' +
        (dateTime.getUTCMonth() + 1) +
        '/' +
        dateTime.getUTCDate()
    );
};
export const convertTimeHumanReadable = (date: string | null | undefined) => {
    if (!date) return '';
    const segs = date.split(' ');
    if (segs.length > 1) {
        date = segs[0] + 'T' + segs[1];
    }
    const data = moment(date);
    const now = moment();
    let result = '';
    if (data.format('YYYY') !== now.format('YYYY')) {
        result = result + data.format('YYYY');
    }
    result = result + data.format('MM月DD日 HH:MM');
    return result;
};
