export const env = (key: string, defaultValue?: string): string => {
    return (process.env[key]) ? process.env[key]: defaultValue;
}