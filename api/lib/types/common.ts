export interface PagerQueryType {
    page?: number,
    size?: number
}

export interface PagerResponseType<T = any> {
    docs: T[],
    totalDocs: number,
    limit: number,
    hasPrevPage: boolean,
    hasNextPage: boolean,
    page: number,
    totalPages: number,
    offset: number,
    prevPage: number,
    nextPage: number,
    pagingCounter: number,
    meta: Object | boolean
}

export const dataToPagerResponse = <T>(data): PagerResponseType<T> => {
    let result = {
        docs: data.docs as T[],
        totalDocs: data.totalDocs,
        limit: data.limit,
        hasPrevPage: data.hasPrevPage,
        hasNextPage: data.hasNextPage,
        page: data.page,
        totalPages: data.totalPages,
        offset: data.offset,
        prevPage: data.prevPage,
        nextPage: data.nextPage,
        pagingCounter: data.pagingCounter,
        meta: data.meta
    }
    return result
}