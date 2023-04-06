import { ElMessage } from 'element-plus';
import { useFetch } from 'nuxt/app.js';
import { _AsyncData } from 'nuxt/dist/app/composables/asyncData.js';

let baseurl = 'http://localhost:1337/blog-contents'

export interface ResponseConfig {
    code: number,
    status: number,
    data: any,
    msg: string
}

export interface ValueConfig {
    value: any
}

const fetch = (url: string, options?: any): Promise<any> => {
    const requestUrl = baseurl + url
    return new Promise((resolve, reject) => {
        useFetch(requestUrl, { ...options })
            .then(({ data, error }: _AsyncData<any, any>) => {
                if (error.value) {
                    reject(error.value)
                    return
                }
                const val = data.value
                if (!val) {
                    reject(val)
                    return
                } else if (val.code == 102) {
                    ElMessage({
                        message: val.msg,
                        type: 'error'
                    })
                } else {
                    resolve(ref(val))
                }
            })
    })
}

export default new class Http {
    get(url: string, params?: any): Promise<any> {
        return fetch(url, { method: 'get', params })
    }
    post(url: string, params?: any): Promise<any> {
        return fetch(url, { method: 'post', params })
    }
    put(url: string, body?: any): Promise<any> {
        return fetch(url, { method: 'put', body })
    }
    delete(url: string, body?: any): Promise<any> {
        return fetch(url, { method: 'delete', body })
    }
}