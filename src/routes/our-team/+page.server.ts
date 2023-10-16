import axios from 'axios';
import { STRAPI_API } from '$env/static/private';
let domain = "https://vwapi.netdevs.net/"

export async function load() {
    const headers = {
        Authorization: 'Bearer ' + STRAPI_API 
    }
    const response = await axios.get(domain+"api/our-team?populate=deep", { headers });
    return response.data;
}                                                                     