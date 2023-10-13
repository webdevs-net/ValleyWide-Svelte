<script lang="ts">
    import { Col, Container, Row } from 'sveltestrap';
    import { paginate, LightPaginationNav } from 'svelte-paginate';
    import Cta from '$lib/components/layout/Cta.svelte';
    export let data;
    import blogempty from "$lib/img/blog-empty.svg";
	import PageBanner from '$lib/components/layout/PageBanner.svelte';
	import Animate from '$lib/components/Animate.svelte';
    import { PUBLIC_STRAPI_API } from '$env/static/public';
    import axios from "axios";
    // import { fade, fly } from 'svelte/transition';
    import { textAnimate, fly, fadeIn, slide } from '$lib/GsapAnimation.js';
    // let blogs = data.blogs.data;
    let url = "https://api.ulfbuilt.com";
    let title = data.page.data.attributes.title;
    let fallback = data.fallback.data.attributes.fallbackImage.data;
    // let items = blogs;
  let currentPage = 1;
  let pageSize = 5;
  let articleList = [];
  let categories = data.categories.data;
  let loadingArticle;
  
    // Date on click
    let activeDate = 'DESC'; // made newest/latest default on date filter
    function activeDateClick(datesort) { 
        activeDate = datesort;
    }

    // Category tab on click
    let activeCategoryTab = '';
    function activeCategoryTabClick(id) {
        activeCategoryTab = id;
    }

    // check if there is new value selected for either activeDate or activeCategoryTab, then run the fetch function
    $: if (activeDate || activeCategoryTab) { 
        loadingArticle = true; // to able to show loading text, if true show loading text
        (async () => {
            let apiUrl;
            if(activeCategoryTab || activeCategoryTab != '') { // if has activeCategoryTab, add it on the fetch url
                apiUrl = "https://api.ulfbuilt.com/api/blogs?sort[0]=createdAt:"+activeDate+"&filters[blog_category][id][$eq]="+activeCategoryTab+"&populate=deep";
            } else {
                apiUrl = "https://api.ulfbuilt.com/api/blogs?sort[0]=createdAt:"+activeDate+"&populate=deep";
            }
            const headers = {
                Authorization: 'Bearer ' + PUBLIC_STRAPI_API
            }  

            try {
                const response = await axios.get(apiUrl, { headers });
                loadingArticle = false;
                articleList = response.data.data;
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        })();
    }
    
    // variable for {#key} to check if has new data in either activeDate or activeCategoryTab, to recreate their contents 
    $: listener = {activeDate, activeCategoryTab};

    function scrollToTop() {
        const element = document.getElementById('articleblog');
        // element.scrollIntoView({
        //         behavior: 'smooth'
        // });
        const y = element.offsetTop + 1500;
        console.log(y);
        window.scrollTo({ top: y, behavior: 'smooth' });
    }

    import { onMount } from "svelte";
	import { loadingCursor } from '$lib/cursorChange.js';
	onMount(() => {
		loadingCursor();
	});


</script>
<svelte:head>
	<title>{title ? title : 'Articles & Press'}</title>
	<meta name="description" content="ULF BUILT" />
</svelte:head>

<PageBanner title="{data.page.data.attributes.title ? data.page.data.attributes.title : 'Articles & Press'}" extraClass="articles" subTitle="{data.page.data.attributes.Subheading ? data.page.data.attributes.Subheading : ''}"  banner="{url}{data.page.data.attributes.Cover.data[0].attributes.formats.large_x2.url ? data.page.data.attributes.Cover.data[0].attributes.formats.large_x2.url  : data.page.data.attributes.Cover.data[0].attributes.url}"/>
<section class="category">
    <!-- <Animate> -->
        <Container>
            <Row>
                <ul class="cat-list" in:slide id="article_cat" gsap-duration="1.5" gsap-x="-5">
                    <li>
                        <div class="category-list-content category-container">
                            <p class="category-list">CATEGORY</p>
                            <div class="category-list-dropdown dropdown-content">
                                {#each categories as category}
                                    <p class={activeCategoryTab === category.id ? 'selected' : ''} on:click="{() => activeCategoryTabClick(category.id)}">{category.attributes.name}</p>
                                {/each}
                                <p class={activeCategoryTab === '' ? 'selected' : ''} on:click="{() => activeCategoryTabClick('')}">Show All</p>
                            </div>
                    </div> |
                    <div class="category-date-content category-container">
                            <p class="category-date">DATE ADDED</p>
                            <div class="category-date-dropdown dropdown-content">
                                <p class={activeDate === 'DESC' ? 'selected' : ''} on:click="{() => activeDateClick('DESC')}">Latest</p>
                                <p class={activeDate === 'ASC' ? 'selected' : ''} on:click="{() => activeDateClick('ASC')}">Oldest</p>
                            </div>
                        </div>

                    </li>
                </ul>
            </Row>
        </Container>
    <!-- </Animate> -->
</section>
<section class="mw-1000 text-center article-section">
    <!-- <Animate> -->
        <Container>
            <h2 class="mb-2 text-center text-animate secondary-font" in:textAnimate id="article_heading" gsap-duration="0.5">{data.page.data.attributes.section2heading ? data.page.data.attributes.section2heading : ''}</h2>
            <p class="text-left" in:fly id="article_content" gsap-duration="1" gsap-delay="0.5">{@html data.page.data.attributes.section2description ? data.page.data.attributes.section2description : ''}</p>
        </Container>
    <!-- </Animate> -->
</section>
<section class="article-blog" id="articleblog">
<Container>
        {#key listener}
            {#if loadingArticle}  <!-- show load -->
              <div class="col text-center list-text-details">Loading...</div>
            {:else}
                {#if articleList.length == 0} 
                    <div class="col text-center list-text-details">No Articles Found...</div>
                {:else}
                {@const items = articleList}
                    <!-- Pagination -->
                    <LightPaginationNav
                    totalItems="{articleList.length}"
                    pageSize="{pageSize}"
                    currentPage="{currentPage}"
                    limit="{1}"
                    showStepOptions="{true}"
                    on:setPage="{(e) => currentPage = e.detail.page}"
                    />
                    <!-- End Pagination -->
                    <div class="mx-8"></div>
                    {#each paginate({ items, pageSize, currentPage }) as blog,i (blog.id)}
                        <Row class="{i%2 === 1 ? 'flex-md-row flex-column-reverse' : ''} blog-card">
                            <Col md="6" style="padding:0;" class="{i%2 === 1 ? 'order-1' : ''}">
                                <!-- <Animate> -->
                                    <div class="blogsection7 zoomImg">
                                        {#if blog.attributes.featuredimage.data != null}
                                            {#if blog.attributes.featuredimage.data.attributes.formats != null}
                                                <img in:fadeIn id="article_img{i}" gsap-duration="2" width="{blog.attributes.featuredimage.data.attributes.width}" height="{blog.attributes.featuredimage.data.attributes.height}" src="{blog.attributes.featuredimage.data.attributes.formats.large.url ? url+blog.attributes.featuredimage.data.attributes.formats.large.url : url+blog.attributes.featuredimage.data.attributes.url}" alt="{blog.attributes.title}" class="blog-img w-100">
                                            {:else}
                                                <img in:fadeIn id="article_img{i}" gsap-duration="2" alt="{blog.attributes.title}" src="{fallback ? url+fallback.attributes.url : blogempty}" class="blog-img w-100">
                                            {/if}
                                        {:else}
                                            <img in:fadeIn id="article_img{i}" gsap-duration="2" alt="{blog.attributes.title}" src="{fallback ? url+fallback.attributes.url : blogempty}" class="blog-img w-100">
                                        {/if}
                                    </div>
                                <!-- </Animate> -->
                            </Col>
                
                            <Col md="5">
                                <Animate>
                                    <div class="blogsection5">
                                        <div>
                                            <p class="pre-head" in:slide id="article_detail{i}" gsap-duration="1">{blog.attributes.location ? blog.attributes.location : 'Vail, Colorado'} | {new Date(Date.parse(blog.attributes.publishedAt)).toLocaleString('default', { month: 'long',  day: 'numeric' })} · {blog.attributes.minutesRead ? blog.attributes.minutesRead : '2'} {blog.attributes.minutesRead > '1' || !blog.attributes.minutesRead ? 'minutes' : 'minute'} read</p>
                                            <h2 class="text-animate secondary-font" in:textAnimate id="article_title{i}" gsap-duration="1.3">{blog.attributes.title}</h2>
                                            <p in:slide id="article_text{i}" gsap-duration="1" gsap-delay="1" gsap-y="20">{blog.attributes.shorttext}</p>
                                            <div in:fly id="article_btn{i}" gsap-duration="1" gsap-delay="1.3" gsap-y="20" >
                                             <a class="btn btn-secondary" href="/articles/{blog.attributes.slug}">Read more</a>
                                            </div>
                                        </div>
                                    </div>
                                </Animate>
                
                            </Col>
                            <!-- </a> -->
                    </Row>
                    <div class="mx-8"></div>
                    {/each}

                    <!-- Pagination -->
                    <LightPaginationNav
                    totalItems="{articleList.length}"
                    pageSize="{pageSize}"
                    currentPage="{currentPage}"
                    limit="{1}"
                    showStepOptions="{true}"
                    on:setPage="{(e) => {
                        scrollToTop(); // Scroll to the top after setting the new page
                        currentPage = e.detail.page;
                    }}"
                    />
                    <!-- End Pagination -->
                {/if}
            {/if}
        {/key}
    <div class="divider">
        <svg width="26" height="25" viewBox="0 0 26 25" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M12.9931 22.2157L3.45312 12.9257L12.9931 3.63574L22.5431 12.9257L12.9931 22.2157Z" stroke="#D8D7D7" stroke-width="2.5" stroke-miterlimit="10"/>
        </svg>
    </div>
</Container>
</section>
<Cta/>
<style lang="scss">
    :global(.banner.articles) {
        background-position: center !important;
    } 
     .mx-8{
        margin:6rem auto;
        @include media-max(md){
            margin:4rem auto;
        }
    }
    .category {
        min-height: 0;
        
        .cat-list{
            list-style: none;
            padding: 0;
            margin: 0;
            li{
                color: $darkgray;
                display: flex;
                align-items: center;
                .category-date-content {
                    &:hover {
                        .category-date {
                            color: $primary-color;
                        }
                        .category-date-dropdown {
                            display: block;
                        }
                    }
                }
                .category-list-content {
                    &:hover {
                        .category-list {
                            color: $primary-color;
                        }
                        .category-list-dropdown {
                            display: block;
                        }
                    }
                }
                .category-container {
                    p{
                        padding: 1rem 1rem;
                        text-decoration: none;
                        color: $darkgray;
                        font-weight: 400;
                        cursor: pointer;
                        margin-bottom: 0;
                    }
                    .dropdown-content {
                        display: none;
                        position: absolute;
                        background-color: #e9ebef;
                        min-width: 160px;
                        box-shadow: 0px 8px 16px 0px rgba(0,0,0,0.2);
                        z-index: 1;
                        p {
                            font-family: $primary-font;
                            font-feature-settings: 'pnum' on, 'lnum' on;
                            color: $primary-color;
                            &:hover, &.selected {
                                background-color: $secondary-color;
                                color: $white-color;
                            }
                        }
                    }
                }
            }
        }
    }
    .cover{
        h2{
            color: $white-color;
        }
    }
    .blog-img{
        min-height: 28rem;
        max-height: 28rem;
        object-fit:cover;
        -o-object-fit: cover;
        @include media-max(sm){
            min-height: 10rem;
            max-height: 18rem;
        }

    }
    .blogsection7{
        border-radius: 0.625rem;
        overflow: hidden;
    }
    .blogsection5{
        background-color: #e9ebef;
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        height: 100%;
        padding: 3rem;
        @include media-max(sm){
            padding: 2rem;
            text-align: center;
        }
        div {
            @include media-max(sm){
                display: flex;
                flex-direction: column;
                align-items: center;
            } 
        }
        .pre-head {
            font-feature-settings: 'pnum' on, 'lnum' on;
            font-weight: 600;
            @include media-max(sm){
                order: 2;
                margin: 1.688rem 0;
            } 
        }
        h2{
            display: block;
            text-overflow: ellipsis;
            word-wrap: break-word;
            overflow: hidden;
            max-height: 7.2rem;
            font-size: 2.25rem;
            line-height: 2.5rem;
            margin-top: 1rem;
            color: $secondary-color;
            margin-bottom: 1.5rem;
            @include media-max(sm){
                order: 1;
            } 
        }
        p{
            display: block;
            text-overflow: ellipsis;
            word-wrap: break-word;
            overflow: hidden;
            max-height: 3.1em;
            font-size: 1.25rem;
            line-height: 2.125rem;
            margin-bottom: 1.5rem;
            @include media-max(sm){
                order: 3;
            } 
        }
        .btn {
           padding: 0.7rem 3rem;
           @include media-max(sm){
                border-radius: 8px;
                order: 4;
                font-size: 1.188rem;
                padding: 1rem 3rem;
                margin-top: 1.125rem;
            }
        }
    }
    .article-section{
        h2 {
            color: $secondary-color;
            justify-content: center;
        }
        padding: 0 0 1rem 0;
        min-height: 15vh;
        @include media-max(lg){
            min-height: 0;
        }
        @include media-max(sm){
            padding: 0 0 0 0;
            display: none;
        }
    }
    .cat-select,.cat-select:focus,.cat-select:focus-visible{
        border: 0;
        margin: 0 1rem;
    }
    // .h2 {
    //     font-size: 3rem;
    //     color: $secondary-color;
    // }
    :global(.article-blog){
        margin-top: 1.5rem;
        position: relative;
        :global(.col-md-5){
            padding: 1.25rem 0px;
            @include media-max(sm){
                padding: 0 0.625rem;
            }
        }
        .list-text-details {
            position: absolute;
            top: -5rem;
            left: 50%;
            -webkit-transform: translateX(-50%);
            transform: translateX(-50%);
        }
        .divider {
            text-align: center;
            margin-top: 7rem;
            display: flex;
            gap: 10px;
            align-items: center;
            justify-content: center;
            &:before, &:after {
                content: '';
                border-top: 2.5px solid $gray;
                width: 40%;
                display: block;
            }
        }
    }
    @include media-max(md){
        :global(.mt-3){
            margin-top: 2rem!important;
        }
    }
    @include media-max(sm){
        :global(.mt-3){
            margin-top: 2rem!important;
        }
        :global(.btn){
            padding: 0.7rem 2.4rem;
        }
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
    :global(.blog-card) {
        align-items: center;
        justify-content: center;
    }
</style>