<script lang="ts">
	import { Col, Container, Row,  Accordion, AccordionItem } from "sveltestrap";
	// import ctabg from "$lib/img/CTA-BG.svg";
	import { onMount } from "svelte";
	import axios from "axios";
	import { PUBLIC_STRAPI_API } from '$env/static/public';
	// import { fade, fly } from 'svelte/transition';
	// import Animate from "$lib/components/Animate.svelte";
	import { textAnimate, fly, fadeIn, slide, bgZoom } from '$lib/GsapAnimation.js';

	const domain = "https://api.ulfbuilt.com"
	let promise = fetchCta();
	async function fetchCta(){
		const url = 'https://api.ulfbuilt.com/api/global-cta?populate=deep,2';
		const headers = {
			Authorization: 'Bearer ' + PUBLIC_STRAPI_API
		};

		try {
			const response = await axios.get(url, { headers });
			console.log(response)
			return response.data.data.attributes;
		} catch (error) {
			console.error('Error fetching data:', error);
		}
	}

	onMount(() => {
		promise = fetchCta();
	});

</script>
{#await promise}
{:then ctaData} 
<!-- <Animate> -->
	<section class="home-cta" id="cta-section" in:bgZoom gsap-scale="1.5">
		<div class="home-cta-bg bg" id="cta-section-bg" style="--cta-banner: url({domain}{ctaData.backgroundImage.data.attributes.formats.large_x2.url ? ctaData.backgroundImage.data.attributes.formats.large_x2.url : ctaData.backgroundImage.data.attributes.url})"></div>
		<Container>
			<Row>
				<Col class="text-center">
					<div class="home-cta__container">
						<div class="home-cta__wrapper">
							<h2 class="text-animate secondary-font" in:textAnimate id="global_cta_title" gsap-duration="1">{ctaData.heading ? ctaData.heading : ''}</h2>
							<div in:fly id="global_cta_cont" gsap-delay="0.5" gsap-duration="1.2"  gsap-y="30">
								{@html ctaData.paragraph ? ctaData.paragraph : ''}
								<a href="{ctaData.btnUrl ? ctaData.btnUrl : '#'}" class="btn btn-secondary">{ctaData.btnTitle ? ctaData.btnTitle : 'Button'}</a>
							</div>
						</div>
					</div>
				</Col>
			</Row>
		</Container>
	</section>
<!-- </Animate>	 -->
{/await}
<style lang="scss">
	.home-cta{
		margin: 0;
		position: relative;
		min-height: 100vh;
		overflow: hidden;
		display: flex;
		align-items: center;
		.home-cta-bg {
			background-image: var(--cta-banner);
			background-size: cover;
			// min-height: 20vh;
			// background-attachment: fixed;
			background-position: center;
			position: absolute;
			left: 0;
            top: 0;
            height: 100%;
            width: 100%;
		}

		@include media-max(sm){
			padding-left: 1rem;
			padding-right: 1rem;
		}	
		&__container{
			height: 70vh;
			width: 100%;
			display: flex;
			align-items: center;
			justify-content: center;
		}
		&__wrapper {
			h2{
				color: #000;
				margin-bottom: 2rem;
				font-size: 2.5rem;
				justify-content: center;
				@include media-max(sm){
					font-size: 3rem;
				}
			}
			:global(p) {
				font-size: 1.25rem;
			}
			.btn{
				margin-top: 1rem;
				color: #fff;
				padding: 0.7rem 3.125rem; 
				font-size: 1.25rem;
			}
		}
		
	}    
</style>