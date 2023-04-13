import Http from './request'

export const config1 = (url: string, params: any) => {
    return Http.get(url, params)
}


export const config2 = (url: string, params: any) => {
    return Http.post(url, params)
}
