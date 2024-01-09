import axios from 'axios';
import { STRAPI_API } from '$env/static/private';
let domain = "https://vwapi.netdevs.net/"
export const load: PageLoad = async ({ params, fetch }) => {
    const url = domain + 'api/blogs?filters[slug][$eq]=' + params.slug + '&populate=deep';
    const headers = {
        Authorization: 'Bearer ' + STRAPI_API
    }
    const response = await axios.get(url, { headers });

    const urlblog = domain + 'api/blogs?populate=deep';
    const blogs = await axios.get(urlblog, { headers }); 
    return {
        page: response.data,
        blogs: blogs.data,
        num: Math.ceil(Math.random() * 10)
    }
}
