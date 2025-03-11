import { Injectable } from '@nestjs/common';
import axios, { AxiosInstance } from 'axios';
import { HttpAdapter } from '../interfaces/http-adapter.interface';

@Injectable()
export class AxiosAdapter implements HttpAdapter {

    private axios: AxiosInstance;
    constructor(){
        this.axios = axios.create();
    }

    async get<T>(url: string): Promise<T> {
        try{
            const {data} = await this.axios.get<T>(url);
            return data;
        } catch(error){
            throw new Error('this is an error - Check logs');
        }
    }

}