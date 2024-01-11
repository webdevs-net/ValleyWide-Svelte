<script>
    import { onMount } from 'svelte';

    export let src = '';
    export let alt = '';
    export let className = '';
    export let width = 'auto';
    export let height = 'auto';

    let img;
    let observer;

    onMount(() => {
        observer = new IntersectionObserver(
        (entries) => {
            entries.forEach((entry) => {
            if (entry.isIntersecting) {
                img.src = src;
                observer.unobserve(img);
            }
            });
        },
        {
            threshold: 0,
            rootMargin: '0px 0px 200px 0px',
        }
        );

        observer.observe(img);

        return () => {
        if (observer) observer.disconnect();
        };
    });
</script>

<img loading="lazy" {alt} bind:this={img} class="{className}" />  