export const getItem = (key: string, defaultValue: any = null): any => {
    const json = localStorage.getItem(key)
    if (!json) {
        return defaultValue || null
    }
    try {
        return JSON.parse(json)
    } catch (e) {
        return defaultValue || null
    }
}

export const setItem = (key: string, value: any): void => {
    const json = JSON.stringify(value)
    localStorage.setItem(key, json)
    return
}

export const clearItem = (key: string): void => {
    setItem(key, '')
}
