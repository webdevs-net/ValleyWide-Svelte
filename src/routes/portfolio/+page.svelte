<script lang="ts">
	import { Col, Container, Row } from "sveltestrap";
	export let data;
    // import LazyImage from "$lib/LazyImage.svelte";
    // import Masonry from "$lib/components/Masonry.svelte";
	import ArticleSection from "$lib/components/layout/ArticleSection.svelte";
	import Cta from "$lib/components/layout/Cta.svelte";
	import PageBanner from "$lib/components/layout/PageBanner.svelte";
	import Animate from "$lib/components/Animate.svelte";
    import { PUBLIC_STRAPI_API } from '$env/static/public';
    import axios from "axios";
    // import ImageLoader from '$lib/components/imageLazy/ImageLoader.svelte';
    // import { onMount } from 'svelte';
    import noFeatured from "$lib/img/blog-empty.svg"
    // import { fade } from "svelte/transition";
    import { paginate, LightPaginationNav } from 'svelte-paginate';
    import { textAnimate, fly, fadeIn, slide } from '$lib/GsapAnimation.js';

	let domain = "https://api.ulfbuilt.com";
	let portfolio =  data.portfolio.data.attributes; 
    let fallback = data.fallback.data.attributes.fallbackImage.data;
    // let propCount = 10;
    let portfolioList = [];
    let pageSize = 9;
    let currentPage = 1;
    let loading;
    // let properties = data.properties.data;
    // console.log(portfolio);

    let activeTab = portfolio.masonryGallery.masonryItems.data[0].id;
    function handleTabClick(category) {
		activeTab = category;
	}

    // Determine first even and last odd
    let start;
    let firstEven = null;
    let lastOdd = null;

    function findNumbers(end) {
        start = 1;
        // Find the first even number
        for (let num = start; num <= end; num++) {
            if (num % 2 === 0) {
                firstEven = num;
                break;
            }
        }

        // Find the last odd number
        for (let num = end; num >= start; num--) {
            if (num % 2 !== 0) {
                lastOdd = num;
                break;
            }
        }
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
                findNumbers(response.data.data.length > pageSize ? pageSize : response.data.data.length);
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        })();
    }

    $: listener = {pageSize, activeTab};

    import { onMount } from "svelte";
	import { loadingCursor } from '$lib/cursorChange.js';
	onMount(() => {
		loadingCursor();
	});

</script>
<svelte:head>
	<title>{portfolio.title ? portfolio.title : 'Our Portfolio'}</title>
	<meta name="description" content="ULF BUILT" />

</svelte:head>

<PageBanner title="{portfolio.title ? portfolio.title : 'Our Portfolio'}" subTitle="{portfolio.subTitle ? portfolio.subTitle : ''}"  banner="{domain}{portfolio.featuredImage.data.attributes.formats.large.url ? portfolio.featuredImage.data.attributes.formats.large.url : portfolio.featuredImage.data.attributes.url}" bannerMobile="{domain}{portfolio.featuredImage.data.attributes.formats.medium.url}" />

<section class="portfolio-masonry" id="portfolio-masonry">
    <Container>
        <Row>
            <Col class="text-center">
                <h2 class="text-animate secondary-font" in:textAnimate id="portfolio_heading" gsap-duration="1" gsap-start="top center">{portfolio.masonryGallery.masonryHeading ? portfolio.masonryGallery.masonryHeading : ''}</h2>
                <p>{portfolio.masonryGallery.masonrySubheading ? portfolio.masonryGallery.masonrySubheading : ''}</p>
                <!-- <Masonry items={portfolio.masonryGallery.masonryItems.data} paginate="true" postperpage="6"/> -->
                <div class="categories__tabs__heading" in:fly id="portfolio_cat" gsap-duration="1.2" gsap-start="top center">
                    <ul>
                        {#each portfolio.masonryGallery.masonryItems.data as heading}
                            <li>
                                <!-- svelte-ignore a11y-click-events-have-key-events -->
                                <span 
                                data-category="{heading.id}"
                                class:active="{activeTab === heading.id}"
                                on:click="{() => handleTabClick(heading.id)}"
                                >
                                {heading.attributes.Title ? heading.attributes.Title : ''}
                                </span>
                            </li>
                        {/each}
                    </ul>
                </div>
                <p class="text-center view-all">
                    {#if pageSize === 9} 
                        {#if portfolioList.length > pageSize} 
                            <span on:click="{() => pageSize = 999}">View All Projects</span>
                        {/if}
                    {:else}
                        <span on:click="{() => pageSize = 9}">View Less Projects</span>
                    {/if}
                </p>
                <div class="portfolio-results-container">
                    {#key listener}
                        {#if loading}  <!-- show load -->
                            <div class="col text-center list-text-details">Loading...</div>
                        {:else}
                            {#if portfolioList.length == 0} 
                                <div class="col text-center list-text-details">No Portfolios Found...</div>
                            {:else}
                            {@const items = portfolioList}
                                <div class="container masonry-wrapper">       
                                    {#each paginate({ items, pageSize, currentPage }) as project, index}			
                                        <div class="masonry-items {index + 1 == firstEven ? 'firstEven' : ''}{index + 1 == lastOdd ? 'lastOdd' : ''}" 
                                        in:fly id="masonry-items{index}" gsap-duration="2" gsap-y="10" gsap-start="top center"> 
                                            <a data-sveltekit-reload href="/portfolio/{project.attributes.slug}" class="zoomImg">  
                                                {#if project.attributes.featuredImage.data != null}
                                                    <img src="{domain}{project.attributes.featuredImage.data.attributes.formats.large.url ? project.attributes.featuredImage.data.attributes.formats.large.url : project.attributes.featuredImage.data.attributes.url}" alt="{project.attributes.title}">
                                                {:else}
                                                    <img src="{fallback ? domain+fallback.attributes.url : noFeatured}" alt="{project.attributes.title}">
                                                {/if}
                                                <div class="masonry-items__text">
                                                    <span>{('0' + (index + 1)).slice(-2)}</span>
                                                    {project.attributes.title ? project.attributes.title : ''}
                                                    <i><svg width="8" height="14" viewBox="0 0 8 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                        <path d="M1.29004 12.3459L6.29004 6.84595L1.29004 1.34595" stroke="#00ADEE" stroke-width="2" stroke-linecap="round"/>
                                                        </svg>
                                                    </i>
                                                </div>
                                            </a>
                                        </div>			
                                    {/each}
                                </div>
                            {/if}
                        {/if}
                    {/key}
                </div>
                <div class="paginate-section" >
                    <LightPaginationNav
                    totalItems="{portfolioList.length}"
                    pageSize="{pageSize}"
                    currentPage="{currentPage}"
                    limit="{1}"
                    showStepOptions="{true}"
                    on:setPage="{(e) => currentPage = e.detail.page}"
                    />
                </div>
            </Col>
        </Row>
    </Container>
</section>
<section class="portfolio-cta" id="portfolio-cta">
    <!-- <Animate> -->
        <Container>
            <Row>
                <Col class="text-center ">
                    <div class="portfolio-cta__content">
                        <p in:slide id="portfolio-cta-preheading" gsap-duration="1.5" gsap-start="top center">{portfolio.ourApproachPreHeading ? portfolio.ourApproachPreHeading : ''}</p>
                        <h2 class="text-animate secondary-font" in:textAnimate id="portfolio-cta-heading" gsap-duration="1.5" gsap-start="top center">{@html portfolio.ourApproachHeading ? portfolio.ourApproachHeading : ''}</h2>                 
                    </div>
                    <div class="portfolio-cta__btns" gsap-start="top top" in:fly id="portfolio-cta-button" gsap-delay="1" gsap-duration="1.5" >
                        <a href="{portfolio.ourApproachLeftBtnUrl ? portfolio.ourApproachLeftBtnUrl : '#'}" class="btn btn-secondary">{portfolio.ourApproachLeftBtnTitle ? portfolio.ourApproachLeftBtnTitle : 'Button'}</a>
                        <a href="{portfolio.ourApproachRightBtnUrl ? portfolio.ourApproachRightBtnUrl : '#'}" class="btn btn-inverted">{portfolio.ourApproachRightBtnTitle ? portfolio.ourApproachRightBtnTitle : 'Button'}</a>
                    </div>                   
                </Col>
            </Row>
        </Container>
    <!-- </Animate> -->
</section>

<section class="m-0 article-wrapper" id="article-wrapper">
	<ArticleSection />
</section>

<section class="m-0 cta-wrapper autoscroll-exception" id="cta-wrapper">
	<Cta />
</section>
<style lang="scss">
    section{
        min-height: 20vh;
    }
    .portfolio-masonry{
        position: relative;
        .list-text-details {
            position: absolute;
            top: 15rem;
            left: 50%;
            -webkit-transform: translateX(-50%);
            transform: translateX(-50%)
        }
        h2{
            margin-bottom: 1.5rem;
            color: $secondary-color;
            justify-content: center;
            @include media-max(sm){
                display: none;
            }
        }
        p{
            max-width: 1100px;
            margin: 0 auto 3rem;
        }
        .categories__tabs__heading{
            ul{
                display: flex;
                width: 90%;
                margin: auto;
                margin-bottom: 2rem;
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
                    padding: 1rem 0
                }						
                @include media-max(sm){
                    overflow-x: scroll;
                }					
                li{
                    list-style: none;
                    width: 25%;
                    @include media-max(sm){
                        width: 15rem;
                        padding: 0 1rem;
                    }
                    border-right: 3px solid $gray;	
                    &:last-child {
                        border: none;
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
        .view-all{
			margin-bottom: 2rem;
			span{
				color: $secondary-color;
				&:hover{
					cursor: pointer;
				}
			}
		}
        .portfolio-results-container {
            min-height: 200vh;
        }
        .masonry-wrapper {
            min-height: 31rem;
            // column-count: 2;
            // column-gap: 0.625rem;
            display: grid;
            grid-template-columns: repeat(2, 1fr);
            column-gap: 1rem;
            @include media-max(sm){
                grid-template-columns: 1fr;
            }
            .masonry-items{
                // display: grid;
                // grid-template-rows: 1fr auto;
                break-inside: avoid;
                overflow: hidden;
                color: white;
                text-align: center;  
                // padding-top: 0.8rem;
                &:nth-child(even) {
                    margin-top: 2rem;
                }
                &:nth-child(odd) {
                    margin-bottom: 2rem;
                }
                &.firstEven {
                    margin-top: 5rem;
                }
                &.lastOdd {
                    margin-bottom: 5rem;
                }
                @include media-max(sm){
                    margin-top: 0 !important;
                    margin-bottom: 1rem !important;
                }
                &:hover{
                    .masonry-items__text{
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
                @include media-max(sm){
                    width: 100%;
                    padding-top: 1rem;
                }

                @include media-max(lg){
                    min-height: unset;
                    min-width: unset;
                }   

                a{
                    display: block;
                    height: 100%;
                    width: 100%;
                    margin: .5rem;
                    overflow: hidden;
                    position: relative;

                    &:hover{
                        .masonry-items__text{
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
                        
                    @include media-max(sm){
                        width: 100%;
                        margin: 0;
                    }               
                    img{
                        height: 100%;
                        object-fit: cover;
                        // aspect-ratio: auto;
                        min-height: 26.813rem;
                        min-width: 39.688rem;

                        @include media-max(xs){
                            min-height: unset;
                            min-width: unset;
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
                        // font-size: 0.6rem;
                        width: 90%;
                        bottom: 0.5rem
                    } 
                    span{
                        color: $primary-color;
                        font-size: 1.2rem;
                        margin: 0 0.8rem 0;
                        @include media-max(sm){
                            margin: 0;
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
        .paginate-section {
            margin-top: 5rem; 
        }
    }
    .portfolio-cta{
        min-height: 30vw;
        min-width: 40vw;        
        display: flex;
        align-items: center;
        justify-content: center;
        position: relative;  
              
        &__content{
            h2 {
                // flex-wrap: wrap;
                justify-content: center;
                // width: 39rem;
            }
            p{
                color: $primary-color;
                font-weight: 500;
            }
        }
        &__btns{
            margin: 2rem 0;
            @include media-max(sm){
                display: flex;
                flex-direction: column;
                align-items: center;
            }
            .btn-secondary{
                margin-right: 1.5rem;
                @include media-max(sm){
                    margin: 0 0 1rem;
                }
            }
        } 
    }

    .cta-wrapper, .article-wrapper {
		padding: unset;
	}

    :global(.option.prev path, .option.next path) {
        fill: $primary-color;
    }
    :global(.option.prev::after) {
        content: 'Prev';
        margin-left: 0.25rem;
    }
    :global(.option.next::before) {
        content: 'Next';
        margin-right: 0.25rem;
    }
</style>
