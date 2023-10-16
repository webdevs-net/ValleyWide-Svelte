import axios from "axios";
import { STRAPI_API } from '$env/static/private';
let domain = "https://vwapi.netdevs.net/"
export async function load(){
    const url = domain+'api/menus/1?nested&populate=*';
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