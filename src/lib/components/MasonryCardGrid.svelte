<script lang="ts">
    import { fly, fade } from "svelte/transition";
    // import { MasonryGrid } from "@egjs/svelte-grid";
    import { PUBLIC_STRAPI_API } from '$env/static/public';
    import { onMount } from 'svelte'
    import noFeatured from "$lib/img/blog-empty.svg"
    import Animate from "./Animate.svelte";
    // const gap = 5;
    // const defaultDirection = "end";
    // const align = "end";
    // const column = 3;
    // const columnSize = 0;
    // const columnSizeRatio = 0;
    import axios from "axios";
    export let id;
    let projects;
    let duration = 1500;
    const cache = new Map();
    
    
    export let propCount;
    let promise = fetchPortfolios();
    async function fetchPortfolios(){
        const url = "https://api.ulfbuilt.com/api/portfolios?filters[categories][id][$eq]="+id+"&populate=deep,2";
        const headers = {
            Authorization: 'Bearer ' + PUBLIC_STRAPI_API
        }  

        try {
            const response = await axios.get(url, { headers });
            return response.data.data;
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    }

    $: if (id) {
        promise = fetchPortfolios();
    }

    onMount(() => {
        promise = fetchPortfolios();
    })
    
    </script>
    
    {#await promise}
    <div class="col text-center">Loading...</div>
    {:then portfolios}
        <div class="container masonry_container">       
            {#each portfolios as project, index}				
                {#if index < propCount}
                <div class="masonry-items" in:fly="{{ y: 0, duration: 1000, delay:index * 1500}}" out:fly="{{y:0, duration:1000 }}">       
                    <a data-sveltekit-reload href="/portfolio/{project.attributes.slug}" class="zoomImg">      
                        {#if project.attributes.featuredImage.data != null}
                        <img src="https://api.ulfbuilt.com/{project.attributes.featuredImage.data.attributes.url}" alt="{project.attributes.title}" >   
                        {:else}
                        <img src="{noFeatured}" alt="{project.attributes.title}" >
                        {/if}
                        <!-- <div class="masonry-items__text">
                            <span>{index + 1}</span>
                            {project.attributes.title}
                        </div> -->
                    </a>
                </div>	                    
                {/if}				
            {/each}
        </div>
    {/await}   

    <style lang="scss">
        .container {
        overflow: hidden;
        }    
        // :global(.masonry_container) {
        //     max-width: 1440px;
        // }
        .loading{
            width: 100%;
            text-align: center;
        }
        .masonry_container {
            display: flex;
            .masonry-items{
                width: 33%;   
                overflow: hidden;
                display: grid;
                grid-template-rows: 1fr auto;
                break-inside: avoid;
                // position: absolute;
                color: white;
                text-align: center;  
                height: 55vh;
                @include media-max(ipadmini){
                    height: 20vh;
                }
                @include media-max(sm){
                    height: 20vh;
                }
                a{
                    display: block;
                    height: 100%;
                    width: 100%;
                    margin: 0 1.125rem;
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
    </style>
    