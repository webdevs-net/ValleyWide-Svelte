<script lang="ts">
    export let data;
    import {Container} from 'sveltestrap';
    import Cta from '$lib/components/layout/Cta.svelte';
	import PageBanner from '$lib/components/layout/PageBanner.svelte';
    // import { fade, fly } from "svelte/transition";
    import { textAnimate, fly, fadeIn, slide } from '$lib/GsapAnimation.js';
    const url = "https://api.ulfbuilt.com/";

    import { onMount } from "svelte";
	import { loadingCursor } from '$lib/cursorChange.js';
	onMount(() => {
		loadingCursor();
	});

</script>
<svelte:head>
	<title>{data.data.attributes.title ? data.data.attributes.title : 'Privacy Policy'}</title>
	<meta name="description" content="ULF BUILT" />
</svelte:head>
<PageBanner title="{data.data.attributes.title ? data.data.attributes.title : 'Privacy Policy'}" extraClass="privacy" subTitle="{data.data.attributes.Subheading ? data.data.attributes.Subheading : ''}"  banner="{url}{data.data.attributes.Cover.data.attributes.url}"/>

<section class="content" >
    <Container class="mw-1000 h-text">
        <h2 class="text-center mb-5 text-animate secondary-font" in:textAnimate id="privacy_heading" gsap-duration="1.5" gsap-start="top center">{data.data.attributes.Heading ? data.data.attributes.Heading : ''}</h2>
        <div in:fadeIn id="privacy_content" gsap-duration="1" gsap-start="top center">{@html data.data.attributes.Content ? data.data.attributes.Content : ''}</div>
    </Container>
</section>
<Cta/>
<style lang="scss">
.content{
    h2 {
        color: $secondary-color;
        justify-content: center;
    }
    :global(p){
        line-height: 1.7rem !important;        
    }
    :global(h3){
        padding-bottom: 0.971rem;
        font-size: 2.25rem;
        font-feature-settings: 'pnum' on, 'lnum' on;
        color: $figmablack;
        font-weight: 400;
    }         
    :global(img){
        height: 1.2rem;
    }    
}
</style>