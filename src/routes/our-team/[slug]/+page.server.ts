import axios from '$lib/axios';
import { STRAPI_API } from '$env/static/private';
let domain = "https://vwapi.netdevs.net/"

export async function load(params: { params: { slug: string; }; }) {
    const url = domain+'api/team-members?filters[slug][$eq]='+params.params.slug+'&populate=deep';
    const headers = {
        Authorization: 'Bearer ' + STRAPI_API
    }
    const response = await axios.get(url, { headers });
    return response.data;
}                                                                     