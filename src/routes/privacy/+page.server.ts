import { STRAPI_API } from '$env/static/private';

export async function load() {
    const url = 'https://api.ulfbuilt.com/api/privacy-policy-page?populate=*';
    const response = await fetch(url, {
        headers: { 'Authorization': 'bearer ' + STRAPI_API },
    });
    return response.json();
}