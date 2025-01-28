import axios, { AxiosRequestConfig, AxiosResponse } from "axios";


export async function makeRequest(options: AxiosRequestConfig){
    try{
        const response: AxiosResponse = await axios(options)
        return response
    }catch(err: any){
        return err
    }
}