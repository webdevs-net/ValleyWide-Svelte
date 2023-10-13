<script lang="ts">
	export let data;
	import { Col, Container, Row,  Accordion, AccordionItem } from "sveltestrap";
	import Carousel3 from "$lib/components/layout/Carousel3.svelte";
	import ParallaxImage from "$lib/components/parallaxImage.svelte";
	import Cta from "$lib/components/layout/Cta.svelte";
	import PageBanner from "$lib/components/layout/PageBanner.svelte";
	import axios from "axios";
	import { PUBLIC_STRAPI_API } from '$env/static/public';
	import noFeatured from "$lib/img/blog-empty.svg"
	import { textAnimate, fly, fadeIn, slide, fly2, slowDownSection, stopSection } from '$lib/GsapAnimation.js';

	let y=0;
	const domain = "https://api.ulfbuilt.com";
	const home = data.home.data.attributes;
	let fallback = data.fallback.data.attributes.fallbackImage.data;
	let propCount = 3;
	//let listener = {};

	// Function for portfolio masonry
	let portfolioList = [];
	let loading;

	let activeTab = home.categories.data[0].id;
	function handleTabClick(category) {
		activeTab = category;
	}

	$: if (activeTab) { // Check if has new variable data
		loading = true;
        (async () => {
            const url = "https://api.ulfbuilt.com/api/portfolios?filters[categories][id][$eq]="+activeTab+"&populate=deep,2";
            const headers = {
                Authorization: 'Bearer ' + PUBLIC_STRAPI_API
            }
            try {
                const response = await axios.get(url, { headers });
				portfolioList = response.data.data;
				loading = false;
                // new Promise((resolve) => {
                //     setTimeout(() => resolve(portfolioList = response.data.data), 500)
                // })
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        })();
    }
	
	import { onMount } from "svelte";
	import { loadingCursor } from '$lib/cursorChange.js';
	onMount(() => {
		loadingCursor();
		stopSection();
	});


//new slideup and down
import arrowtop from '$lib/img/arrow-top.svg';
let selectedIndex = 1;
const updateSelectedOption = () => {
  const options = document.querySelectorAll('.option');
  options.forEach((option, index) => {
    if (index === selectedIndex) {
        option.classList.add('op-selected');

      if(index === 0){
        const container = document.querySelector('.options');
        container.style.transform = 'translateY(25px)';
		option.click();
      }
      if(index === 1){
        const container = document.querySelector('.options');
        container.style.transform = 'translateY(-25px)';
		option.click();
      }
      if(index === 2){
        const container = document.querySelector('.options');
        container.style.transform = 'translateY(-75px)';
		option.click();
      }
    } else {
      option.classList.remove('op-selected');
    }
  });
};
const handleTopArrowClick = () => {
  if (selectedIndex > 0) {
    selectedIndex -= 1;
    updateSelectedOption();
  }
};
const handleBottomArrowClick = () => {
  const options = document.querySelectorAll('.option');
  if (selectedIndex < options.length - 1) {
    selectedIndex += 1;
    updateSelectedOption();
  }
};


</script>
<svelte:window bind:scrollY={y} />
<svelte:head>
	<title>{home.title ? home.title : 'Home'}</title>
	<meta name="description" content="ULF BUILT" />
</svelte:head>

<PageBanner title="{home.topBanner.heading ? home.topBanner.heading : 'Building Excellence'}" subTitle="{home.topBanner.paragraph ? home.topBanner.paragraph : ''}" banner="{domain}{home.topBanner.background.data.attributes.formats.large_x2.url ? home.topBanner.background.data.attributes.formats.large_x2.url : home.topBanner.background.data.attributes.url}" bannerMobile="{domain}{home.topBanner.background.data.attributes.formats.medium.url}" extraClass="homebanner" bannerheight="100" customtop="custom-top" transparent="1" />

<section class="loc-gallery mvw-10" in:slowDownSection id="loc-gallery">
	<Container>
		<Row>
			<Col xs="12" class="pb-4">
				<div class="loc-gallery__cwrapper" id="build-trust">
					<h2>
						{home.homeBuilderHeading ? home.homeBuilderHeading : ''}
					</h2>
						<div class="h3">
							{@html home.homeBuilderSubHeading ? home.homeBuilderSubHeading : ''}
						</div>
					<div>
						{@html home.homeBuilderParagraph ? home.homeBuilderParagraph : ''}
					</div>
				</div>
			</Col>
		</Row>
	</Container>
</section>

<section class="featured-projects mvw-10" in:slowDownSection id="featured-section">	
	<Container class="featured-container">
		<Carousel3 preHeading={home.featuredProjectsPreHeading ? home.featuredProjectsPreHeading : ''} 
		heading={home.featuredProjectsHeading ? home.featuredProjectsHeading : ''} 
		btnTitle={home.featurePropertyBtnTitle ? home.featurePropertyBtnTitle : 'Button'}
		btnUrl={home.featuredPropertyBtnUrl ? home.featuredPropertyBtnUrl : '#'}
		featuredProjects={home.featuredProjects}>
		</Carousel3>
	</Container>
</section>


<!-- {#if home.homeBuilderBanner.data}
<section class="bannerOnly flex-column-center" id="bannerOnly">
	<div class="bannerOnly--Container">
		<div in:fadeIn id="bannerOnlyImg" gsap-duration="2" class="section--bannerOnly">
		<ParallaxImage imageHeight="80" imageUrl="{domain}{home.homeBuilderBanner.data.attributes.formats.large_x2.url ? home.homeBuilderBanner.data.attributes.formats.large_x2.url : home.homeBuilderBanner.data.attributes.url}"></ParallaxImage>
		</div>
	</div>
</section>
{/if} -->

<!-- <section class="categories mvw-10" in:slowDownSection id="categories-section">
	<Container class="categories_wrapper">
		<Row>
			<Col class="text-center">
				<h2 class="text-animate secondary-font" in:textAnimate id="category_title" gsap-duration="1" >
					{@html home.categoryGalleryTabHeading ? home.categoryGalleryTabHeading : ''}
				</h2>
				<div class="categories__tabs">
					<div class="categories__tabs__heading">
						{#if innerWidth > 767}
						<ul in:fly id="categories" gsap-duration="1">
							{#each home.categories.data as heading}
								<li>
									<span
									data-category="{heading.id}"
									class:active="{activeTab === heading.id}"
									on:click="{() => handleTabClick(heading.id)}">
									{heading.attributes.Title ? heading.attributes.Title : ''}
									</span>
								</li>
							{/each}
						</ul>
						{/if}
						{#if innerWidth <= 767}

						<div class="options-container">
							<div class="options">
								{#each home.categories.data as heading}
								<div class="option" 
									data-category="{heading.id}"
									class:active="{activeTab === heading.id}"
									on:click="{() => handleTabClick(heading.id)}">
									{heading.attributes.Title ? heading.attributes.Title : ''}
								</div>
							{/each}
							</div>
							<div class="arrow-top" on:click={handleTopArrowClick}>
							  <img src="{arrowtop}" alt="arrowtop" />
							</div>
							<div class="arrow-bottom" on:click={handleBottomArrowClick}>
							  <img src="{arrowtop}" alt="arrowbottom" />
							</div>
						  </div>
						{/if}
					</div>
					
					<div class="categories__tabs__gallery" >
						{#key activeTab}
							{#if loading}
								<div class="col text-center list-text-details">Loading...</div>
							{:else}
								{#if portfolioList.length == 0} 
									<div class="col text-center list-text-details">No Project Found...</div>
								{:else}
									<div class="container masonry_container">       
										{#each portfolioList as project, index}				
											{#if index < propCount}
											<div class="masonry-items" in:fly id="masonry-items{index}" gsap-duration="1" gsap-delay={index/2} gsap-y="30" gsap-start="top center"> 
												<a data-sveltekit-reload href="/portfolio/{project.attributes.slug}" class="zoomImg">      
													{#if project.attributes.featuredImage.data != null}
													<img src="https://api.ulfbuilt.com/{project.attributes.featuredImage.data.attributes.formats.large.url ? project.attributes.featuredImage.data.attributes.formats.large.url : project.attributes.featuredImage.data.attributes.url}" alt="{project.attributes.title}" >   
													{:else}
													<img src="{fallback ? domain+fallback.attributes.url : noFeatured}" alt="{project.attributes.title}" >
													{/if}
												</a>
											</div>	                    
											{/if}				
										{/each}
									</div>
								{/if}
							{/if}
						{/key}
					</div>					
				</div>	
			</Col>
		</Row>
	</Container>
</section> -->


<section class="flex-column-center" id="tnr">
	<div class="tnr">
		<ParallaxImage imageHeight="80" imageUrl="{domain}{home.midBanner.background.data.attributes.formats.large_x2.url ? home.midBanner.background.data.attributes.formats.large_x2.url : home.midBanner.background.data.attributes.url}" overlay="1">
		</ParallaxImage>
		<div class="tnr__wrapper">
			<Container>
				<div class="tnr__wrapper__captions">
					<h2 class="text-animate" in:textAnimate id="tnr-heading" gsap-duration="1.5">{home.midBanner.heading ? home.midBanner.heading : ''}</h2>
					<p in:slide id="tnr-preheading" gsap-duration="1">{home.midBanner.paragraph ? home.midBanner.paragraph : ''}</p>
					<div in:fly id="tnr-button" gsap-delay="0.5" gsap-duration="1.2"  gsap-y="50">
						<a href="{home.midBanner.btnUrl ? home.midBanner.btnUrl : '#'}" class="btn btn-secondary">
							{home.midBanner.btnTitle ? home.midBanner.btnTitle : 'Button'}
						</a>
					</div>
				</div>
			</Container> 
		</div>
	</div>
</section>


<section class="reputation mvw-10" in:slowDownSection id="reputation-section" gsap-start="top">
		<Container class="reputation_child">
			<Row>
				<Col md="7" class="">
						<div class="reputation__content">
							<div class="reputation__content__wrapper">
								<p class="pre-head" in:slide id="reputation-preheading" gsap-duration="1.5">{home.reputation.preHeading ? home.reputation.preHeading : ''}</p>
								<h2 class="text-animate secondary-font" gsap-duration="1" in:textAnimate id="reputation-heading">{home.reputation.heading ? home.reputation.heading : ''}</h2>
								<div in:fly id="reputation-cont" gsap-delay="1" gsap-duration="1.2"  gsap-y="30">
									<p>{@html home.reputation.content ? home.reputation.content : ''}</p>
									<a href="{home.reputation.btnUrl ? home.reputation.btnUrl : '#'}" class="btn btn-secondary">{home.reputation.btnTitle ? home.reputation.btnTitle : 'Button'}</a>
								</div>
							</div>
						</div>
				</Col>
				<Col md="5" class="my-auto containerimg" >
					<div class="childimg">
						{#if home.reputation.image.data}
							<img in:fly2 id="reputation-img" src="{domain}{home.reputation.image.data.attributes.formats.large.url ? home.reputation.image.data.attributes.formats.large.url : home.reputation.image.data.attributes.url}" alt="{home.reputation.image.data.attributes.alternativeText}" >
						{/if}
					</div>
				</Col>
			</Row>
		</Container>
</section>

<section class="process" in:slowDownSection id="process-section" gsap-start="top">
	<Container>
		<Row>
			<Col md="6" class="">
				<div class="process__top-image childimg2" >
					{#if home.ourProcessTopImage.data[0]}
						<img in:fly2 id="process-top-img" gsap-y="-60" src="{domain}{home.ourProcessTopImage.data[0].attributes.formats.large.url ? home.ourProcessTopImage.data[0].attributes.formats.large.url : home.ourProcessTopImage.data[0].attributes.url}" alt="{home.ourProcessTopImage.data[0].attributes.alternativeText}"/>
					{/if}
				</div>
			</Col>
		</Row>
		<Row>
			<Col md="7" class="">
					<div class="process__content containerimg2">
						<div class="process__content__wrapper">
							<p class="pre-head" in:slide id="process-preheading" gsap-duration="1.5">{home.ourProcessPreHeading ? home.ourProcessPreHeading : ''}</p>
							<h2 class="text-animate secondary-font" in:textAnimate gsap-duration="1" id="process-heading">{home.ourProcessHeading ? home.ourProcessHeading : ''}</h2>
							<div in:fly id="process-cont" gsap-duration="1.2"  gsap-delay="1" gsap-y="30">
								{@html home.ourProcessParagraph ? home.ourProcessParagraph : ''}
								<a href="{home.ourProcessButtonUrl ? home.ourProcessButtonUrl : '#'}" class="btn btn-secondary">{ home.ourProcessButtonTitle ? home.ourProcessButtonTitle : 'Button' }</a>
							</div>
						</div>
					</div>
			</Col>
			<Col md="5" class="my-auto containerimg3">
				<div class="process__bottom childimg3">
					{#if home.ourProcessRightImage.data}
						<img in:fly2 id="process-bottom-img" gsap-y="-150" src="{domain}{home.ourProcessRightImage.data.attributes.formats.large.url ? home.ourProcessRightImage.data.attributes.formats.large.url : home.ourProcessRightImage.data.attributes.url}" alt="{home.ourProcessRightImage.data.attributes.alternativeText}">
					{/if}
				</div>
			</Col>
		</Row>
	</Container>
</section>


<section class="story" in:slowDownSection id="story-section" gsap-start="top">
		<Container>
			<Row>
				<Col md="7" class="">
					<div class="story__content">
						<div class="story__content__wrapper">
							<p class="pre-head" in:slide id="story-preheading" gsap-duration="1.5">{home.ourStoryPreHeading ? home.ourStoryPreHeading : ''}</p>
							<h2 class="text-animate secondary-font" in:textAnimate id="story-heading" gsap-duration="1">{home.ourStoryHeading ? home.ourStoryHeading : ''}</h2>
							<div in:fly id="story-cont" gsap-delay="1" gsap-duration="1.2"  gsap-y="30">
								{@html home.ourStoryParagraph ? home.ourStoryParagraph : ''}
							</div>

						</div>
					</div>
				</Col>
				<Col md="5" class="my-auto containerimg4">
					<div class="childimg4">
						{#if home.ourStoryRightImage.data}
							<img in:fly2 id="story-img"  src="{domain}{home.ourStoryRightImage.data.attributes.formats.large.url ? home.ourStoryRightImage.data.attributes.formats.large.url : home.ourStoryRightImage.data.attributes.url}" alt="{home.ourStoryRightImage.data.attributes.alternativeText}">
						{/if}
					</div>	
				</Col>
			</Row>
		</Container>
</section>

<!-- <section class="m-0 article-wrapper" id="article-wrapper">
	<ArticleSection />
</section> -->

<section class="m-0 cta-wrapper" id="cta-wrapper">
	<Cta />
</section>

<style lang="scss">
	//new slide up down
.options-container{
  height: 100px;
  overflow: hidden;
  position: relative;
  margin: 2rem 0;
  font-family: $secondary-font;
}
.options{
  transform: translateY(-25px);
  font-size: 1.75rem;
  transition: all 0.5s ease-in-out, font-size 0.5s ease-in-out;
}
.option{
  height: 50px;
  /* background-color: red; */
  display: flex;
  justify-content: center;
  align-items: center;
}
.options .op-selected{
  font-size: 2.35rem;
  transition: font-size 0.5s ease-in-out;
}
.arrow-top, .arrow-bottom{
  position: absolute;
  height: 25px;
  width: 100%;
  text-align: center;
}
.arrow-top{
  top: 0;
  background: -moz-linear-gradient(top, rgba(255,255,255,1) 0%, rgba(255,255,255,0) 100%);
  background: -webkit-linear-gradient(top, rgba(255,255,255,1) 0%,rgba(255,255,255,0) 100%);
  background: linear-gradient(to bottom, rgba(255,255,255,1) 0%,rgba(255,255,255,0) 100%);
  display: flex;
align-items: end;
}
.arrow-top img{
  height: 14px;
}
.arrow-bottom{
  bottom: 0;
  background: -moz-linear-gradient(bottom, rgba(255,255,255,1) 0%, rgba(255,255,255,0) 100%);
  background: -webkit-linear-gradient(bottom, rgba(255,255,255,1) 0%,rgba(255,255,255,0) 100%);
  background: linear-gradient(to top, rgba(255,255,255,1) 0%,rgba(255,255,255,0) 100%);
  display: flex;
}
.arrow-bottom img{
  height: 14px;
  -webkit-transform: rotateX(180deg);
          transform: rotateX(180deg);
}
	//new slide up down

	.homebanner{
		background-image: var(--banner);
		background-size: cover;
		min-height: 100vh;
		background-position: bottom;
		background-size: cover;
		padding-top: 9rem;		
		margin: 0;
		text-align: center;
		display: flex;
		justify-content: center;
		align-items: center;
		&__content{
			&__text{
				h1{
					color:#fff;
					font-weight: 400;
					font-size: 4rem;		
					margin-bottom: 2rem;	
					span{
						font-family: $primary-font;
					}		
				}
			}
			&__paragraph{
				color: #fff;
				font-size: 1.5rem;				
			}
			&__btn{
					border: 1px solid #fff;
					padding: 1.5rem 4rem;					
					text-decoration: none;
					color: #fff;
					font-family: $secondary-font;
					text-transform:lowercase;
					display: inline-block;
			}			
		}
	}
	:global(.loc-gallery p){
		@include media-max(sm){
			text-align: left;
			
		}	
	}
	:global(.loc-gallery .h3 span){
		color: $primary-color;
	}	
	.loc-gallery{
		h2{
			font-family: $secondary-font;
			margin-bottom: 1rem;
			color: $secondary-color;
			margin-bottom: 3rem;
			font-size: 3rem;
			justify-content: center;
			@include media-max(sm){
				text-align: center;
				font-size: 2.813rem;
			}
		}		
		&__cwrapper{
			max-width: 42rem;
			margin: auto;
			.h3{
				text-transform: uppercase;
				font-size: 2.5rem;
				font-weight: 600;
				@include media-max(sm){
					font-size: 2rem;
				}
				span{
					color: $primary-color;
				}
			}
			p{
				max-width: 36rem;
				margin: 0 auto;
				text-align: left;						
			}
			:global(a) {
				color: $primary-color;
				text-decoration: none;
			}
		}
	}

	.categories{
			.row{
				.col{
					@include media-max(sm){
						padding-left: 0px !important;
						padding-right: 0px !important;
					}
				}
			}
		margin-top: 15vw;
		@include media-max(ipadmini){
			padding-right: 0;
			padding-left: 0;
			margin: 20vw 0;
			padding-top: 10vw;
		}
		h2{
			margin-bottom: 1rem;
			justify-content: center;
		}
		.view-all{
			margin-bottom: 2rem;
			span{
				color: $secondary-color;
				&:hover{
					cursor: pointer;
				}
			}
		}
		&__tabs{
			&__heading{
				ul{
					display: flex;
					width: 90%;
					margin: 1rem auto;
					padding-left: 0;	
					justify-content: center;
					
					@include media-max(lg){
						flex-wrap: nowrap;
						padding: 1rem 0;
						overflow-x: scroll;
						width: 100%;
					}		
								
					@include media-max(xs){
						flex-wrap: nowrap;
						padding: 1rem 0;
						justify-content: left;
					}						
					@include media-max(sm){
						overflow-x: scroll;
						justify-content: left;
					}					
					li{
						list-style: none;
						width: 25%;
						border-right: 1px solid $gray;	
						transition: 0.3s all;						
						@include media-max(sm){
							width: 15rem;
							padding: 0 1rem;
						}
						&:last-child {
							border: none;
						}
						&:hover{
							background-color: rgba(32, 36, 41, 0.561);	
							transition: 0.3s all;
							span{
								color: #fff;
								&.active{
									color: #fff;
								}
							}
						}						
						span{				
							font-family: $secondary-font;
							font-size: 1.75rem;
							color: #D8D7D7;
							text-transform: uppercase;
							margin-bottom: 2em;
							font-weight: 500;
							cursor: pointer;
							@include media-max(lg){
								font-size: 1.2rem;
							}
							&.active{
								color: $secondary-color;
								border-bottom-color: $secondary-color;
							}
						}
					}
				}
			}
			&__gallery{
				// min-height: 65vh; //for overflow scroll
				// @include media-max(default){
				// 	min-height: 50vh
				// }
				// @include media-max(sm){
				// 	min-height: 150vh
				// }
				position: relative;
				.list-text-details {
					position: absolute;
					top: 0;
					left:50%;
					-webkit-transform: translateX(-50%);
					transform: translateX(-50%)
				}
			}
		}
		.masonry_container {
			display: grid;
			grid-template-columns: repeat(3, 1fr);
			gap: 1rem;
			@include media-max(sm){
				gap: 1rem;
				overflow-y: hidden;
				overflow-x: auto;
      			white-space: nowrap;
				-webkit-overflow-scrolling: touch;
				scrolling: touch;
				padding-bottom: 10px;
				// &::-webkit-scrollbar {
				// 	width: 10px;
				// }
				// &::-webkit-scrollbar:horizontal {
				// 	height: 10px;
				// }
				// &::-webkit-scrollbar-track {
				// 	background-color: #ccc;
				// }
				// &::-webkit-scrollbar-thumb {
				// 	background: #263a63;
				// }
				// grid-template-columns: repeat(1, 1fr); //for-horizontal scroll
			}
            .masonry-items{
                color: white;
                text-align: center;  
                height: 65vh;
				@include media-max(sm){
					min-width: 300px; //for-horizontal scroll
				}
                @include media-max(default){
					height: 50vh;
                }
                a{
                    display: block;
                    height: 100%;
                    width: 100%;
                    overflow: hidden;
                    img{
                        height: 100%;
                        object-fit: cover;
                    }   
                }      
                &__text{
                    background-color: $secondary-color;
                    color: #fff;
                    padding: 0.5rem;
                    position: absolute;
                    z-index: 2;
                    bottom: 1rem;
                    left: 0;
                    width: 75%;
                    text-align: left;
                
                    span{
                        color: $primary-color;
                        font-size: 1.2rem;
                        margin: 0 0.8rem 0;
                        @include media-max(sm){
                            font-size: 0.8rem;
                        }                       
                    }
                }
            }
        }
	}

	#tnr {
		// display: grid;
		// align-items: center;

		// @include media-max(xl){
		// 	align-items: end;
		// }   

		@include media-max(laptopS){
			padding-left: unset;
			padding-right: unset;
		}

		
		@include media-max(ipadmini){
			min-height: auto;
		}   

		.tnr{
			position: relative;
			overflow: hidden;
			:global(.container){
				position: relative;
				display: flex;
				align-items: center;
				justify-content: end;
    			text-align: right;
			}
			@include media-max(sm){
				// height: 80vh;
				margin-bottom: 0;
			}
			// &::before{
			// 	content: "";
			// 	position: absolute;
			// 	top: 0;
			// 	left: 0;
			// 	right: 0;
			// 	bottom: 0;
			// 	background-color: rgba(0, 0, 0, 0.5);			
			// 	z-index: 1;
			// }
			.tnr__wrapper{
				z-index: 2;
				position: absolute;
				color: #fff;
				top: 0;
				left: 0;
				width: 100%;
				height: 100%;
				display: flex;
				justify-content: center;
				&__captions {
					display: flex;
					flex-direction: column;
					@include media-max(ipadmini){
						padding: 3rem;
					}
					@include media-max(sm){
						padding: 1rem;
					}
					#tnr-preheading{
						max-width: 42rem;
						margin-bottom: 2rem;
						line-height: 1.75;
					}
				}
				p{
					font-size: 1.2rem;
					opacity: 0;
					@include media-max(ipadmini){
						font-size: 1rem;
					}
				}
				h2{
					font-family: $primary-font;
					margin: 1rem 0 2rem;
					text-transform: uppercase;
					font-size: 2.688rem;
					@include media-max(sm){
						font-size: 2rem;
					}
					opacity: 0;
				}
			}
		}
	}


.featured-projects{
	position: relative;
	@include media-max(ipadmini){
		padding-top: 10vw;
	}

	@include media-max(sm){
		padding: 0rem;
	}
}

:global(.featured-container){
		@include media-max(sm){
			padding: 0rem;
		}
		.row{
			@include media-max(sm){
				padding: 0rem;
			}
		}
	}
	// 	// @include media-max(ipadmini){
	// 	// 	min-height: unset;
	// 	// }	
	// 	// @include media-max(sm){
	// 	// 	margin-top: 10vw;
	// 	// }
	.reputation{
		margin-top: 15vw;	
		@include media-max(ipadmini){
			margin: 35vw 0;
			padding-top: 20vw;
		}
		@include media-max(sm){
			min-height: 50rem;
			padding-top: unset;
		}	
		&__content{
			height: 41.875rem;
			@include media-max(lg){
				height: 30rem;
			}	
			@include media-max(ipadmini){
				height: 20rem;
			}
			@include media-max(sm){
				height: auto;
			}	
			display: flex;
			align-items: center;
			position: relative;		
			&:after{
				position: absolute;
				background: #E5EEF2;
				width: 135%;
				top: 5%;
				content: "";
				height: 90%;
				@include media-max(xl){	
					top: 0;
					height: 100%;
				}
				@include media-max(ipadmini){	
					top: unset;
					height: 175%;
				}
				@include media-max(sm){
					width: 100vw;
					top: -5rem;
					margin-left: calc(50% - 50vw);
					height: 160%;		
				}		
			}
			&__wrapper{
				max-width: 38rem;
				z-index: 2;
				padding-left: 10rem;
				@include media-max(lg){
					padding-left: 5rem;
				}	
				@include media-max(md){
					padding-left: 3rem;
				}	
				@include media-max(sm){
					padding-left: 0;
					margin-bottom: 2rem;
				}
				.pre-head {
					color: $primary-color;
					margin-bottom: 1rem;
					font-weight: 500;
				}
				h2{
					margin: 1rem 0 2rem;
					line-height: 4.5rem;
					opacity: 0;
					@include media-max(lg){
						line-height: 3rem;
						margin: 1rem 0;
					}	
				}
				:global(p){
					line-height: 2rem;
					margin-bottom: 2rem;
				}
				.btn{
					@include media-max(sm){
						margin: 0 auto;
						display: inherit;
					}
				}
			}		
		}
		.childimg {
			padding-top: 15rem;
			@include media-max(ipadmini){
				padding-top: 7rem;
			}
			@include media-max(sm){
				padding-top: unset;
				// padding-bottom: 15rem;
			}
		}
		
		img{
			position: relative;
			z-index: 5;
			height: 31.25rem;
			width: 100%;
			object-fit: cover;
			@include media-max(lg){
				height: 25rem;
			}
			@include media-max(ipadmini){
				height: 15rem;
			}	
			@include media-max(sm){
				height: auto;
			}	
		}		
	}	

	.process{	
		// @include media-max(ipadmini){
		// 	margin: 20vw 0 15vw;
		// }
		@include media-max(ipadmini){
			margin: 35vw 0;
		}
		@include media-max(sm){
			min-height: 75rem;
		}
		&__top-image{
			text-align: right;
    		margin-bottom: -9rem;
			z-index: 5;
			position: relative;
			@include media-max(default){
				text-align: center;
			}	
			@include media-max(lg){
				margin-left: 1.5rem;
			}	
			@include media-max(ipadmini){
				margin-bottom: -3rem;
			}	
			@include media-max(sm){
				text-align: left;
				margin-bottom: 0;	
				margin-left: 0;
			}				
			img{
				object-fit: cover;
				height: 27.5rem;
				width: 80%;
				@include media-max(lg){
					height: 25rem;
					width: 100%;
				}	
				@include media-max(ipadmini){
					height: 15rem;
				}	
				@include media-max(sm){
					height: auto;
				}	
			}
		}
		&__content{
			height: 35rem;
			@include media-max(ipadmini){
				height: 30rem;
			}	
			@include media-max(sm){
				height: auto;
				margin-top: 3rem;
			}	
			display: flex;
			align-items: center;
			position: relative;		
			&:after{
				position: absolute;
				background: #F2F2F2;
				width: 135%;
				content: "";
				height: 100%;
				@include media-max(xl){	
					height: 120%;
				}			
				@include media-max(sm){
					width: 100vw;
					margin-left: calc(50% - 50vw);
					height: 150%;	
				}
			}
			&__wrapper{
				max-width: 40rem;
				z-index: 2;
				padding-left: 4rem;
				@include media-max(md){
					padding-left: 3rem;
				}
				@include media-max(sm){
					padding-left: 0;
				}					
				.pre-head {
					color: $primary-color;
					margin-bottom: 1rem;
					font-weight: 500;
				}
				h2{
					margin: 1rem 0 2rem;
					line-height: 4.5rem;
					@include media-max(lg){
						line-height: 3rem;
						margin: 1rem 0;
					}	
				}
				:global(p){
					line-height: 2rem;
					margin-bottom: 2rem;
				}
				.btn{
					@include media-max(sm){
						display: inherit;
						margin: 3rem auto;
					}							
				}
			}		
		}
		&__bottom{	
			@include media-max(sm){
				text-align: right;
			}							
			img{
				height: 31.25rem;
				width: 100%;
				object-fit: cover;
				@include media-max(lg){
					height: 25rem;
				}
				@include media-max(ipadmini){
					height: 15rem;
				}	
				@include media-max(sm){
					height: auto;
				}	
			}			
		}
		.childimg3 {
			padding-top: 15rem;
			@include media-max(ipadmini){
				padding-top: 7rem;
			}
			@include media-max(sm){
				padding-top: unset;
				// padding-bottom: 15rem;
			}
		}
		
		img{
			position: relative;
		}		

	}
	.story{
		// @include media-max(ipadmini){
		// 	margin-top: 15vw;
		// }
		@include media-max(ipadmini){
			padding-top: 25vw;
			margin: 20vw 0;
		}	
		@include media-max(sm){
			min-height: 70vh;
			padding-top: unset;
		}  
		&__content{
			height: 41.875rem;
			@include media-max(lg){
				height: 30rem;
			}
			@include media-max(ipadmini){
				height: 20rem;
			}	
			@include media-max(sm){
				height: auto;
			}	
			display: flex;
			align-items: center;
			position: relative;						
			&:after{
				position: absolute;
				background: #E5EEF2;
				width: 135%;
				content: "";
				height: 90%;	
				@include media-max(xl){	
					top: 0;
					height: 100%;
				}	
				@include media-max(ipadmini){	
					top: unset;
					height: 150%;
				}	
				@include media-max(sm){
					top: -10vw;
					width: 100vw;
					margin-left: calc(50% - 50vw);
					height: 200%;	
				}  						
			}
			&__wrapper{
				max-width: 43rem;
				z-index: 2;
				padding-left: 4rem;
				@include media-max(md){
					padding-left: 3rem;
				}
				@include media-max(sm){
					padding: 0;
				}  				
				.pre-head {
					color: $primary-color;
					margin-bottom: 1rem;
					font-weight: 500;
				}
				h2{
					margin: 1rem 0 2rem;
					@include media-max(lg){
						line-height: 3rem;
					}	
				}
				:global(p){
					line-height: 2rem;
					margin-bottom: 2rem;
					@include media-max(md){
						margin-bottom: 0;
					}
				}
				.accordion{
					.accordion-item{
						background-color: transparent;
					}
					h4{
						color: #000;
					}
					span{
						font-family: 'Raleway';
						font-style: normal;
						font-weight: 600;
						font-size: 2rem;
						color: #ACA7A7;
						margin-right: 1rem;
					}
				}
			}		
		}
		.childimg4 {
			padding-top: 15rem;
			@include media-max(ipadmini){
				padding-top: 7rem;
			}
			@include media-max(sm){
				padding-top: unset;
				// padding-bottom: 15rem;
			}
		}
		
		img{
			position: relative;
			z-index: 5;
			height: 31.25rem;
			width: 100%;
			object-fit: cover;
			@include media-max(lg){
				height: 25rem;
			}
			@include media-max(ipadmini){
				height: 15rem;
			}	
			@include media-max(sm){
				height: auto;
				margin-top: 2rem;
			}
		}		
	}	
	.living-room{
		height: 30vw;		
	}
	.bannerOnly {
		// display: grid;
    	// align-items: center;

		@include media-max(laptopS){
			padding-left: unset;
			padding-right: unset;
		}  

		@include media-max(ipadmini){
			min-height: auto;
		}   

		.bannerOnly--Container {
			overflow: hidden;
			position: relative;
			.section--bannerOnly{
				background-image: var(--lrbg);
				background-size: cover;
				// height: 100vh;
				// height: 40vw;
				width: 100%;
				margin: 0 auto;
				opacity: 1;
				// padding-bottom: 3.75rem;
				// @include media-max(ipadmini){
				// 	height: 60vh;
				// }
			}

		}

	}
	.lv-thropy{
		height: 45vw;
	}
	.contact-form{
		&__form{
		padding: 2rem;
		margin: 0 auto;
		max-width: 500px;
		text-align: center;
			h2{
				font-weight: 300;
				margin-bottom: 2rem;
				text-transform: uppercase;
			}
		}
	}
	.img-section{
		margin: 5rem 0;
	}
	section.m-0{
		@include media-max(sm){
			padding-left: 0;
			padding-right: 0;
		}
	}
	.cta-wrapper, .article-wrapper {
		padding: unset;
		margin: 0;
	}
	.article-wrapper {
		@include media-max(ipadmini){
			min-height: 140vh;
		}
	}
</style>