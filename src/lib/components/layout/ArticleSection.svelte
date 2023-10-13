<script lang="ts">
	import { Col, Container, Row,  Accordion, AccordionItem } from "sveltestrap";
	import { onMount } from "svelte";
	import axios from "axios";
	import { PUBLIC_STRAPI_API } from '$env/static/public';
	// import { fade, fly } from 'svelte/transition';
	// import Animate from "$lib/components/Animate.svelte";
	import { textAnimate, fly, fadeIn, slide } from '$lib/GsapAnimation.js';

	const domain = "https://api.ulfbuilt.com"
	
	let promise = fetchCta();
	async function fetchCta(){
		const url = 'https://api.ulfbuilt.com/api/global-article-cta?populate=deep,2';
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
	});	

</script>
{#await promise}
{:then insight} 
	<section class="insight" id="article">
		<Container>
			<Row>
				<Col>
					<span class="insight__pre-heading">{insight.leftPreHeading ? insight.leftPreHeading : ''}</span>
				</Col>
			</Row>
			<Row>
				<Col md="6" class="">
					<div >
						{#if insight.image.data}
						<img in:slide id="global_article_img" gsap-x="-30" gsap-duration="1.2" src="{domain}{insight.image.data.attributes.formats.large.url ? insight.image.data.attributes.formats.large.url : insight.image.data.attributes.url}" alt="Stair">
						{/if}
					</div>
				</Col>
				<Col md="6" class="my-auto">
					<div class="insight__content">
						<div class="insight__content__wrapper">
							<!-- <div class="insight__content__wrapper__pre-heading">{insight.rightPreHeading ? insight.rightPreHeading : ''}</div> -->
							<h2 class="text-animate secondary-font" in:textAnimate id="global_article_title" gsap-duration="1.5">{insight.Heading ? insight.Heading : ''}</h2>
							<div in:fly id="global_article_cont" gsap-delay="0.5" gsap-duration="1.2"  gsap-y="30">
								{@html insight.paragprah ? insight.paragprah : ''}
								<div class="insight__content__wrapper__btns">
									<a href="{insight.leftBtnUrl ? insight.leftBtnUrl : '#'}/" class="btn btn-secondary">{insight.leftBtnTitle ? insight.leftBtnTitle : 'Button'}</a> <a href="{insight.rightBtnUrl ? insight.rightBtnUrl : '#'}/" class="btn btn-inverted">{insight.rightBtnTitle ? insight.rightBtnTitle : 'Button'}</a>
								</div>
							</div>
						</div>
					</div>				
				</Col>
			</Row>
		</Container>
	</section>
{/await}


<style lang="scss">
	.insight{
		background-color: #F2F2F2;
		// padding: 12rem 0;
		padding: 8rem 0;
		margin-bottom: 0;
		min-height: 100vh;
		display: flex;
    	align-items: center;
		@include media-max(md){
			padding-left: 3rem;
			padding-right: 3rem;
		}
		// @include media-max(sm){
		// 	padding-left: 0;
		// 	padding-right: 0;
		// }
		@include media-max(sm){
			padding-left: 1rem;
			padding-right: 1rem;
		}
		&__pre-heading{
			color: $primary-color;
			margin-bottom: 2rem;
			display: block;	
			font-weight: 500;		
		}
		&__content{
			&__wrapper{
				padding-left: 4rem;		
				@include media-max(ipadmini){
					// padding: 1rem 0 0;
					padding: 0;
				}					
				&__pre-heading{
					color: $secondary-color;
					font-weight: 500;
					@include media-max(sm){
						padding: 2rem 0 0;
					}						
				}	
				span{
					color: $primary-color;
					margin-bottom: 1rem;
					font-weight: 500;
				}
				h2{
					margin: 1rem 0 2rem;	
					font-weight: 400;
					// flex-wrap: wrap;
					// width: 35rem;
					@include media-max(ipadmini){
						margin-top: 0;
					}
					@include media-max(xs){
						margin-top: 2rem;
					}
				}
				:global(p){
					line-height: 2.125rem;
					font-size: 1.25rem;
					margin-bottom: 2rem;
				}		
				&__btns{
					// text-align: center;
					// margin-top: 1.5rem;
					display: flex;
					@include media-max(md){
						display: block;
					}
					@include media-max(sm){
						text-align: center;
					}
				}
				.btn {
					padding: 0.7rem 3.125rem; 
					font-size: 1.25rem;
					@include media-max(sm){
						padding: 0.7rem 1rem;
					}		
				}
				.btn-primary{
					margin-right: 1rem;
				}		
				.btn-secondary {
					margin-right: 1.25rem;
				}
				.btn-inverted{
					background-color: #fff;
					&:hover{
						background-color: $secondary-color;
						border-color: #fff;
					}					
				}
				@include media-max(md){
					.btn {
						margin-top: 1rem;
					}
				}	
			}
		}
	}    
</style>