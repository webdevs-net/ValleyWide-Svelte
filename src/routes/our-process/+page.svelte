<script lang="ts">
	import Animate from "$lib/components/Animate.svelte";
    import Cta from "$lib/components/layout/Cta.svelte";
    import PageBanner from "$lib/components/layout/PageBanner.svelte";
	import { Col, Container, Row } from "sveltestrap";
    import ParallaxImage from "$lib/components/parallaxImage.svelte";
    // import { fade, fly } from 'svelte/transition';
    import { textAnimate, fly, fadeIn, slide, scaleUp, slowDownSection } from '$lib/GsapAnimation.js';
    const domain = "https://api.ulfbuilt.com";
    export let data;
    const processData = data.data.attributes;

    import { onMount } from "svelte";
	import { loadingCursor } from '$lib/cursorChange.js';
	onMount(() => {
		loadingCursor();
	});

</script>

<svelte:head>
	<title>{processData.section1heading ? processData.section1heading : 'Our Process'}</title>
	<meta name="description" content="ULFBUILT" />
    <!-- <link rel="preload" href="{domain}{processData.Cover.data[0].attributes.url}" as="image"> -->
</svelte:head>
<PageBanner title="{processData.section1heading ? processData.section1heading : 'Our Process'}" subTitle="{processData.bannerSub ? processData.bannerSub : ''}" banner="{domain}{processData.Cover.data[0].attributes.formats.large_x2 ? processData.Cover.data[0].attributes.formats.large_x2.url : processData.Cover.data[0].attributes.url}" />
<section class="our-process">
        <Container>
            <!-- <Animate> -->
                <Row>
                    <Col class="md-12 text-center">
                        <div class="our-process__heading">
                            <h2 class="text-animate secondary-font" in:textAnimate id="process_title" gsap-duration="1" gsap-start="top center">{processData.section1heading ? processData.section1heading : ''}</h2>
                            <div in:fadeIn id="process_sub" gsap-duration="1" gsap-delay="0.5" gsap-start="top center">
                                {@html processData.section1text ? processData.section1text : ''}
                            </div>
                        </div>
                    </Col>
                </Row>
            <!-- </Animate> -->
            <!-- <Animate> -->
                <Row>
                    <Col class="md-12">
                        <!-- <Animate> -->
                            {#if processData.section2image.data}
                            <img in:fadeIn id="process_img" gsap-duration="1.5" gsap-start="top center"  src="{domain}{processData.section2image.data.attributes.formats.large.url ? processData.section2image.data.attributes.formats.large.url : processData.section2image.data.attributes.url}"
                            srcset="{domain}{processData.section2image.data.attributes.url} 330w,
                                    {domain}{processData.section2image.data.attributes.url} 660w,
                                    {domain}{processData.section2image.data.attributes.url} 990w"
                            sizes="(max-width: 480px) 330px,
                                (max-width: 960px) 660px,
                                990px"
                            width="330"
                            height="170"
                            alt="{processData.section2image.data.attributes.alternativeText}"/>
                                <!-- <ParallaxImage imageHeight="60" imageUrl="{domain}{processData.section2image.data.attributes.formats.large.url ? processData.section2image.data.attributes.formats.large.url : processData.section2image.data.attributes.url}">
                                </ParallaxImage> -->
                            {/if}
                            <div class="our-process__paragraph mx-auto">
                                <div in:fly id="process_content" gsap-duration="2" gsap-y="50">{@html processData.section2text ? processData.section2text : ''}</div>
                            </div>
                        <!-- </Animate> -->
                    </Col>            
                </Row>
            <!-- </Animate> -->
        </Container>
</section>

<section class="phase-heading">
    <!-- <Animate> -->
        <Container>
            <Row>
                <Col md="{{ size: '6', offset: 3 }}" class="text-center">
                    <h3 in:fly id="ph_heading" gsap-duration="1.5" gsap-y="50">
                        {@html processData.section3heading ? processData.section3heading : ''}                  
                    </h3>
                </Col>
            </Row>
        </Container>
    <!-- </Animate> -->
</section>

<!-- <Animate> -->
<!-- <section class="phase1-img" in:fadeIn id="phase1_img1" gsap-duration="2" style="--phs1: url({domain}{processData.section3image.data.attributes.formats.large_x2 ? processData.section3image.data.attributes.formats.large_x2.url : processData.section3image.data.attributes.url })"></section>  -->

<div class="parallax-wrapper">
<ParallaxImage imageHeight="70" imageUrl="{domain}{processData.section3image.data.attributes.formats.large_x2 ? processData.section3image.data.attributes.formats.large_x2.url : processData.section3image.data.attributes.url}">
</ParallaxImage> 
</div>
<!-- </Animate> -->

<section class="phase">
    <!-- <Animate> -->
        <Container class="phase-container">
            <Row class="text-center phase__row">
                <Col xs="2">
                    <span class="num" in:slide id="phase1_num" gsap-duration="2" gsap-x="-15">1</span>
                </Col>
                <Col xs="10">
                    <div class="phase__heading"><h3 class="text-animate" in:textAnimate id="phase1_heading" gsap-duration="1">{processData.section3phase1mainheading ? processData.section3phase1mainheading : ''}</h3></div>
                </Col>
            </Row>
        </Container>
    <!-- </Animate> -->
    <!-- <Animate> -->
        <div class="phase__grid">
            <div class="phase__grid__item">
                <p class="pre-head" in:slide id="phase1_pre1" gsap-duration="1" gsap-x="-7">{processData.section4heading ? processData.section4heading : ''}</p>
                <h4 class="text-animate secondary-font" in:textAnimate id="phase1_title1" gsap-duration="1.5">{processData.section4subheading ? processData.section4subheading : ''}</h4>
                <div in:fly id="phase1_sub1" gsap-duration="1" gsap-delay="0.5">
                    {@html processData.section4text ? processData.section4text : ''}
                </div>
            </div>
            <div class="phase__grid__item">
                <div in:fly id="phase1_cont1" gsap-duration="1.5" gsap-delay="0.8">
                    {@html processData.section4righttext ? processData.section4righttext : ''}
                </div>
            </div>     
            <div class="phase__grid__item">
                <p class="pre-head" in:slide id="phase1_pre2" gsap-duration="1" gsap-x="-7">{processData.section5heading ? processData.section5heading : ''}</p>
                <h4  class="text-animate secondary-font" in:textAnimate id="phase1_title2" gsap-duration="1.5">{processData.section5subheading ? processData.section5subheading : ''}</h4>
                <div in:fly id="phase1_sub2" gsap-duration="1" gsap-delay="0.5">
                    {@html processData.section5text ? processData.section5text : '' }
                </div>
            </div>  
            <div class="phase__grid__item last-even">
                <div in:fly id="phase1_cont2" gsap-duration="1.5" gsap-delay="0.8">
                    {@html processData.section5righttext ? processData.section5righttext : ''}
                </div>
            </div>                                 
        </div>  
    <!-- </Animate> -->
</section>

<!-- <Animate> -->
    <section class="phase__banner image-scale-up" in:scaleUp id="phase1_img2" gsap-duration="2" style="--phs1Banner: url({domain}{processData.section6image.data.attributes.formats.large_x2 ? processData.section6image.data.attributes.formats.large_x2.url : processData.section6image.data.attributes.url })">
    </section>  
    <!-- <div class="parallax-wrapper">
        <ParallaxImage imageHeight="100" imageUrl="{domain}{processData.section6image.data.attributes.formats.large_x2 ? processData.section6image.data.attributes.formats.large_x2.url : processData.section6image.data.attributes.url }">
        </ParallaxImage> 
    </div> -->
<!-- </Animate> -->
   
<section class="phase no-margin-top">
   <!-- <Animate> -->
        <div class="phase__grid scnd-row">
            <div class="phase__grid__item">
                <p class="pre-head" in:slide id="phase1_pre3" gsap-duration="1" gsap-x="-7">{processData.section7heading ? processData.section7heading : ''}</p>
                <h4 class="text-animate secondary-font" in:textAnimate id="phase1_title3" gsap-duration="1.5">{processData.section7subheading ? processData.section7subheading : ''}</h4>
                <div in:fly id="phase1_sub3" gsap-duration="1" gsap-delay="0.5">
                    {@html processData.section7text ? processData.section7text : ''}
                </div>
            </div>
            <div class="phase__grid__item">
                <div in:fly id="phase1_cont3" gsap-duration="1.5" gsap-delay="0.8">
                    {@html processData.section7righttext ? processData.section7righttext : ''}
                </div>
            </div>     
            <div class="phase__grid__item">
                <p class="pre-head" in:slide id="phase1_pre4" gsap-duration="1" gsap-x="-7">{processData.section8heading ? processData.section8heading : ''}</p>
                <h4 class="text-animate secondary-font" in:textAnimate id="phase1_title4" gsap-duration="1.5">{processData.section8subheading ? processData.section8subheading : ''}</h4>
                <div in:fly id="phase1_sub4" gsap-duration="1" gsap-delay="0.5">
                    {@html processData.section8text ? processData.section8text : ''}
                </div>
            </div>  
            <div class="phase__grid__item last-even">
                <div in:fly id="phase1_cont4" gsap-duration="1.5" gsap-delay="0.8">
                    {@html processData.section8righttext ? processData.section8righttext : ''}
                </div>
            </div>                                 
        </div>        
   <!-- </Animate> -->
</section>

<!-- <Animate> -->
    <section class="phase-banner-separator image-scale-up" in:scaleUp id="phase_separator" gsap-duration="2" style="--phsSeparator: url({domain}{processData.section9image.data.attributes.formats.large ? processData.section9image.data.attributes.formats.large.url : processData.section9image.data.attributes.url })">
    </section>
    <!-- <div class="parallax-wrapper">
        <ParallaxImage imageHeight="100" imageUrl="{domain}{processData.section9image.data.attributes.formats.large ? processData.section9image.data.attributes.formats.large.url : processData.section9image.data.attributes.url }">
        </ParallaxImage> 
    </div> -->
<!-- </Animate> -->

<section class="phase-banner-paragraph">
    <!-- <Animate> -->
        <Container>
            <Row>
                <Col>
                    <div in:fly id="phase_separator_cont" gsap-duration="1">
                        {@html processData.section9text ? processData.section9text : ''}
                    </div>
                </Col>
            </Row>
        </Container>
    <!-- </Animate> -->
</section>

<!-- <Animate> -->
    <!-- <section class="phase2-img" in:fadeIn id="phase2_img1" gsap-duration="2" style="--phs2: url({domain}{processData.section10phase2image.data.attributes.formats.large_x2 ? processData.section10phase2image.data.attributes.formats.large_x2.url : processData.section10phase2image.data.attributes.url })"></section>  -->
    <div class="parallax-wrapper">
        <ParallaxImage imageHeight="70" imageUrl="{domain}{processData.section10phase2image.data.attributes.formats.large_x2 ? processData.section10phase2image.data.attributes.formats.large_x2.url : processData.section10phase2image.data.attributes.url }">
        </ParallaxImage> 
    </div>
<!-- </Animate> -->

<section class="phase">
    <!-- <Animate> -->
        <Container class="phase-container">
            <Row class="text-center phase__row">
                <Col xs="9" md="10">
                    <div class="phase__heading"><h3 class="text-animate" in:textAnimate id="phase2_heading" gsap-duration="1">{processData.section10phase2heading ? processData.section10phase2heading : ''}</h3></div>
                </Col>            
                <Col xs="3" md="2">
                    <span class="num" in:slide id="phase2_num" gsap-duration="2" gsap-x="15">2</span>
                </Col>
            </Row>
        </Container>
    <!-- </Animate> -->
    <!-- <Animate> -->
        <div class="phase__grid">
            <div class="phase__grid__item">
                <p class="pre-head" in:slide id="phase2_pre1" gsap-duration="1" gsap-x="-7">{processData.section11heading ? processData.section11heading : ''}</p>
                <h4 class="text-animate secondary-font" in:textAnimate id="phase2_title1" gsap-duration="1.5">{processData.section11subheading ? processData.section11subheading : ''}</h4>
                <div in:fly id="phase2_sub1" gsap-duration="1" gsap-delay="0.5">
                    {@html processData.section11text ? processData.section11text : ''}
                </div>
            </div>
            <div class="phase__grid__item">
                <div in:fly id="phase2_cont1" gsap-duration="1.5" gsap-delay="0.8">
                    {@html processData.section11righttext ? processData.section11righttext : ''}
                </div>
            </div>     
            <div class="phase__grid__item">
                <p class="pre-head" in:slide id="phase2_pre2" gsap-duration="1" gsap-x="-7">{processData.section12heading ? processData.section12heading : ''} </p>
                <h4 class="text-animate secondary-font" in:textAnimate id="phase2_title2" gsap-duration="1.5">{processData.section12subheading ? processData.section12subheading : ''}</h4>
                <div in:fly id="phase2_sub2" gsap-duration="1" gsap-delay="0.5">
                    {@html processData.section12text ? processData.section12text : ''}
                </div>
            </div>  
            <div class="phase__grid__item">
                <div in:fly id="phase2_cont2" gsap-duration="1.5" gsap-delay="0.8">
                    {@html processData.section12righttext ? processData.section12righttext : ''}
                </div>
            </div>  
            <div class="phase__grid__item">
                <p class="pre-head" in:slide id="phase2_pre3" gsap-duration="1" gsap-x="-7">{processData.section13heading ? processData.section13heading : ''}</p>
                <h4 class="text-animate secondary-font" in:textAnimate id="phase2_title3" gsap-duration="1.5">{processData.section13subheading ? processData.section13subheading : ''}</h4>
                <div in:fly id="phase2_sub3" gsap-duration="1" gsap-delay="0.5">
                    {@html processData.section13text ? processData.section13text : ''}
                </div>
            </div>  
            <div class="phase__grid__item last-even">
                <div in:fly id="phase2_cont3" gsap-duration="1.5" gsap-delay="0.8">
                    {@html processData.section13righttext ? processData.section13righttext : ''}
                </div>
            </div>                                            
        </div>    
    <!-- </Animate> -->
</section>
    <!-- <Animate>
        <div class="phase__banner banner2" style="--phs2Banner1: url({domain}{processData.section14image.data.attributes.url})">
        </div>   
    </Animate> -->
    <!-- <Animate>
        <div class="phase__grid scnd-row">
            <div class="phase__grid__item">
                <span>{processData.section15heading ? processData.section15heading : ''}</span>
                <h4>{processData.section15subheading ? processData.section15subheading : ''}</h4>
                {@html processData.section15text ? processData.section15text : ''}
            </div>
            <div class="phase__grid__item">
                {@html processData.section15righttext ? processData.section15righttext : '' }
            </div>     
            <div class="phase__grid__item">
                <span>{processData.section16heading ? processData.section16heading : ''}</span>
                <h4>{processData.section16subheading ? processData.section16subheading : ''}</h4>
                {@html processData.section16text ? processData.section16text : ''}
            </div>  
            <div class="phase__grid__item">
                {@html processData.section16righttext ? processData.section16righttext : '' }
            </div>         
            <div class="phase__grid__item">
                <span>{processData.section17heading ? processData.section17heading : ''}</span>
                <h4>{processData.section17subheading ? processData.section17subheading : ''}</h4>
                {@html processData.section17text ? processData.section17text : ''}
            </div>  
            <div class="phase__grid__item last-even">
                {@html processData.section17righttext ? processData.section17righttext : '' }
            </div>                                       
        </div>     
    </Animate> -->
    <!-- <Animate> -->
        <div class="phase__banner banner3 image-scale-up" in:scaleUp id="phase_separator1" gsap-duration="2" style="--phs2Banner2: url({domain}{processData.section18image.data.attributes.formats.large ? processData.section18image.data.attributes.formats.large.url : processData.section18image.data.attributes.url })">
        </div>   
        <!-- <div class="parallax-wrapper">
            <ParallaxImage imageHeight="100" imageUrl="{domain}{processData.section18image.data.attributes.formats.large ? processData.section18image.data.attributes.formats.large.url : processData.section18image.data.attributes.url }">
            </ParallaxImage> 
        </div> -->
    <!-- </Animate> -->
    <!-- <Animate>
        <div class="phase__grid scnd-row">
            <div class="phase__grid__item">
                <span>{processData.section19heading ? processData.section19heading : ''}</span>
                <h4>{processData.section19subheading ? processData.section19subheading : ''}</h4>
                {@html processData.section19text ? processData.section19text : ''}
            </div>
            <div class="phase__grid__item last-even">
                {@html processData.section19righttext ? processData.section19righttext : '' }
            </div>                                           
        </div>     
    </Animate> -->
<section class="phase-banner-paragraph">
    <!-- <Animate> -->
        <Container>
            <Row>
                <Col>
                    <div in:fly id="phase_separator_cont1" gsap-duration="1">
                        {@html processData.section20text ? processData.section20text : '' }
                    </div>
                </Col>
            </Row>
        </Container>
    <!-- </Animate> -->
</section>
<!-- <Animate> -->
    <Cta />
<!-- </Animate> -->
<style lang="scss">
    :global(p) {
        font-size: 1.125rem;
        line-height: 2rem;
    }
    section{
        min-height: 20vh;
    }
    .our-process{
        // min-height: 40vh;
        // min-height: 80rem;
		// display: flex;
		// align-items: center;
        // justify-content: center;
        // padding-top: 10rem;
        // padding-bottom: 10rem;
		// @include media-max(ipadmini){
		// 	min-height: unset;
        //     padding-top: unset;
        //     padding-bottom: unset;
        // }
        &__heading{
            margin-bottom: 7vh;
            :global(p span){
                color: $primary-color;
            }
            h2{
                font-size: 4rem;
                margin: 3rem 0 2rem;
                color: $secondary-color;
                justify-content: center;
            }
            p{
                span{
                    color: $primary-color;
                }
            }
        }
        img{
            margin-top: 1rem;
            height: auto;
            object-fit: cover;
        }
        &__paragraph{
            background-color: #F2F2F2;
            padding: 3rem;
            max-width: 40rem;
            margin-top: -5rem;
            z-index: 2;
            position: relative;
            :global(p) {
                font-size: 1.25rem;
            }
            @include media-max(sm){
                width: 85vw;
                font-size: 1.3rem;
                padding: 3rem 1.5rem;
                margin-top: -2rem;
            }
            p:last-child{
                margin-bottom: 0;
            }
        }
    }
    .phase-heading{
        background-color: #F2F2F2;
        padding: 3rem 0;
        :global(h3){
            @include media-max(sm){
                font-size: 1.688rem;
                width: 70%;
                margin: auto;
            }
            font-size: 2.25rem;
            :global(span) {
               font-family: $secondary-font;
               color: $secondary-color;
            }
        }
    }
    .phase1-img{
        background-image: var(--phs1);
        background-size: cover;
        height: 90vh;
               
        @include media-max(sm){
            height: 40vh;
        }          
    }
    .phase2-img{
        background-image: var(--phs2);
        background-size: cover;
        height: 90vh;
        @include media-min(sm){
            margin-top: 0;
        }                 
        @include media-max(sm){
            height: 40vh;
        }          
    }   
    
    :global(.phase) {
        @include media-max(laptopS){
            padding-left: 0; 
            padding-right: 0;
        }
    } 
    .phase{
        &.no-margin-top {
            margin-top: 0;
        }
        margin-bottom: 0;
        :global(.phase-container) {
            max-width: 95%;
        }
        @include media-max(ipadmini){
            padding-left: 0;
            padding-right: 0;
        }
        h3{
            font-weight: 400;
            @include media-max(sm){
                font-size: 1.2rem;
            }            
        }
        :global(h3) {
            font-size: 2.5rem;
        }
        :global(.phase__row){
            margin-top: -19.3rem;
            justify-content: center;
            align-items: center;
            position: relative;
            z-index: 1;
            @include media-max(ipadmini){
                margin-top: -15.5rem;
            }  
            @include media-max(sm){
                margin-top: -9.5rem;
            }               
        }
        .num{
            font-size: 20rem;
            font-family: $secondary-font;
            color: $darkbluegreen;
            display: block;  
            @include media-max(ipadmini){
                font-size: 15rem;
            }                  
            @include media-max(sm){
                font-size: 8rem;
            }              
        }
        &__heading{
            background-color: $darkbluegreen;
            padding: 1rem 0;
            width: 100%;
            margin-top: 1rem;
            @include media-max(ipadmini){
                padding: 1rem;
            }
            h3{
                text-transform: uppercase;
                font-family: $primary-font;
                color: #fff;
                margin-bottom: 0;
                justify-content: center;
            }
        }
        @include media-max(sm){
            &__heading{
                margin-bottom: 2rem;
            }
        }
        &__grid{
            display: grid;
            grid-template-columns: repeat(2, 1fr);     
            // margin-top: -10.960rem;
            margin-top: -14.5rem;
            width: 90%;
            margin-left: auto;
            @include media-max(laptopS){
                width: 100%; 
                margin-top: -12.5rem;               
            } 
            @include media-max(ipadmini){
                width: 100%;  
                margin-top: -8.5rem;                  
            }      
            @include media-max(sm){
                grid-template-columns: repeat(1, 1fr);
                width: 80%;
                margin: auto;
                margin-top: -3rem;  
            }            
            &__item{
                padding: 9vw 4vw 4vw;
                z-index: -1;
                @include media-max(sm){
                    padding: 1rem 0;
                }
                h4 {
                    font-size: 2.25rem;
                }
                &:nth-child(odd){
                    padding-left: 8vw;
                    line-height: 2;
                    font-style: italic;
                    @include media-max(sm){
                        padding: 6vw;
                        margin-left: calc(50% - 50vw);
                        margin-right: calc(50% - 50vw);                        
                    }                                 
                    .pre-head{
                        color: $primary-color;
                        font-style: normal;
                        font-size: 1.4em;
                        font-weight: 500;
                    }
                    h4{
                        margin: 2rem 0;
                        font-style: normal;
                        font-size: 2.813rem;
                    }
                    :global(p) {
                        font-size: 1.25rem;
                    }

                }
                &:nth-child(even){
                    padding-top: 18vw;
                    background-color: #F2F2F2;
                    display: flex;
                    align-items: flex-end;
                    flex-direction: column;
                    padding-right: 10vw;

                    :global(p:last-child){
                        margin-bottom: 0;                        
                    }

                    @include media-max(sm){
                        padding: 6vw;
                        margin-left: calc(50% - 50vw);
                        margin-right: calc(50% - 50vw);                        
                    }                    
                }
                &.last-even {
                    padding-bottom: 15vw;
                }
                
            }  
            @include media-max(sm){
                &__item{
                    padding: 6rem 1rem;
                } 
                }       
            &.scnd-row{
                margin-top: 0;
            }   
        }
        @include media-max(sm){
            &__grid{
                display: block;
            } 
        }   
        &__banner{
                background-image: var(--phs1Banner);
                background-size: cover;
                height: 90vh;
                margin: 0;
                &.banner2{
                    background-image: var(--phs2Banner1)
                }
                &.banner3{
                    background-image: var(--phs2Banner2)
                }            
                @include media-max(sm){
                    height: 40vh;
                }                    
        }           
    }
    .phase-banner-separator{
        background-image: var(--phsSeparator);
        background-size: cover;
        height: 90vh;       
        margin: 0; 
        @include media-max(sm){
            height: 40vh;
        }
    }
    .phase-banner-paragraph{
        display: block;
        margin-top: 0;
        background-color: #F2F2F2;
        @include media-max(sm){
            padding: 0 2.75rem;
            margin-left: calc(50% - 50vw);
            margin-right: calc(50% - 50vw);                        
        }   
        div{
            padding: 3rem 0;
            text-align: center;
            max-width: 70rem;
            margin: 0 auto;
            p{
                line-height: 2;
            }
        }
    }
    .phase1-img, .phase__banner, .phase2-img, .phase-banner-separator {
        @include media-max(laptopS){
            height: 70vh;
            background-position: center;
        }
        @include media-max(sm){
            height: 30vh;
        }
    }

    .parallax-wrapper {
        position: relative;
        overflow: hidden;

        @include media-max(ipadmini){
            :global(.parallax-container) {
                height: 25vh !important;
            }
        }

    }

    
    
</style>