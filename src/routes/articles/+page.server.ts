import axios from '$lib/axios';
// import axios from "axios";
let domain = "https://vwapi.netdevs.net/"
import { STRAPI_API } from '$env/static/private';
export async function load() {
    const headers = {
        Authorization: 'Bearer ' + STRAPI_API
    }
    const url = domain+'api/article?populate=deep';
    const response = await axios.get(url, { headers });
    const urlCategories = domain+'api/blog-categories?populate=deep';
    const categories = await axios.get(urlCategories, { headers }); 

    const urlSiteSettings = domain+'api/site-setting?populate=deep,3';
    const siteSettings = await axios.get(urlSiteSettings, { headers }); 
    return {
        page: response.data,
        categories: categories.data,
        fallback: siteSettings.data
    }
}