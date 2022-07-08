import { PagerQueryType } from "../types/common";

const DEFAULT_PAGE_SIZE = 20;

export const searchRegex = (pattern: string) => new RegExp(`.*${pattern}.*`);
export const sanitizePager = (query: PagerQueryType): PagerQueryType => {
    let { page, size } = query;
    if (!page) page = 1;
    if (!size) size = DEFAULT_PAGE_SIZE;
    return {page, size}
}