<script lang="ts">
    export let data;
    import {Container, Row, Col} from 'sveltestrap';
    import Cta from '$lib/components/layout/Cta.svelte';
    import Animate from '$lib/components/Animate.svelte';
    // import { fade, fly } from "svelte/transition";
    import PageBanner from '$lib/components/layout/PageBanner.svelte';
    // import { onMount } from "svelte";
    // import axios from "axios";
    const url = "https://api.ulfbuilt.com/";
    let page = data.services.data.attributes
    let featuredProjects = data.portfolios.data
    import noFeatured from "$lib/img/blog-empty.svg"
    let fallback = data.fallback.data.attributes.fallbackImage.data;
    import { textAnimate, fly, fadeIn, slide, scaleUp, slowDownSection } from '$lib/GsapAnimation.js';

    // export let pdata;
    // export let featuredProjects;
    // let promise = fetchProject();
    // async function fetchProject(){
    //     const url = 'https://api.ulfbuilt.com/api/portfolios?populate=deep';
    //     const headers = {
    //         Authorization: 'Bearer ec0d6b5aece1773cbd6e5f48756c70d9b0b3a59a4d1c325a2e699c1c1b1cae0980dc56aa2c3dfd565237b2a00db9a547a1a9e54a86f80697b31766e6bf80257b37760df84c70b534edeb4df0bdde9452777a52a757850d7a82c28dba854776c405f20ef3fbd95c72b759280f375f69191f2ca75d69600ea9584d8b2100309072' 
    //     }    
    //     const response = await axios.get(url, { headers });
    //     pdata = response.data;
    //     featuredProjects = pdata.data;
    // }

    // onMount(() => {
    //     promise = fetchProject();
    // });	

    import { onMount } from "svelte";
	import { loadingCursor } from '$lib/cursorChange.js';
	onMount(() => {
		loadingCursor();
	});


</script>
<svelte:head>
	<title>{page.Title ? page.Title : 'Services'}</title>
	<meta name="description" content="ULFBUILT" />
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css">
</svelte:head>
<PageBanner title="{page.Title ? page.Title : 'Services'}" extraClass="services" subTitle="{page.Subheading ? page.Subheading : ''}"  banner="{url}{page.Cover.data[0].attributes.formats.large_x2.url ? page.Cover.data[0].attributes.formats.large_x2.url : page.Cover.data[0].attributes.url}"  />

<section class="service-b mvw-10" in:slowDownSection id="service-b">
    <!-- <Animate> -->
        <Container>
            <h2 class="text-center mb-5 py-3 text-animate secondary-font" in:textAnimate id="about_s1_title" gsap-duration="1">{page.section1heading ? page.section1heading : ''}</h2>
                <Row>
                    <Col md=4 sm=6 xs=12>
                        <!-- <Animate> -->
                            <div class="service-b__service-box">
                                <div class="service-b__service-box__service-box-inner">
                                        <div class="service-b__service-box__service-box-inner__service-icon">
                                            <img in:fadeIn gsap-start="center top" id="about_icon1" gsap-duration="2" src="{url}{page.section1item1icon.data.attributes.url}" alt="{page.section1item1heading}" width="{page.section1item1icon.data.attributes.width}" height="{page.section1item1icon.data.attributes.height}">
                                        </div>
                                    <h4 in:slide gsap-start="center top" id="about_title_icon1" gsap-duration="2">{page.section1item1heading ? page.section1item1heading : ''}</h4>
                                </div>
                                <p in:fadeIn gsap-start="center top" id="about_content_icon1" gsap-duration="2">{page.section1item1text ? page.section1item1text : ''}</p>
                            </div>
                        <!-- </Animate> -->
                    </Col>
                    <Col md=4 sm=6 xs=12>
                        <!-- <Animate> -->
                            <div class="service-b__service-box">
                                <div class="service-b__service-box__service-box-inner">
                                    <div class="service-b__service-box__service-box-inner__service-icon">
                                        <img in:fadeIn gsap-start="center top" id="about_icon2" gsap-duration="2" src="{url}{page.section1item2icon.data.attributes.url}" alt="{page.section1item2heading}" width="{page.section1item2icon.data.attributes.width}" height="{page.section1item2icon.data.attributes.height}">
                                    </div>
                                    <h4 in:slide gsap-start="center top" id="about_title_icon2" gsap-duration="2">{page.section1item2heading ? page.section1item2heading : ''}</h4>
                                </div>
                                <p in:fadeIn gsap-start="center top" id="about_content_icon2" gsap-duration="2">{page.section1item2text ? page.section1item2text : ''}</p>
                            </div>
                        <!-- </Animate> -->
                    </Col>
                    <Col md=4 sm=6 xs=12>
                        <!-- <Animate> -->
                            <div class="service-b__service-box">
                                <div class="service-b__service-box__service-box-inner">
                                    <div class="service-b__service-box__service-box-inner__service-icon">
                                        <img in:fadeIn gsap-start="center top" id="about_icon3" gsap-duration="2" src="{url}{page.section1item3icon.data.attributes.url}" alt="{page.section1item3heading}" width="{page.section1item3icon.data.attributes.width}" height="{page.section1item3icon.data.attributes.height}"> 
                                    </div>
                                    <h4 in:slide gsap-start="center top" id="about_title_icon3" gsap-duration="2">{page.section1item3heading ? page.section1item3heading : ''}</h4>
                                </div>
                                <p in:fadeIn gsap-start="center top" id="about_content_icon3" gsap-duration="2">{page.section1item3text ? page.section1item3text : ''}</p>
                            </div>
                        <!-- </Animate> -->
                    </Col>
                    <Col md=4 sm=6 xs=12>
                        <!-- <Animate> -->
                            <div class="service-b__service-box">
                                <div class="service-b__service-box__service-box-inner">
                                    <div class="service-b__service-box__service-box-inner__service-icon">
                                        <img in:fadeIn gsap-start="center top" id="about_icon4" gsap-duration="2" src="{url}{page.section1item4icon.data.attributes.url}" alt="{page.section1item4heading}" width="{page.section1item4icon.data.attributes.width}" height="{page.section1item4icon.data.attributes.height}">
                                    </div>
                                    <h4 in:slide gsap-start="center top" id="about_title_icon4" gsap-duration="2">{page.section1item4heading ? page.section1item4heading : ''}</h4>
                                </div>
                                <p in:fadeIn gsap-start="center top" id="about_content_icon4" gsap-duration="2">{page.section1item4text ? page.section1item4text : ''}</p>
                            </div>
                        <!-- </Animate> -->
                    </Col>
                    <Col md=4 sm=6 xs=12>
                        <!-- <Animate> -->
                            <div class="service-b__service-box">
                                <div class="service-b__service-box__service-box-inner">
                                    <div class="service-b__service-box__service-box-inner__service-icon">
                                        <img in:fadeIn gsap-start="center top" id="about_icon5" gsap-duration="2" src="{url}{page.section1item5icon.data.attributes.url}" alt="{page.section1item5heading}" width="{page.section1item5icon.data.attributes.width}" height="{page.section1item5icon.data.attributes.height}">
                                    </div>
                                    <h4 in:slide gsap-start="center top" id="about_title_icon5" gsap-duration="2">{page.section1item5heading ? page.section1item5heading : ''}</h4>
                                </div>
                                <p in:fadeIn gsap-start="center top" id="about_content_icon5" gsap-duration="2">{page.section1item5text ? page.section1item5text : ''}</p>
                            </div>
                        <!-- </Animate> -->
                    </Col>
                    <Col md=4 sm=6 xs=12>
                        <!-- <Animate> -->
                            <div class="service-b__service-box">
                                <div class="service-b__service-box__service-box-inner">
                                    <div class="service-b__service-box__service-box-inner__service-icon">
                                        <img in:fadeIn gsap-start="center top" id="about_icon6" gsap-duration="2" src="{url}{page.section1item6icon.data.attributes.url}" alt="{page.section1item6heading}" width="{page.section1item6icon.data.attributes.width}" height="{page.section1item6icon.data.attributes.height}">
                                    </div>
                                    <h4 in:slide gsap-start="center top" id="about_title_icon6" gsap-duration="2">{page.section1item6heading ? page.section1item6heading : ''}</h4>
                                </div>
                                <p in:fadeIn gsap-start="center top" id="about_content_icon6" gsap-duration="2">{page.section1item6text ? page.section1item6text : ''}</p>
                            </div>
                        <!-- </Animate> -->
                    </Col>
                </Row>
        </Container>
    <!-- </Animate> -->
</section>
<section class="mx-10 sets-us-apart" in:slowDownSection id="sp-section1" gsap-start="top">
    <!-- <Animate> -->
        <Container>
            <h2 class="text-center mb-5 py-3 text-animate secondary-font" in:textAnimate id="about_sua_title" gsap-duration="1">{page.section2mainheading ? page.section2mainheading : ''}</h2>
                <Row noGutters class="justify-content-center sets-us-apart__row">
                    <Col md="6" class="sets-us-apart__content">
                        <div>
                            <h4 class="text-right pfont py-3 text-animate" in:textAnimate id="about_sua_title1" gsap-duration="1.5">{@html page.section2heading ? page.section2heading : ''}</h4>
                            <div class="blue-color-background">
                                <p class="text-right px-5 py-5" gsap-delay="1" in:fly id="about_sua_cont1" gsap-duration="2" gsap-y="20">
                                    {@html page.section2text ? page.section2text : ''}
                                </p>
                            </div>
                        </div>
                    </Col>
                    <Col md="6" class="imageCont">
                        {#if page.section2image.data}
                        <img in:fly id="about_sua_img1" gsap-duration="3" gsap-y="50" gsap-delay="0.5" src="{url}{page.section2image.data.attributes.formats.large.url ? page.section2image.data.attributes.formats.large.url : page.section2image.data.attributes.url}" alt="{page.section2heading}" class="w-100" width="{page.section2image.data.attributes.width}" height="{page.section2image.data.attributes.height}">
                        {/if}
                    </Col>
                </Row>
        </Container>
    <!-- </Animate> -->
</section>
<section class="mx-10 sets-us-apart" in:slowDownSection id="sp-section2" gsap-start="top">
    <!-- <Animate> -->
        <Container>
            <Row noGutters class="justify-content-center flex-md-row flex-column-reverse sets-us-apart__row">
                <Col md="6" class="imageCont">
                    {#if page.section3image.data}
                    <img in:fly id="about_sua_img2" gsap-duration="3" gsap-y="50" gsap-delay="0.5" src="{url}{page.section3image.data.attributes.formats.large.url ? page.section3image.data.attributes.formats.large.url : page.section3image.data.attributes.url}" alt="{page.section3heading}" class="w-100">
                    {/if}
                </Col>
                <Col md="6" class="sets-us-apart__content">
                    <div >
                        <h4 class="txt-center py-3 pfont text-animate" in:textAnimate id="about_sua_title2" gsap-duration="1.5">{@html page.section3heading ? page.section3heading : ''}</h4>
                        <!-- <p class="px-5 txt-center py-5 blue-color-background">{@html page.section3text ? page.section3text : ''}</p> -->
                        <div class="blue-color-background">
                            <p class="txt-center px-5 py-5" in:fly id="about_sua_cont2" gsap-delay="1"  gsap-duration="2" gsap-y="20">
                                {@html page.section3text ? page.section3text : ''}
                            </p>
                        </div>
                    </div>
                </Col>
            </Row>
        </Container>
    <!-- </Animate> -->
</section>
<section class="mx-10 sets-us-apart" in:slowDownSection id="sp-section3" gsap-start="top">
    <!-- <Animate> -->
        <Container>
            <Row noGutters class="justify-content-center sets-us-apart__row">
                <Col md="6" class="sets-us-apart__content">
                    <div>
                        <h4 class="text-right pfont py-3 text-animate" in:textAnimate id="about_sua_title3" gsap-duration="1.5">{@html page.section4heading ? page.section4heading : ''}</h4>
                        <!-- <p class="text-right px-5 py-5 blue-color-background">{@html page.section4text ? page.section4text : ''}</p> -->
                        <div class="blue-color-background">
                            <p class="text-right px-5 py-5" in:fly id="about_sua_cont3" gsap-duration="2" gsap-delay="1" gsap-y="20">
                                {@html page.section4text ? page.section4text : ''}
                            </p>
                        </div>
                    </div>
                </Col>
                <Col md="6" class="imageCont">
                    {#if page.section4image.data}
                    <img in:fly id="about_sua_img3" gsap-duration="3" gsap-delay="0.5" gsap-y="50" src="{url}{page.section4image.data.attributes.formats.large.url ? page.section4image.data.attributes.formats.large.url : page.section4image.data.attributes.url}" alt="{page.section4heading}" class="w-100">
                    {/if}
                </Col>
            </Row>
        </Container>
    <!-- </Animate> -->
</section>
<section class="height-100vh fullwidth" in:fly id="about_banneronly_img_section" gsap-y="10" >
    <!-- <Animate> -->
        {#if page.section5image.data}
        <img in:scaleUp id="about_banneronly_img" gsap-duration="1.5" src="{url}{page.section5image.data.attributes.formats.large.url ? page.section5image.data.attributes.formats.large.url : page.section5image.data.attributes.url}" alt="{page.title}" class="w-100 image-scale-up">
        {/if}
    <!-- </Animate> -->
</section>
<section class="reimagine">
    <!-- <Animate> -->
        <Container>
            <h2 class="text-center mb-3 py-3 text-animate secondary-font" in:textAnimate id="about_reimagine_title" gsap-duration="1" gsap-start="top 20%">{page.section6heading ? page.section6heading : ''}</h2>
            <p class="mb-2 py-3 two-columns" in:fadeIn id="about_reimagine_cont" gsap-duration="1" gsap-y="20" gsap-start="top 20%"> {@html page.section6text ? page.section6text : ''}</p>
            <div class="text-right" ><a class="btn btn-secondary" href="{page.section6btnUrl ? page.section6btnUrl : '#'}">{page.section6btn ? page.section6btn : 'Button'}</a></div>
        </Container>
    <!-- </Animate> -->
</section>

<section class="explore">
    <Container>
        <Row>
            <!-- <Animate> -->
                <Col md="12">
                    <h2 class="text-center text-animate secondary-font" in:textAnimate id="about_explore_title" gsap-duration="1">{page.ExploreProjects.Heading ? page.ExploreProjects.Heading : 'Explore our Projects...'}</h2>
                </Col>	
            <!-- </Animate>		 -->
            {#each featuredProjects.sort(() => 0.5 - Math.random()).slice(0, 2) as featuredProject, index}
                <Col md="6">
                    <div class="explore__article" in:fly id="related-items{index}" gsap-duration="1" gsap-delay={index/2} gsap-y="30" gsap-start="top center">
                        <a href="portfolio/{featuredProject.attributes.slug}" data-sveltekit-reload class="zoomImg">
                            <!-- <img src="{url}{featuredProject.attributes.featuredImage.data.attributes.url}" alt="{featuredProject.attributes.featuredImage.data.attributes.alternativeText}"> -->
                            {#if featuredProject.attributes.featuredImage.data != null}
                            <img src="{url}{featuredProject.attributes.featuredImage.data.attributes.formats.large.url ? featuredProject.attributes.featuredImage.data.attributes.formats.large.url : featuredProject.attributes.featuredImage.data.attributes.url}" alt="{featuredProject.attributes.featuredImage.data.attributes.alternativeText}" />
                            {:else}
                            <img src="{fallback ? url+fallback.attribute.url : noFeatured}" alt="{featuredProject.attributes.title}" >
                            {/if}
                            <div class="explore__article__text">
                                <span>{('0' + (index + 1)).slice(-2)}</span>
                                {featuredProject.attributes.title ? featuredProject.attributes.title : ''}
                                <i><svg width="8" height="14" viewBox="0 0 8 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M1.29004 12.3459L6.29004 6.84595L1.29004 1.34595" stroke="#00ADEE" stroke-width="2" stroke-linecap="round"/>
                                    </svg>
                                </i>
                            </div>
                        </a>
                    </div>
                </Col>
            {/each}
        </Row>
    </Container>
</section> 

<!-- <Animate> -->
    <Cta/>
<!-- </Animate> -->
<style lang="scss">
    :global(.banner__content__paragraph) {
        @include media-max(sm){
            display:none;
        }
    }
    :global(.banner.services) {
        background-position: center !important;
    }
    .service-b{
        // min-height: 75rem;
		// display: flex;
		// align-items: center;
        // justify-content: center;
        @include media-max(xs){
            // padding-top: 5rem;
			height: 150rem;
		}
        @include media-between(xs, md){
            padding-left: 0;
            padding-right: 0;
            :global(.container) {
                max-width: 100%;
                margin: auto;
            }
        }
        h2 {
            color: $secondary-color;
            justify-content: center;
        }
        // for bg bars
        :global(.row:after) {
            @include media-max(xs){
                content: '';
                display: block;
                background-image: url(/src/lib/img/service-mobile-bars1.svg);
                background-position: center;
                background-size: contain;
                background-repeat: no-repeat;
                width: 100%;
                height: 100%;
                position: absolute;
                z-index: -1;
            }
            @include media-max(mm){
                background-image: url(/src/lib/img/service-mobile-bars.svg);
                background-size: auto;
            }
        }
        :global(.row) {
            position: relative;
            // padding: 3rem 0;
        }
        :global(.row .col-md-4) {
            min-height: 40vh;
            @include media-max(ipadmini){
                min-height: unset;
            }
        }
        // end for mobile bg bars
        &__service-box{
            padding: 3vw;
            
            @include media-max(xs){
                padding: 15vw 10vw;
            }
            @include media-max(ml){
                padding: 10vw 0;
            }
            @include media-max(mm){
                padding: 25vw 10vw;
                margin: -10px;
            }
            
            p {
                font-size: 1.15rem;
                line-height: 2rem;
                @include media-max(ipadmini){
                    font-size: 1rem;
                    line-height: 1.75rem;
                }
                @include media-max(xs){
                    font-size: 1.15rem;
                line-height: 2rem;
                }
            }
            &__service-box-inner{
                display: flex;
                margin-bottom: 20px;
                &__service-icon{
                    img{
                        width: 6.202rem;
                        background-color: #263A63;
                        padding: 1.418rem 1.396rem;
                        box-shadow: 3px 3px 3px #aaa;
                        border-radius: 10px;
                        height: 6.246rem;
                        @include media-max(md){ 
                            padding: 8px 10px;
                            height: 4rem;
                            width: auto;
                        }
                    }
                }
                h4{
                    align-self: center;
                    padding-left: 20px;
                    @include media-max(md){
                        align-self: center;
                        padding-left: 9px;
                        font-size: 1.688rem;
                    }
                    @include media-max(ipadmini){
                        font-size: 1.5rem;
                    }
                    @include media-max(sm){
                        padding-left: 2rem;
                        font-size: 1.688rem;
                    }
                }
            } 
        }
    } 
    .fullwidth {
        padding: 0;
    }
    .reimagine {
        min-height: 100vh;
        padding: 10rem 0;
		display: flex;
		align-items: center;
        justify-content: center;
		@include media-max(ipadmini){
			min-height: unset;
            padding: 0;
        }
        h2 {
            justify-content: center;
        }
        @include media-between(xs, md){
            padding-left: 0;
            padding-right: 0;
            :global(.container) {
                max-width: 95%;
                margin: auto;
            }
        }
        .btn {
            padding: 0.7rem 3.125rem;
            font-size: 1.25rem;

            @include media-max(sm){  
                padding: 0.7rem 3rem;
                font-size: 1.25rem;
            }
        }
        :global(p) {
            font-size: 1.15rem;
            line-height: 2.125rem;
            margin-bottom: 2.25rem;
        }
        :global(p.two-columns) {
            gap: 90px;
        }
    }
    .sets-us-apart {
        // min-height: 60rem;
		// display: flex;
		// align-items: center;
		@include media-max(ipadmini){
			margin: 20vw 0;
        }
        // @include media-max(sm){
		// 	margin: unset;
		// }
        @include media-between(xs, md){
            padding-left: 0;
            padding-right: 0;
            :global(.container) {
                max-width: 95%;
                margin: auto;
            }
        }
        h2 {
            color: $secondary-color;
            justify-content: center;
            padding: 3rem 0 5rem;
        }
        img {
            height: 40rem;
            object-fit: cover;
            @include media-max(lg){
				height: 30rem;
			}
            @include media-max(ipadmini){
				height: 20rem;
			}
            @include media-max(sm){
				height: 15rem;
			}
            // @include media-max(md){
            //     width: 90% !important;
            //     height: auto;
            // }
            // @include media-max(sm){
            //     width: 90% !important;
            // }
        }

        @include media-max(ipadmini){
            :global(.col-md-6) {
                width: 100%;
            }
        }

        
    }
    :global(.sets-us-apart__row){
        @include media-max(lg){
            align-items: end;
        }
        @include media-max(sm){
            flex-direction: column-reverse;
            &.flex-column-reverse {
                flex-direction: column !important;
            }
        }
    }
    :global(.sets-us-apart__row.flex-column-reverse){
        @include media-max(sm){
            flex-direction: column !important;
        }
    }
    :global(.imageCont) {
        @include media-max(sm){
            text-align: center;
            z-index: 2;
        }
    }
    :global(.sets-us-apart__content){
        display:flex;
        flex-direction:column;
        justify-content:center;
        @include media-max(sm){ 
            margin-top: 3rem !important;
        }
        h4{
            text-transform:uppercase;
            color: $secondary-color;
            font-size: 2.688rem;
            font-weight: 600;
            &.text-right {
                padding-right: 3rem;
                justify-content: end;
            }
            &.txt-center {
                padding-left: 3rem;
            }
            @include media-max(ipadmini){ 
                &.pfont {
                    padding-left: 2rem;
                    padding-right: 2rem;
                }
                text-align: left;
            }
            @include media-max(sm){ 
                z-index: 1;
                margin-bottom: -5rem;
            }
        }
        p {
            font-size: 1.25rem;
            line-height: 2.125rem;
            &.text-right {
                padding-left: 7rem !important;
            }
            &.txt-center {
                padding-right: 7rem !important;
            }
            // @include media-between(xs, md){
            //     &.text-right {
            //         padding-left: 3rem !important;
            //     }
            //     &.txt-center {
            //         padding-right: 3rem !important;
            //     }
            // }
            @include media-max(ipadmini){ 
                // &.blue-color-background {
                //     padding-left: 2rem !important;
                //     padding-right: 2rem !important;
                // }
                
                text-align: left;

                &.text-right {
                    padding-left: 2rem !important;
                    padding-right: 2rem !important;
                }
                &.txt-center {
                    padding-left: 2rem !important;
                    padding-right: 2rem !important;
                }
            }
            @include media-max(sm){ 
                padding-top: 15rem !important;
                margin-top: -15rem;
            }
        }

    }
    .explore {
        background-color: #E5EEF2;
        padding: 5rem 1rem;
        margin-bottom: 0;
        @include media-between(xs, md){
            padding-left: 0;
            padding-right: 0;
            :global(.container) {
                max-width: 95%;
                margin: auto;
            }
        }
        h2{
            text-align: center;
            margin-bottom: 3rem;
            font-size: 2.8rem;
            color: $secondary-color;
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
                margin-bottom: 1rem;
            }   
            img {
                object-fit: cover;
                object-position: center;
                height: 100%;
            }   
            &:hover{
                .explore__article__text {
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
                span{
                    color: $primary-color;
                    font-size: 1.2rem;
                    margin: 0 0.8rem 0;
                    // @include media-max(sm){
                    //     margin: 0;
                    //     font-size: 1rem;
                    // }                
                }
                i {
                    position: absolute;
                    top: 20%;
                    right: 1rem;
                }
            }	
        }
    }
    @include media-max(sm){ 
        .text-right, .txt-center{
            text-align: center;
        }
        :global(.service-b .col-md-4:nth-child(3)) {
            background-image: unset;
        }
    } 
</style>