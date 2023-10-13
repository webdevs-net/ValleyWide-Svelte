<script lang="ts">
    import {Container, Row, Col} from 'sveltestrap';
    import { onMount } from 'svelte';
	import Animate from '$lib/components/Animate.svelte';
    import { textAnimate, fly, fly2, fadeIn, slide, scaleUp, slowDownSection } from '$lib/GsapAnimation.js';
	import PageBanner from '$lib/components/layout/PageBanner.svelte';
    import Contactform from '$lib/components/layout/Contactform.svelte';
    import ClientTestimonial from '$lib/components/layout/ClientTestimonial3.svelte';
    import certBG from '$lib/img/BlankCertBg.png';
    import certBGMobile from '$lib/img/CertBGMobileBlank.png';
    import {page} from '$app/stores';
    export let data;

    let abouttitle = data.about.data.attributes.Title
    let aboutimage = data.about.data.attributes.featuredimage.data.attributes.formats.large_x2.url ? data.about.data.attributes.featuredimage.data.attributes.formats.large_x2.url : data.about.data.attributes.featuredimage.data.attributes.url 
    let aboutsubheading = data.about.data.attributes.Aboutsubheading
    let about = data.about.data.attributes
    let url = "https://api.ulfbuilt.com/";
    let scroll: number;

    let testimonialsData = data.testimonials.data;

    function scrollToDiv() {
        const clientSays = $page.url.hash;
        if(clientSays) {
            const id = clientSays.substring(1);
            const element = document.getElementById(id);
            console.log(element);
            element.scrollIntoView({
                behavior: 'smooth'
            });
        }
    }

    
	import { loadingCursor } from '$lib/cursorChange.js';
    onMount(() => {
        setTimeout(scrollToDiv, 1000);
        // scrollToDiv();
		loadingCursor();
    });	

</script>
<svelte:head>
	<title>{abouttitle ? abouttitle : 'About us'}</title>
	<meta name="description" content="ULFBUILT" />
</svelte:head>
<svelte:window bind:scrollY={scroll} />

<PageBanner title="{abouttitle ? abouttitle : 'About us'}" extraClass="about" subTitle="{aboutsubheading ? aboutsubheading : ''}" banner="{url}{aboutimage}" bannerMobile="{url}{aboutimage}"/>

<section class="mw-1000 text-center about-heading" id="about-heading">
    <!-- <Animate> -->
        <Container>
                <h2 class="pb-2 text-animate secondary-font" in:textAnimate id="about_heading" gsap-duration="1.5">{@html about.AboutHeading ? about.AboutHeading : ''}</h2>
                <p in:fly id="about_heading_cont" gsap-duration="2"  gsap-y="80">{@html about.abouttext ? about.abouttext : ''}</p>
        </Container>
    <!-- </Animate> -->
</section>
<section class="contractor-details" in:slowDownSection id="cd-section1" gsap-start="top">
    <!-- <Animate> -->
        <Container>
            <Row class="flex-md-row flex-column-reverse">
                <Col md="5" class="align-self-center">
                    <div>
                        <h3 class="mb-4 mr-t text-animate secondary-font" in:textAnimate id="cd-heading1" gsap-duration="1" >{@html about.Section1heading ? about.Section1heading : ''}</h3>
                        <p in:fadeIn id="cd-cont1" gsap-duration="1" gsap-delay="0.5" >{@html about.Section1text ? about.Section1text : ''}</p>
                    </div>
                </Col>
                <Col md="6">
                    
                        {#if about.Section1image.data}
                        <div class="imgcont">
                            <img in:fly2 id="cd-image1" gsap-y="-75" src="{about.Section1image.data.attributes.formats.large.url ? url+about.Section1image.data.attributes.formats.large.url : url+about.Section1image.data.attributes.url}" alt="{about.Section1heading}" class="w-100" width="{about.Section1image.data.attributes.width}" height="{about.Section1image.data.attributes.height}">
                        </div>
                        {/if}
                    
                </Col>
            </Row>
        </Container>
    <!-- </Animate> -->
</section>
<section class="contractor-details" in:slowDownSection id="cd-section2" gsap-start="top">
    <!-- <Animate> -->
        <Container>
            <Row>
                <Col md="6">
                    {#if about.Section2image.data}
                    <div class="imgcont">
                        <img in:fly2 id="cd-image2" gsap-y="-75" src="{about.Section2image.data.attributes.formats.large.url ? url+about.Section2image.data.attributes.formats.large.url : url+about.Section2image.data.attributes.url}" alt="{about.Section2heading}" class="w-100" width="{about.Section2image.data.attributes.width}" height="{about.Section2image.data.attributes.height}">
                    </div>
                    {/if}
                </Col>
                <Col md="5" class="align-self-center">
                    <div>
                        <h3 class="mb-4 mr-t text-animate secondary-font" in:textAnimate id="cd-heading2" gsap-duration="1" >{@html about.Section2heading ? about.Section2heading : ''}</h3>
                        <p in:fadeIn id="cd-cont2" gsap-delay="0.5" gsap-duration="1" >{@html about.Section2text ? about.Section2text : ''}</p>
                    </div>
                </Col>
            </Row>
        </Container> 
    <!-- </Animate>   -->
</section>
<section class="contractor-details" in:slowDownSection id="cd-section3" gsap-start="top">
    <!-- <Animate> -->
        <Container>
            <Row class="flex-md-row flex-column-reverse">
                <Col md="5" class="align-self-center">
                    <div>
                        <h3 class="mb-4 mr-t text-animate secondary-font" in:textAnimate id="cd-heading3" gsap-duration="1" >{@html about.Section3heading ? about.Section3heading : ''}</h3>
                        <p in:fadeIn id="cd-cont3" gsap-delay="0.5" gsap-duration="1" > {@html about.Section3text ? about.Section3text : ''}</p>
                    </div>
                </Col>
                <Col md="6">
                    {#if about.Section3image.data}
                    <div class="imgcont">
                        <img in:fly2 id="cd-image3"  gsap-y="-75" src="{about.Section3image.data.attributes.formats.large.url ? url+about.Section3image.data.attributes.formats.large.url : url+about.Section3image.data.attributes.url}" alt="{about.Section3heading}" class="w-100 2col-image" width="{about.Section3image.data.attributes.width}" height="{about.Section3image.data.attributes.height}">
                    </div>
                    {/if}
                </Col>
            </Row>
        </Container> 
    <!-- </Animate>   -->
</section>

<!-- <Animate> mx-8 -->
<section class="remodel" in:fly id="remodel-img-section" gsap-y="20">
    <div class="remodel__bgimage">
        {#if about.Section4image.data}
        <img class="image-scale-up" in:scaleUp id="remodel-img" gsap-duration="2" src="{about.Section4image.data.attributes.formats.large_x2.url ? url+about.Section4image.data.attributes.formats.large_x2.url : url+about.Section4image.data.attributes.url}" alt="{about.Section3heading}" width="{about.Section4image.data.attributes.width}" height="{about.Section4image.data.attributes.height}">
        {/if}
        <p class="text-center pt-3"><i><b>{about.Section4text ? about.Section4text : ''}</b></i></p>
    </div>  
</section>
<!-- </Animate> -->

<section class="certificate mx-8">
    <!-- <Animate>-->
        <Container>
            
                <!-- <div class="certificate-container" style="--cta-banner: url({about.Section5image.data ? url+about.Section5image.data.attributes.url : certBG}); --cta-banner-mobile: url({about.Section5MobileImage.data ? url+about.Section5MobileImage.data.attributes.url : certBGMobile})">
                    <div class="certificate-inner-container">
                        <h2 class="certificate-title">{about.certTitle ? about.certTitle : ''}</h2>
                        <div class="certificate-content">
                            {@html about.certContent ? about.certContent : ''}
                        </div>
                    </div>
                </div> -->

                {#if about.certTitle}
                <div class="certificate-container" in:fly id="cert-img" gsap-duration="1.5" style="--cta-banner: url({certBG}); --cta-banner-mobile: url({certBGMobile})">
                    <div class="certificate-inner-container">
                        <h2 class="certificate-title">{about.certTitle ? about.certTitle : ''}</h2>
                        <div class="certificate-content">
                            {@html about.certContent ? about.certContent : ''}
                        </div>
                    </div>
                </div>
                {/if}
        </Container>
    <!-- </Animate> -->
</section>
<section class="sets-parts" in:slowDownSection id="sp-section1" gsap-start="top">
    <!-- <Animate> -->
        <Container>
            <Row>
                <Col md="12"><h2 class="text-center mb-5 text-animate secondary-font" in:textAnimate id="sp-heading" gsap-duration="1" >{@html about.Section6heading ? about.Section6heading : ''}</h2></Col>
            </Row>
            <Row class="flex-md-row flex-column-reverse sets-parts__row">  
                <Col md="6" class="align-self-center blue-color-background sets-parts__content p-5">
                    <div >
                        <h3 class="mb-4 text-right text-animate secondary-font" in:textAnimate id="sp-heading1" gsap-duration="1">{@html about.Section6subheading ? about.Section6subheading : ''}</h3>
                        <p class="text-right" in:fadeIn id="sp-cont1" gsap-delay="0.5" gsap-duration="1">{@html about.Section6text ? about.Section6text : ''}</p>
                    </div>
                </Col>
                <Col md="6">
                    <div class="sets-parts__mr-l">
                        <!-- style:transform={`translate3d(0, ${(scroll * -0.15)}px, 0)`} -->
                        {#if about.Section6image.data}
                        <div class="imgcont">
                            <img in:fly id="sp-img1" gsap-y="30" gsap-duration="2" gsap-start="top 70%" src="{about.Section6image.data.attributes.formats.large.url ? url+about.Section6image.data.attributes.formats.large.url : url+about.Section6image.data.attributes.url}" alt="{about.Section6subheading}" class="w-100" width="{about.Section6image.data.attributes.width}" height="{about.Section6image.data.attributes.height}">
                        </div>
                        {/if}
                    </div>
                </Col>
            </Row>
        </Container>  
    <!-- </Animate> -->
</section>
<section class="sets-parts"  in:slowDownSection id="sp-section2" gsap-start="top"> 
    <!-- <Animate> -->
        <Container class="mx-10">
            <Row class="sets-parts__row">
                <Col md="6" style="z-index: 1;">
                    <div class="sets-parts__mr-r">
                        <!-- style:transform={`translate3d(0, ${(scroll * -0.15)+450}px, 0)`} -->
                        {#if about.Section7image.data}
                        <div class="imgcont">
                            <img in:fly gsap-y="30" gsap-duration="2" id="sp-img2" gsap-start="top 70%"  src="{about.Section7image.data.attributes.formats.large.url ? url+about.Section7image.data.attributes.formats.large.url : url+about.Section7image.data.attributes.url}" alt="{about.Section7heading}" class="w-100" width="{about.Section7image.data.attributes.width}" height="{about.Section7image.data.attributes.height}">
                        </div>
                        {/if}
                    </div>
                </Col>
                <Col md="6" class="align-self-center silver-color-background sets-parts__content sets-parts__mrl-30 p-5">
                    <div>
                        <h3 class="mb-4 rp-fontsize text-animate secondary-font" in:textAnimate id="sp-heading2" gsap-duration="1">{@html about.Section7heading ? about.Section7heading : ''}</h3>
                        <p in:fadeIn id="sp-cont2" gsap-delay="0.5" gsap-duration="1">{@html about.Section7text ? about.Section7text : ''}</p>
                    </div>
                </Col>
            </Row>
        </Container> 
    <!-- </Animate> -->
</section>
<section class="sets-parts"  in:slowDownSection id="sp-section3" gsap-start="top">
    <!-- <Animate> -->
        <Container class="mx-10">
            <Row class="flex-md-row flex-column-reverse sets-parts__row">
                <Col md="6" class="align-self-center blue-color-background sets-parts__content p-5">
                    <div>
                        <h3 class="mb-4 text-right text-animate secondary-font" in:textAnimate id="sp-heading3" gsap-duration="1">{@html about.Section8heading ? about.Section8heading : ''}</h3>
                        <p class="text-right" in:fadeIn id="sp-cont3" gsap-delay="0.5" gsap-duration="1">{@html about.Section8text ? about.Section8text : ''}</p>
                    </div>
                </Col>
                <Col md="6">
                    <div class="sets-parts__mr-l">
                        <!-- style:transform={`translate3d(0, ${(scroll * -0.1)+500}px, 0)`} -->
                        {#if about.Section8image.data}
                        <div class="imgcont">
                            <img in:fly gsap-y="30" gsap-duration="2" id="sp-img3"  gsap-start="top 70%"  src="{about.Section8image.data.attributes.formats.large.url ? url+about.Section8image.data.attributes.formats.large.url : url+about.Section8image.data.attributes.url}" alt="{about.Section8heading}" class="w-100" width="{about.Section8image.data.attributes.width}" height="{about.Section8image.data.attributes.height}">
                        </div>
                        {/if}
                    </div>
                </Col>
            </Row>
        </Container> 
    <!-- </Animate> -->
</section>

<section id="clientSays">
        {#if testimonialsData}
        <ClientTestimonial clientTestimonials={testimonialsData} testimonialHeading={about.testimonialHeading}></ClientTestimonial>
        {/if}
</section>

<section class="talktous">
    <!-- <Animate> -->
        <Container>
            <h2 class="text-animate secondary-font" in:textAnimate id="talktous-heading" gsap-duration="1">{about.talkTous.talkTous_title ? about.talkTous.talkTous_title : ''}</h2>
            <p in:fly id="talktous-cont" gsap-duration="1.2">{about.talkTous.talkTous_content ? about.talkTous.talkTous_content : ''}</p>
            <div class="talktous__btns" in:fly id="talktous-buttons" gsap-delay="0.5" gsap-duration="1.2">
                <a href="{about.talkTous.talkTous_btn1Link ? about.talkTous.talkTous_btn1Link : '#'}" class="btn btn-secondary">{about.talkTous.talkTous_btn1 ? about.talkTous.talkTous_btn1 : 'Button'}</a>
                <a href="{about.talkTous.talkTous_btn2Link ? about.talkTous.talkTous_btn2Link  : '#'}" class="btn btn-inverted">{about.talkTous.talkTous_btn2 ? about.talkTous.talkTous_btn2 : 'Button'}</a>
            </div>
        </Container>
    <!-- </Animate> -->
</section>

<!-- <Animate> -->
<Contactform/>
<!-- </Animate> -->


<style lang="scss">

	.carousel {
		position: relative;
		width: 100%;
		justify-content: center;
		align-items: center;
	}
	
	button {
		position: absolute;
		width: 40px;
		height: 40px;
		top: 50%;
		z-index: 50;
		margin-top: -20px;
		border: none;
		background-color: transparent;
	}
  button:focus {
    outline: none;
  }
	
	.left {
		left: 2vw;
	}
	
	.right {
		right: 2vw;
	}
	ul {
		list-style-type: none;
		position: absolute;
		display: flex;
		justify-content: center;
		width: 100%;
		margin-top: -30px;
		padding: 0;
	}
	ul li {
		margin: 6px;
		border-radius: 100%;
		background-color: rgba(255,255,255,0.5);
		height: 8px;
		width: 8px;
	}
	ul li:hover {
		background-color: rgba(255,255,255,0.85);
	}
	ul li.active {
		background-color: rgba(255,255,255,1);
	}

    // @import url('https://fonts.googleapis.com/css2?family=Pinyon+Script&display=swap');
    $darkgrey-color: #3E3636;   
    :global(.banner.about) {
        background-position: top !important;
    } 
    .about-heading{
        min-height: 100vh;
		display: flex;
		align-items: center;
        // @include media-max(default){
        //     min-height: 50vh;
        // }
		@include media-max(ipadmini){
            min-height: 50vh;
        }
			
        h2 {
            color:$secondary-color;
            justify-content: center;
        }
        p{
            font-size: 1.25rem;
        }
    }
    .mw-1000{
        h2{
            color:#263A63;
        }
    }
    .mx-8{
        margin:8rem auto;
        @include media-max(sm){
            margin:4rem auto;
        }
    }
    section{
        // margin:7.5rem auto;
        &.certificate {
            text-align: center;
            min-height: 80rem;
            display: flex;
            align-items: center;
            @include media-max(ipadmini){
                min-height: unset;
            }
            img {
                width: auto;
                margin: auto;
                max-width: 100%;
                @include media-max(lg){
                    width: 100%;
                }
            }
            @include media-max(md){
                :global(.container) {
                    max-width: 100%;
                    margin: auto;
                }
            }
            .certificate-container {
                background-image: var(--cta-banner);
                // height: 100vh;
                height: 50rem;
                background-repeat: no-repeat;
                position: relative;
                background-size: contain;
                background-position: center;
                @include media-max(md){ 
                    background-image: var(--cta-banner-mobile);
                }
                .certificate-inner-container {
                    padding-top: 12.5rem;
                    @include media-max(lg){
                        padding-top: 15rem;
                    }
                    @include media-max(md){
                        padding-top: 6rem;
                    }
                    .certificate-title {
                        color: $secondary-color;
                        font-family: "Pinyon Script", cursive;
                        padding-bottom: 5rem;
                        @include media-max(lg){
                            padding-bottom: 3rem;
                        }
                        @include media-max(md){
                            width: 14rem;
                            margin: auto;
                            padding-bottom: 1rem;
                        }
                    }
                    .certificate-content {
                        max-width: 43.379rem;
                        font-size: 1.25rem;
                        line-height: 2.125rem;
                        color: $darkergray;
                        margin: auto;
                        @include media-max(lg){
                            font-size: 1rem;
                        }
                        @include media-max(md){
                            width: 14.375rem;
                            line-height: 2rem;
                            :global(br) {
                                display: none;
                            }
                        }
                    }
                }
            }
        }
    }
    #clientSays{
        padding:0px;
        display: flex;
    flex-direction: column;
    justify-content: center;
    }
    .contractor-details {
        // margin: 5vw 0;
        :global(.row) {
            justify-content: center;
            gap: 3rem;
        }
        @include media-max(ipadmini){
            // :global(.row>*) {
            //     width: 100%;
            //     max-width: 100%;
            // }
            // margin: unset;
			margin: 20vw 0;
        }
        h3 {
            color:$secondary-color;
            font-size: 2.813rem;
            // flex-wrap: wrap;
            // &#cd-heading2 {
            //     width: 37rem;
            // }
            // &#cd-heading3 {
            //     width: 35rem;
            // }
            @include media-max(ipadmini){ 
                font-size: 2.3rem;
            }
        }
        
        p {
            font-size: 1.25rem;
        }

        .imgcont {
            padding-top: 7rem;
            @include media-max(sm){
                padding-top: unset
			}
        } 
        img {
            height: 40rem;
            object-fit: cover;
            
            @include media-max(lg){
				height: 30rem;
			}
            // @include media-max(ipadmini){
			// 	height: auto;
			// }
        }
    }
    .remodel {
        // min-height: 80rem;
		// display: flex;
		// align-items: center;
        margin-top: unset;
		@include media-max(ipadmini){
			min-height: unset;
		}
        &__bgimage {
            width:100%;
            margin:auto;
            min-width:100%;
            max-width:100%;
            @include media-max(xs){ 
                width:100vw;
                margin:auto;
                min-width:80vw;
                max-width:100vw;
            }
            p {
                @include media-max(xs){
                    padding: 0 1rem;
                }
            }
            
        }
        @include media-max(xs){
            padding: 0;
        }
    }
    .sets-parts{
        // min-height: 100vh;
		// display: flex;
		// align-items: center;
		// @include media-max(ipadmini){
		// 	min-height: unset;
		// }
        h2{
            color:$darkgrey-color;
            justify-content: center;
            padding-bottom: 2rem;
        }
        @include media-max(ipadmini){
            :global(.row>*) {
                width: 100%;
                max-width: 100%;
            }
            // margin: unset;
            margin: 20vw 0;
        }
        :global(.sets-parts__row) {
            justify-content: center;
            align-items: center;
        }
        :global(.sets-parts__content) {
            min-height: 35rem;
            display: flex;
            flex-direction: column;
            justify-content: center;
            @include media-max(md) {
                min-height: auto;
            }
        }
        :global(.sets-parts__content h3) {
            color: $secondary-color;
            font-size: 2.813rem;
            @include media-max(ipadmini){ 
                font-size: 2.3rem;
                text-align: left !important;
            }
        }
        :global(.sets-parts__content h3.text-right) {
            justify-content: end;
        }
        :global(.sets-parts__content p) {
            font-size: 1.25rem;
            // text-wrap: balance;
            hyphens: auto;
            @include media-max(ipadmini) {
                text-align: left !important;
            }
        }
        :global(.sets-parts__mrl-30){
            margin-left: -15px;
            @include media-max(xs) {
                margin-left: 0;
            }
        }
        &__mr-l{
            margin-left: -15px;
            @include media-max(md) {
                margin-left: -12px;
            }
            @include media-max(sm){ 
                margin-left: -30px;
            }
            @include media-max(xs) {
                margin-left: 0;
            }
        }
        &__mr-r{
            margin-right: 0;
            // @include media-max(md) {
            //     margin-right: 18px;
            // }
            @include media-max(sm){
                margin-right: 0;
            }
        }
        img {
            height: 40rem;
            object-fit: cover;
            @include media-max(lg){
				height: 30rem;
			}
            // @include media-max(ipadmini){
			// 	height: auto;
			// }
        }

    } 
    @include media-max(sm){ 
        .mr-t {
            margin-top: 1.5rem;
        }
    }
    .talktous{
        min-height: 100vh;
		display: flex;
		align-items: center;
        justify-content: center;
		@include media-max(ipadmini){
			min-height: unset;
		}
        h2 {
            color: $secondary-color;
            justify-content: center;
        }
        p {
            font-size: 1.25rem;
        }
        text-align: center;
        &__btns{
            .btn {
                padding: 0.7rem 3.125rem;
                font-size: 1.25rem;
            }
            a:nth-child(1){
                margin: 1rem;
            }
        }
    }

</style>