<script lang="ts">
	import { Col, Container, Row } from "sveltestrap";
    // import { Form, FormGroup, Input, Button } from 'sveltestrap';
	// import { fade, fly } from 'svelte/transition';
	// import { onMount } from "svelte";
	import Animate from "$lib/components/Animate.svelte";
	// import { fade, fly } from "svelte/transition";
	// import TextTransition from "$lib/TextTransition.svelte";
	import PortfolioCarousel from "$lib/components/layout/PortfolioCarousel.svelte";
	import Contactform from "$lib/components/layout/Contactform.svelte";
	// import livingRoom from "$lib/img/living-room.jpg";
	// import lvThropy from "$lib/img/lvThropy.jpg";
	// import firePlace from "$lib/img/firePlace.jpg";
    import Testimonial from "$lib/components/layout/Testimonial.svelte";
	// import contactBG from "$lib/img/ContactBG.jpg";
	import noFeatured from "$lib/img/blog-empty.svg"
	// import ImageLoader from "$lib/components/imageLazy/ImageLoader.svelte";
	import { textAnimate, fly, fadeIn, slide, scaleUp } from '$lib/GsapAnimation.js';
	import ParallaxImage from "$lib/components/parallaxImage.svelte";

	export let data;
	const domain = "https://api.ulfbuilt.com"
	let fallback = data.fallback.data.attributes.fallbackImage.data;
	
 	// const portfolio = data.portfolio.data[0].attributes;

	$: title = data.portfolio.data[0].attributes.title;
	$: projectHeading = data.portfolio.data[0].attributes.projectDetailHeading;
	$: images = data.portfolio.data[0].attributes.images.data;
	$: bannerQuotes = data.portfolio.data[0].attributes.bannerQuote;
	$: isFeatured = data.portfolio.data[0].attributes.isFeatured;
	$: projectDetailLocation = data.portfolio.data[0].attributes.projectDetailLocation;
	$: projectDetailTimeframe = data.portfolio.data[0].attributes.projectDetailTimeframe;
	$: ctaHeading = data.portfolio.data[0].attributes.ctaHeading;
	$: relatedPortfolioHeading = data.portfolio.data[0].attributes.relatedPortfolioHeading;

    $: relatedPortfolios = data.portfolios.data.sort(() => 0.5 - Math.random()).slice(0, 2);

	let name = '', email = '', subject = '', message = '', result = ''

    async function doContact () {

	}

	import { onMount } from "svelte";
	import { loadingCursor } from '$lib/cursorChange.js';
	onMount(() => {
		loadingCursor();
	});

</script>

<svelte:head>
	<title>{title ? title : 'Project'}</title>
	<meta name="description" content="ULF BUILT" />
</svelte:head>

<section class="portfolio-gallery" >

		<Container>
			<Row>
				<Col class="text-center">
					<div class="portfolio-gallery__content">
						<p class="pre-head" in:slide id="single-portfolio-preheading" gsap-duration="1">Project</p>
						<h1 class="h2 text-animate secondary-font" in:textAnimate gsap-duration="1.5" id="single-portfolio-heading">{title ? title : ''}</h1>
						<div in:fadeIn id="single-portfolio-cont" gsap-delay="0.5" gsap-duration="1.5">
							{@html data.portfolio.data[0].attributes.content ? data.portfolio.data[0].attributes.content : ""}
						</div>
					</div>
				</Col>
			</Row>
			<Row class="portfolio-gallery__slider">
				<PortfolioCarousel {images} />
			</Row>		
		</Container>
</section>

<section class="about-property">
	<!-- <Animate> -->
		<Container>
			<Row>
				<Col><h2 in:slide id="about-property-preheading" gsap-start="top 80%" gsap-duration="1">{projectHeading ? projectHeading : ''}</h2></Col>
			</Row>
			<Row>
				<Col md="12">
					<div class="about-property__content">
						<div class="about-property__content__heading">
							<div>
								<i>
									<svg width="32" height="40" viewBox="0 0 32 40" fill="none" xmlns="http://www.w3.org/2000/svg">
									<path d="M15.6096 37.8677C20.0675 33.9757 23.5067 30.1012 25.927 26.2444C28.3473 22.3875 29.5575 19.1275 29.5575 16.4644C29.5575 12.2585 28.224 8.8114 25.5571 6.12313C22.8901 3.43486 19.5749 2.09072 15.6115 2.09072C11.648 2.09072 8.33983 3.43541 5.68687 6.12478C3.03387 8.81415 1.70737 12.2637 1.70737 16.4733C1.70737 19.1389 2.92251 22.398 5.35279 26.2507C7.78308 30.1033 11.202 33.9757 15.6096 37.8677ZM15.6096 39.9999C10.3993 35.391 6.51964 31.1032 3.97077 27.1365C1.4219 23.1698 0.147461 19.6073 0.147461 16.4492C0.147461 11.5999 1.70689 7.73451 4.82575 4.85301C7.9446 1.97151 11.5414 0.530762 15.6161 0.530762C19.6907 0.530762 23.293 1.97167 26.4228 4.85348C29.5526 7.73529 31.1175 11.602 31.1175 16.4537C31.1175 19.6055 29.8354 23.1656 27.2713 27.134C24.7072 31.1024 20.8199 35.391 15.6096 39.9999ZM10.6397 21.5153H13.6304V16.3585H17.6345V21.5153H20.6252V13.2228L15.6096 9.95987L10.6397 13.2228V21.5153Z" fill="#00ADEE"/>
									</svg>
								</i>
								<span>
									{projectDetailLocation ? projectDetailLocation : ''}
								</span>
							</div>
							<div>
								<i>
									<svg width="41" height="40" viewBox="0 0 41 40" fill="none" xmlns="http://www.w3.org/2000/svg">
										<path d="M27.9993 28.4985L19.8204 20.3196V10.2102H21.5043V19.6804L29.1855 27.3616L27.9993 28.4985ZM2.81702 29.1785C2.14492 27.9186 1.62726 26.5791 1.26405 25.1598C0.900837 23.7405 0.692052 22.293 0.637695 20.8173H2.30009C2.35586 22.1471 2.56107 23.4384 2.91573 24.6911C3.27035 25.9438 3.7401 27.1672 4.32498 28.3612L2.81702 29.1785ZM0.637695 19.1334C0.692052 17.682 0.907994 16.2466 1.28552 14.8273C1.66304 13.4081 2.19929 12.0378 2.89426 10.7164L4.32498 11.5616C3.72151 12.7556 3.24712 13.9929 2.90179 15.2735C2.55642 16.554 2.35586 17.8407 2.30009 19.1334H0.637695ZM9.92339 36.9391C8.64786 36.1068 7.48099 35.1826 6.42277 34.1666C5.36459 33.1507 4.43795 31.9884 3.64286 30.6799L5.13577 29.7919C5.82504 30.9259 6.65267 31.9795 7.61864 32.9526C8.58458 33.9257 9.6417 34.7569 10.79 35.4462L9.92339 36.9391ZM5.13577 10.103L3.65574 9.2857C4.4508 8.03876 5.38244 6.88833 6.45065 5.83443C7.51887 4.78053 8.67645 3.85603 9.92339 3.06093L10.79 4.46165C9.65601 5.21239 8.60962 6.06502 7.65082 7.01954C6.69199 7.97406 5.85364 9.00187 5.13577 10.103ZM19.8204 40C18.3361 39.9456 16.8843 39.7297 15.465 39.3522C14.0458 38.9746 12.6919 38.4384 11.4035 37.7434L12.2486 36.3127C13.4098 36.9162 14.6306 37.3906 15.9112 37.7359C17.1917 38.0813 18.4948 38.2818 19.8204 38.3376V40ZM12.2486 3.6444L11.4035 2.20721C12.6919 1.54514 14.0458 1.02535 15.465 0.647824C16.8843 0.270298 18.3361 0.0543571 19.8204 0V1.61309C18.4948 1.70173 17.1917 1.91873 15.9112 2.26409C14.6306 2.60942 13.4098 3.06952 12.2486 3.6444ZM21.5043 40V38.3376C22.797 38.2818 24.0836 38.0813 25.3642 37.7359C26.6448 37.3906 27.8821 36.9162 29.0761 36.3127L29.9213 37.7434C28.5999 38.4384 27.2296 38.9746 25.8104 39.3522C24.3911 39.7297 22.9557 39.9456 21.5043 40ZM29.0761 3.6444C27.8821 3.06952 26.6448 2.60942 25.3642 2.26409C24.0836 1.91873 22.797 1.70173 21.5043 1.61309V0C22.9557 0.0543571 24.3911 0.268142 25.8104 0.641355C27.2296 1.0146 28.5999 1.53656 29.9213 2.20721L29.0761 3.6444ZM31.352 36.9391L30.5347 35.4462C31.6358 34.7569 32.6636 33.935 33.6181 32.9805C34.5727 32.0259 35.4253 30.9817 36.176 29.8477L37.5768 30.7143C36.7817 31.9612 35.8572 33.1081 34.8033 34.1549C33.7494 35.2016 32.5989 36.1297 31.352 36.9391ZM36.1482 10.0815C35.4303 8.94755 34.5906 7.91151 33.6289 6.97342C32.6672 6.03533 31.6358 5.19808 30.5347 4.46165L31.352 3.06093C32.5989 3.87031 33.7437 4.79123 34.7861 5.82372C35.8286 6.85617 36.7545 7.99587 37.5639 9.24281L36.1482 10.0815ZM39.0246 19.1334C38.936 17.7892 38.7097 16.4897 38.3457 15.2349C37.9818 13.9801 37.5053 12.7485 36.9161 11.5401L38.4305 10.6735C39.0869 11.9949 39.6052 13.3652 39.9856 14.7844C40.366 16.2037 40.5833 17.6534 40.6377 19.1334H39.0246ZM38.4305 29.2342L36.9933 28.417C37.5682 27.2372 38.0283 26.0117 38.3736 24.7404C38.719 23.4692 38.936 22.1615 39.0246 20.8173H40.6377C40.5833 22.3016 40.3674 23.7534 39.9899 25.1727C39.6123 26.5919 39.0926 27.9458 38.4305 29.2342Z" fill="#00ADEE"/>
									</svg>									
								</i>
								<span>
									{projectDetailTimeframe ? projectDetailTimeframe : ''}
								</span>
							</div>
						</div>
						<div class="about-property__content__paragraph">
							{@html data.portfolio.data[0].attributes.projectDetails ? data.portfolio.data[0].attributes.projectDetails : ''}
						</div>
					</div>
				</Col>
			</Row>
		</Container>
	<!-- </Animate> -->
</section>

{#if isFeatured && projectHeading}

<section class="banners">
	<!-- <Animate> -->
		{#each bannerQuotes as bannerQuote, index}
				{#if bannerQuote.banner.data}
				<section in:scaleUp id="single-portfolio-bannerOnly{index}" gsap-start="top center" gsap-duration="2" class="fireplace section--bannerOnly image-scale-up" style="--lrbg: url({domain}{bannerQuote.banner.data.attributes.formats.large.url ? bannerQuote.banner.data.attributes.formats.large.url : bannerQuote.banner.data.attributes.url})"></section>
				<!-- <div class="parallax-wrapper">
					<ParallaxImage imageHeight="100" imageUrl="{domain}{bannerQuote.banner.data.attributes.formats.large.url ? bannerQuote.banner.data.attributes.formats.large.url : bannerQuote.banner.data.attributes.url}">
					</ParallaxImage>
				</div> -->
				{/if}
				<Testimonial testimonial="{bannerQuote.quote}" testimonial_id="testimonial{index}" />
		{/each}
	<!-- </Animate> -->
</section>

<section class="portfolio-cta">
	<!-- <Animate> -->
		<Container>
			<Row>
				<Col class="text-center" md={{ size: 8, offset: 2 }} xs="12">
					<div class="portfolio-cta__content">
						<h2 class="text-animate secondary-font" in:textAnimate gsap-duration="1.5" id="single-portfolio-cta-heading">{ctaHeading ? ctaHeading : "Experience Living your Dreams"}</h2>
						<div in:fly id="single-portfolio-cta-cont" gsap-duration="1.2"  gsap-y="50" >
							{@html data.portfolio.data[0].attributes.content ? data.portfolio.data[0].attributes.content : "<p>This Castle in Colorado exudes grandeur with its rugged, locally sourced stone walls and curved, wood and wrought iron staircases. Its traditional design is further enhanced by a mountain lion sculpture that guards the property.</p>"}         
						</div>
					</div>
					<div class="portfolio-cta__btns" in:fly id="single-portfolio-cta-buttons" gsap-delay="0.5" gsap-duration="1.2"  gsap-y="50">
						<a href="{data.portfolio.ctaLeftBtnUrl ? data.portfolio.ctaLeftBtnUrl : '/contact-us'}" class="btn btn-secondary">{data.portfolio.ctaLeftBtnTitle ? data.portfolio.ctaLeftBtnTitle : 'Talk to Us'}</a>
						<a href="{data.portfolio.ctaRightUrl ? data.portfolio.ctaRightUrl : '/portfolio'}" class="btn btn-inverted">{data.portfolio.ctaRightBtnTitle ? data.portfolio.ctaRightBtnTitle : 'Back to Portfolio'}</a>
					</div>                   
				</Col>
			</Row>
		</Container>
	<!-- </Animate> -->
</section>
{/if}
<section class="related {!projectHeading ? "my-0" : ""}">
	<!-- <Animate> -->
		<Container>
			<Row>
				<Col md="12">
					<h2 class="text-animate secondary-font" in:textAnimate gsap-duration="1.5" id="single-portfolio-related-heading">{relatedPortfolioHeading ? relatedPortfolioHeading : "Explore our Projects..."}</h2>
				</Col>	
				{#each relatedPortfolios as rPortfolio, index}
					<Col md="6">
						<div class="related__article"  in:fly id="related-items{index}" gsap-duration="1" gsap-delay={index/2} gsap-y="30" gsap-start="top center">
							<a href="{rPortfolio.attributes.slug}" data-sveltekit-reload class="zoomImg">
								{#if rPortfolio.attributes.featuredImage.data != null}
								<img src="{domain}{rPortfolio.attributes.featuredImage.data.attributes.formats.large.url ? rPortfolio.attributes.featuredImage.data.attributes.formats.large.url : rPortfolio.attributes.featuredImage.data.attributes.url}" alt="{rPortfolio.attributes.featuredImage.data.attributes.alternativeText}" />
								{:else}
								<img src="{fallback ? domain+fallback.attributes.url : noFeatured}" alt="{rPortfolio.attributes.title}" >
								{/if}
								<div class="related__article__text">
									<span>{('0' + (index + 1)).slice(-2)}</span>
									{rPortfolio.attributes.title ? rPortfolio.attributes.title : ''}
									<i><svg width="8" height="14" viewBox="0 0 8 14" fill="none" xmlns="http://www.w3.org/2000/svg">
										<path d="M1.29004 12.3459L6.29004 6.84595L1.29004 1.34595" stroke="#00ADEE" stroke-width="2" stroke-linecap="round"/>
										</svg>
									</i>
								</div>
							</a>
						</div>
					</Col>
				{/each}
				<!-- <Col md="6">
					<div class="related__article">
						<a href="#">
							<img src="{vailWood}" alt="vail">
							<div class="related__article__text">
								<span>02</span>
								Cordillera Sunsets
							</div>
						</a>
					</div>
				</Col>		 -->
			</Row>
		</Container>
	<!-- </Animate> -->
</section>


<!-- <Animate> -->
  <Contactform/>
<!-- </Animate> -->

<style lang="scss">
	:global(.portfolio-page .dropdown.show, .portfolio-page .dropdown-menu) {
		background-color: rgba(242, 237, 237, 0.20) !important;
	}
section{
	min-height: 50vh;
}
.portfolio-gallery{
    padding: 8vw 0 10vw;
    margin-top: 0;
	background-color: #EFEFF0;
	margin-bottom: 0;
	overflow-x: hidden;
	&:before {
		content: '';
		display: block;
		background: #1E2D39;
		width: 100%;
		height: 60rem;
		position: absolute;
		top: 0;
		z-index: 0;
	}
	@include media-max(sm){
		padding: 10vh 0 0;
	}
  &__content{
	padding-top: 4vw;
	// border-top: 1px solid #ACA7A7;
	border-top: 1px solid #4e4e4e;
	
	z-index: 1;
	position: relative;
	@include media-max(laptopS){
		margin-top: 5vw;
	}
	@include media-max(ipadmini){
		margin-top: 10vw;
	}
	@include media-max(sm){
		margin-top: 0;
	}
    .pre-head{
      color: $primary-color;
	  font-weight: 500;
    }
    h1{
	  margin: 1rem 0;
	  font-size: 4rem;
	//   color: $secondary-color;
	  color: $white-color;
	  justify-content: center;
    }
	:global(p){
		line-height: 2;
		max-width: 800px;
    	margin: 0 auto;	
		color: $white-color;	
		margin-bottom: 1.5rem;
	}
  }
}

:global(.portfolio-gallery__slider) {
	@include media-max(ipadmini){
		min-height: 500vh;
	}
}

.banners {
	@include media-max(ipadmini){
		padding-right: 0;
		padding-left: 0;
	}
}

.about-property{
	background-color: #fff;
	// margin-top: -4rem;
	margin: 0;
	padding: 4rem 0;
	min-height: unset;
	h2{
		margin-bottom: 2rem;
		color: $secondary-color;
		font-size: 2.25rem;
		font-weight: 400;
	}
	&__content{
		background-color: #E5EEF2;
		padding: 2rem;
		@include media-max(sm){
			padding: 2rem 0.5rem;
		}		
		&__heading{
			margin-bottom:3rem;
			@include media-max(sm){
				margin-bottom:1.5rem;
			}				
			div{
				display: inline-block;
				&:first-child{
					margin-right: 3rem;
					@include media-max(sm){
						margin-right: 0.5rem;
					}						
				}
				i{
					margin-right: 1rem;
					@include media-max(sm){
						margin-right: 0rem;
					}						
					svg{
						height: 2rem;
						@include media-max(sm){
							height: 1.5rem;
						}							
					}
				}
				span {
					font-size: 1.438rem;
					font-weight: 500;
					letter-spacing: 0.029rem;
					font-feature-settings: 'pnum' on, 'lnum' on;
				}
			}
		}
		&__paragraph{
			column-count: 2;
			@include media-max(sm){
				column-count: 1;
			}
			p {
				font-family: 1.25rem;
				line-height: 2.125rem;
				font-weight: 400;
			}
		}
	}
}

.fireplace{
	height: 45vw;
}

.living-room{
	height: 45vw;		
}
	
.section--bannerOnly{
	background-image: var(--lrbg);
	background-size: cover;
	background-position: center;
}
.lv-thropy{
	height: 45vw;
}

.portfolio-cta{
	// min-height: 40vw;
	// min-width: 40vw;        
	// display: flex;
	// align-items: center;
	// justify-content: center;
	min-height: unset;
	position: relative;   
	padding: 3rem 0;   
	&__content{
		h2{
			margin-bottom: 2rem;
			justify-content: center;
		}
		p{
			max-width: 45rem;
			margin: 0 auto;
			line-height: 2;
		}  			
	}
	&__btns{
		margin: 2rem 0;
		display: flex;
		justify-content: center;
		.btn-secondary{
			margin-right: 1.5rem;
			@include media-max(sm){
				margin-right: 0.5rem;
			}			
		}
		.btn-inverted{
			border-color: $secondary-color;
			color: $secondary-color;
			&:hover {
				color: $white-color;
			}
		}
	}
}

.related{
	background-color: #E5EEF2;
	padding: 5rem 0;
	margin-bottom: 0;
	@include media-max(xs){
		padding: 5rem 1rem;
	}		
	h2{
		text-align: center;
		margin-bottom: 2rem;
		justify-content: center;
	}
	&__article{
		overflow: hidden;
		position: relative;
		height: 30rem;
		@include media-max(ipadmini){
			height: 20rem;
		}
		@include media-max(sm){
			height: auto;
		}
		img{
			object-fit: cover;
			object-position: center;
			height: 100%;
		}
		@include media-max(sm){
			margin-bottom: 1rem;
		}	  
		img {
			object-fit: cover;
			object-position: center;
			height: 100%;
		}   
        &:hover{
			.related__article__text {
				background: $primary-color;
				transition: 1.5s;
				span {
					color: $white-color;
				}
				path {
					stroke: $white-color;
				}  
			}  
        }
        &__text{
            background-color: $secondary-color;
			color: #fff;
			padding: 0.5rem 3rem 0.5rem 0.5rem;
			position: absolute;
			z-index: 2;
			bottom: 1rem;
			left: 0;
			max-width: 90%;
			text-align: left;
			transition: 1.5s;
            @include media-max(ipadmini){
                margin: 0;
                font-size: 1rem;
                width: 90%;
                bottom: 0.5rem
            } 
			&:hover {
              background: $primary-color;
              span {
                color: $white-color;
              }
              path {
                stroke: $white-color;
              }
            }			
            span{
                color: $primary-color;
                font-size: 1.2rem;
                margin: 0 0.8rem 0;
                @include media-max(sm){
                    margin: 0;
                    font-size: 1rem;
                }                
            }
			i{
              position: absolute;
              top: 20%;
              right: 1rem;
            }
        }	
	}
}

// .parallax-wrapper {
// 	position: relative;
// 	overflow: hidden;
// }

// .contact{
// 	padding: 10rem 0;
// 	background-image: var(--contactBG);
// 	background-size: cover;
// 	margin: 0;
// 	&__content{
// 		display: flex;
// 		height: 100%;
// 		align-items: end;		
// 		&__wrapper{
// 			h2{
// 				margin-bottom: 2rem;
// 			}	
// 		}
// 	}
// 	&__form{
// 		:global(#yourMessage){
// 			height: 15rem;
// 		}
// 	}
// }


</style>