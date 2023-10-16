// @ts-nocheck
import axios from '$lib/axios';
import { STRAPI_API } from '$env/static/private';
let domain = "https://vwapi.netdevs.net/"

export const load = async ({ params, fetch }: Parameters<PageLoad>[0]) => {
    const url = domain+'api/portfolios?filters[slug][$eq]='+params.slug+'&populate=deep,3';
    const headers = {
        Authorization: 'Bearer ' + STRAPI_API 
    }    
    const response = await axios.get(url, { headers });

    const urlporfolios = domain+'api/portfolios?populate=deep';
    
    const portfolios = await axios.get(urlporfolios, { headers }); 

    const urlSiteSettings = domain+'api/site-setting?populate=deep,3';
    const siteSettings = await axios.get(urlSiteSettings, { headers }); 

    return {
        portfolio: response.data,
        portfolios: portfolios.data,
        fallback: siteSettings.data
    }
}