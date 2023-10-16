import { STRAPI_API } from '$env/static/private';
let domain = "https://vwapi.netdevs.net/"
export async function load() {
    const url = domain+'api/privacy-policy-page?populate=*';
    const response = await fetch(url, {
        headers: { 'Authorization': 'bearer ' + STRAPI_API },
    });
    return response.json();
}