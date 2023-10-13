<script>
    import { onMount } from "svelte";
    import { fade, fly } from 'svelte/transition';     
    export let text;
    export let transitionDelay;
    import {expoInOut, quadInOut, sineInOut} from 'svelte/easing';


    const splitText = text.split("");		


    </script>

    {#each splitText as letter, i}
        {#if letter != " "}
            <span in:fly={{ 
                delay: i * 100,
                y: -50,
                x: 0,
                easing: quadInOut,
                duration: 700,
                }} style="display: inline-block;">{letter}</span>
        {:else}
            &nbsp;
        {/if}
    {/each}
