// import type { PageLoad } from './$types';
// export const load: PageLoad = async ({ params, fetch }) => {
//     const url = 'https://api.ulfbuilt.com/api/blogs?filters[slug][$eq]=' + params.slug + '&populate=deep';
//     const response = await fetch(url, {
//         headers: { 'Authorization': 'bearer  ec0d6b5aece1773cbd6e5f48756c70d9b0b3a59a4d1c325a2e699c1c1b1cae0980dc56aa2c3dfd565237b2a00db9a547a1a9e54a86f80697b31766e6bf80257b37760df84c70b534edeb4df0bdde9452777a52a757850d7a82c28dba854776c405f20ef3fbd95c72b759280f375f69191f2ca75d69600ea9584d8b2100309072' },
//     });
//     // console.log(response)
//     return response.json();
// }

import axios from '$lib/axios';
import { STRAPI_API } from '$env/static/private';
export const load: PageLoad = async ({ params, fetch }) => {
    const url = 'https://api.ulfbuilt.com/api/blogs?filters[slug][$eq]=' + params.slug + '&populate=deep';
    const headers = {
        Authorization: 'Bearer ' + STRAPI_API
    }
    const response = await axios.get(url, { headers });

    const urlblog = 'https://api.ulfbuilt.com/api/blogs?populate=deep';
    const blogs = await axios.get(urlblog, { headers }); 
    return {
        page: response.data,
        blogs: blogs.data,
        num: Math.ceil(Math.random() * 10)
    }
}
