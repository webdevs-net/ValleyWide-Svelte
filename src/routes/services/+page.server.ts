import { STRAPI_API } from '$env/static/private';
import axios from '$lib/axios';

export async function load() {
    const url = 'https://api.ulfbuilt.com/api/our-services-page?populate=*';
    const headers = {
        Authorization: 'Bearer ' + STRAPI_API 
    }  
    const response = await axios.get(url, { headers });

    const urlPortfolios = 'https://api.ulfbuilt.com/api/portfolios?populate=deep';
    const portfolios = await axios.get(urlPortfolios, { headers }); 

    const urlSiteSettings = 'https://api.ulfbuilt.com/api/site-setting?populate=deep,3';
    const siteSettings = await axios.get(urlSiteSettings, { headers }); 

    // return response.json();
    return {
        services: response.data,
        portfolios: portfolios.data,
        fallback: siteSettings.data
    }
}

