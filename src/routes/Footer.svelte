<script lang="ts">
import { Col, Container, Row } from 'sveltestrap';
import { onMount } from "svelte";
import axios from "axios";
import credit from "$lib/img/homebuilder.svg";
// import Animate from "$lib/components/Animate.svelte"
// import { fly } from "svelte/transition";
import { fadeIn } from '$lib/GsapAnimation.js';
let domain = "https://vwapi.netdevs.net/"
import { PUBLIC_STRAPI_API } from '$env/static/public';
	// import { fadeIn } from '$lib/GsapAnimation';

let promise = fetchCta();
async function fetchCta(){
    const url = domain + 'api/footer?populate=deep,3';
    const headers = {
        Authorization: 'Bearer ' + PUBLIC_STRAPI_API
    };

    try {
        const response = await axios.get(url, { headers });
        return response.data.data.attributes.widget;
    } catch (error) {
        console.error('Error fetching data:', error);
    }
}

let promiseSite = fetchSiteSettings();
async function fetchSiteSettings(){
    const url = domain + 'api/site-setting?populate=deep,3';
    const headers = {
        Authorization: 'Bearer ' + PUBLIC_STRAPI_API
    };

    try {
        const response = await axios.get(url, { headers });
        return response.data.data.attributes;
    } catch (error) {
        console.error('Error fetching data:', error);
    }
}

onMount(() => {
    promise = fetchCta();
    promiseSite = fetchSiteSettings();
});	

function scrollToTop() {
  window.scrollTo({ top: 0, behavior: 'smooth' });
}

</script>
<footer class="footer">
    <div class="pre-footer">
        <div class="pre-footer__btt" on:click="{scrollToTop}">
            <svg width="30" height="11" viewBox="0 0 30 11" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M1.44043 8.96631L15.4066 1.71729L28.5605 8.96631" stroke="white" stroke-width="2" stroke-linecap="square"/>
            </svg>
            <span>TOP</span>    
        </div>
</div>
    <!-- <Animate> -->
        <Container>
            <Row>
                {#await promise}
                {:then widgets}     
                    {#each widgets as widget, index}
                        <Col class="footer__col">
                            <div class="footer__widget1 footer--widget" in:fadeIn id="footer-items{index}" gsap-duration="1" gsap-delay={index/2}>
                                {#if widget.title }
                                    <div class="footer__widget__heading">
                                        <h4>{widget.title}</h4>
                                    </div>
                                {/if}
                                {#each widget.item as item}
                                    <div class="footer__widget footer__widget--item">
                                        {@html item.item ? item.item : ''}
                                    </div>                            
                                {/each}
                            </div>                  
                        </Col>
                    {/each}
                {/await}
            </Row>        
            <Row>
                <Col>
                    {#await promiseSite}
                    {:then siteSettings}   
                    <div class="footer__post-footer">
                        <div class="footer__post-footer__social">
                            <span class="footer__post-footer__social__icon footer__post-footer__social__icon--fb">
                                <a href="{siteSettings.SiteDetails.fbLink ? siteSettings.SiteDetails.liLink : '#'}" target="_blank">
                                    <svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="32" height="32" viewBox="0 0 32 32">
                                        <path d="M 8.6425781 4 C 7.1835781 4 6 5.181625 6 6.640625 C 6 8.099625 7.182625 9.3085938 8.640625 9.3085938 C 10.098625 9.3085938 11.283203 8.099625 11.283203 6.640625 C 11.283203 5.182625 10.101578 4 8.6425781 4 z M 21.535156 11 C 19.316156 11 18.0465 12.160453 17.4375 13.314453 L 17.373047 13.314453 L 17.373047 11.310547 L 13 11.310547 L 13 26 L 17.556641 26 L 17.556641 18.728516 C 17.556641 16.812516 17.701266 14.960938 20.072266 14.960938 C 22.409266 14.960937 22.443359 17.145609 22.443359 18.849609 L 22.443359 26 L 26.994141 26 L 27 26 L 27 17.931641 C 27 13.983641 26.151156 11 21.535156 11 z M 6.3632812 11.310547 L 6.3632812 26 L 10.923828 26 L 10.923828 11.310547 L 6.3632812 11.310547 z" fill="white"  ></path>
                                    </svg>                               
                                </a>
                            </span>   
                                                                  
                        </div>
                        <div class="footer__post-footer__paragraph">
                            <p>{siteSettings.SiteDetails.OperatingHours ? siteSettings.SiteDetails.OperatingHours.replace(/(<([^>]+)>)/gi, "") : ''}

                                {#await promise}
                                {:then widgets}     
                                    {#each widgets as widget, index}
                                        {#if index == 3}
                                            {#each widget.item as item}
                                                    {@html item.item ? item.item : ''}
                                            {/each}
                                        {/if}
                                    {/each}
                                {/await}

                            </p>
                        </div>
                    </div>
                    {/await}
                </Col>
            </Row>
        </Container>
</footer>
<div class="copyright">
    <Container>
        <a href="https://homebuilder.app" target="_blank">
            <img src="{credit}" class="mySVG" alt="HomeBuilder.app">
        </a>
    </Container>
</div>
<style lang="scss">
    :global(.col.footer__col){
        @include media-max(sm){
            flex: 100%;
            margin-bottom: 3rem;
            h4{
                max-width: 20rem;
            }
        }
    }
    :global(.footer-logo){
        width:80%;
        max-width: 20rem;
    }
    :global(.footer__widget--item p) {
        width: 80%;
        @include media-max(ipadmini){
            width: 100%;
        }
    }
    :global(.footer__widget--item p br) {
        display: none;
    }
    :global(.footer__post-footer__paragraph p){
        font-size: 1rem;
        display: flex;
        justify-content: space-between;
    }
    :global(.footer__col:nth-child(4) .footer__widget--item a){
    display: block;
    padding: 0.25rem 0;
    }
    :global(.footer__post-footer__paragraph p span a){
        text-decoration: none;
        padding-right: 1rem;
        @include media-max(sm){
            display: none;
        }
    }
    .copyright{
        background-color: #333333;
        padding: 1.2rem 0;
        img{
            height: 30px;
            width: auto;
        }
    }
    .mySVG:hover{
        filter: brightness(0) saturate(100%) invert(100%) sepia(1%) saturate(7474%) hue-rotate(48deg) brightness(108%) contrast(103%);
    }
</style>