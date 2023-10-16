import axios from '$lib/axios';
import { STRAPI_API } from '$env/static/private';
let domain = "https://vwapi.netdevs.net/"
export async function load() {
    const url = domain+'api/our-process?populate=deep,2';
    const headers = {
        Authorization: 'Bearer ' + STRAPI_API
    }    
    const response = await axios.get(url, { headers });
    return response.data;
}                                                                     