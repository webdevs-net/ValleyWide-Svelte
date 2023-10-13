import axios from '$lib/axios';
import { STRAPI_API } from '$env/static/private';


export const load: PageLoad = async ({ params, fetch }) => {
    const url = 'https://api.ulfbuilt.com/api/portfolios?filters[slug][$eq]='+params.slug+'&populate=deep,3';
    const headers = {
        Authorization: 'Bearer ' + STRAPI_API 
    }    
    const response = await axios.get(url, { headers });

    const urlporfolios = 'https://api.ulfbuilt.com/api/portfolios?populate=deep';
    
    const portfolios = await axios.get(urlporfolios, { headers }); 

    const urlSiteSettings = 'https://api.ulfbuilt.com/api/site-setting?populate=deep,3';
    const siteSettings = await axios.get(urlSiteSettings, { headers }); 

    return {
        portfolio: response.data,
        portfolios: portfolios.data,
        fallback: siteSettings.data
    }
    // const response = await axios.get(url, { headers });

	// let randomCat = response.data.data[0].attributes.categories.data;
	// randomCat = randomCat[Math.floor(Math.random() * randomCat.length ) ].id;

    // const rpUrl = 'https://api.ulfbuilt.com/api/portfolios?filters[categories][id][$eq]='+randomCat+'&populate=deep,2';
    // const rData = await axios.get(rpUrl, { headers });
    // const rPortfolios = getRandomPortfolios(rData.data.data, 2);
    // const portfolio = response.data;
    // return {
    //     portfolio,
    //     rPortfolios
    // };

    // function getRandomPortfolios(arr, count) {
    //     const shuffled = [...arr].sort(() => 0.5 - Math.random());
    //     return shuffled.slice(0, count);
    // }
}