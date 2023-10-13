import axios from "axios";
import { STRAPI_API } from '$env/static/private';

export async function load(){
    const url = 'https://api.ulfbuilt.com/api/menus/1?nested&populate=*';
    const headers = {
        Authorization: 'Bearer ' + STRAPI_API
    };

    try {
        const response = await axios.get(url, { headers });
        return response.data;
    } catch (error) {
        console.log(error);
    }    
}