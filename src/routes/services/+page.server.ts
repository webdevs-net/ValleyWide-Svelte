import { STRAPI_API } from '$env/static/private';
import axios from '$lib/axios';
let domain = "https://vwapi.netdevs.net/"
export async function load() {
    const url = domain+'api/our-services-page?populate=*';
    const headers = {
        Authorization: 'Bearer ' + STRAPI_API 
    }  
    const response = await axios.get(url, { headers });

    const urlPortfolios = domain+'api/portfolios?fields[0]=title&fields[1]=slug&populate[2]=featuredImage';;
    const portfolios = await axios.get(urlPortfolios, { headers }); 

    const urlSiteSettings = domain+'api/site-setting?populate=deep,3';
    const siteSettings = await axios.get(urlSiteSettings, { headers }); 

    // return response.json();
    return {
        services: response.data,
        portfolios: portfolios.data,
        fallback: siteSettings.data
    }
}

