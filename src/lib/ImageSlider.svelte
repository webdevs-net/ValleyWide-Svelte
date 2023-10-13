<script>
    import { writable } from 'svelte/store';
    import { fade } from 'svelte/transition';
    import { cubicOut } from 'svelte/easing';
  
    export let images = [];
    let activeIndex = writable(0);
    let autoSlideInterval = 3000; // Set the autoslide interval in milliseconds
  
    function changeImage(index) {
      activeIndex.set(index);
    }
  
    function nextImage() {
    activeIndex.update((currentIndex) => (currentIndex + 1) % images.length);
  }

  function previousImage() {
    activeIndex.update((currentIndex) =>
      (currentIndex - 1 + images.length) % images.length
    );
  }

    // Autoslide functionality
    setInterval(nextImage, autoSlideInterval);
  </script>
<div class="slider__container">
    {#each images as image, index (image)}
      {#if $activeIndex === index}
        <img
          src="{image}"
          alt=""
          class="slider__image"
          in:fade="{{ duration: 500, easing: cubicOut }}"
          out:fade="{{ duration: 500, easing: cubicOut }}"
          on:click={() => changeImage(index)}
        />
      {/if}
    {/each}
    <svg
      class="slider__arrow slider__arrow--left"
      viewBox="0 0 24 24"
      on:click={previousImage}
    >
      <path d="M15.41 7.41L14 6l-6 6 6 6 1.41-1.41L10.83 12z" />
    </svg>
    <svg
      class="slider__arrow slider__arrow--right"
      viewBox="0 0 24 24"
      on:click={nextImage}
    >
      <path d="M10 6L8.59 7.41 13.17 12l-4.58 4.59L10 18l6-6z" />
    </svg>
  </div>
    
  <div class="slider__thumbnail-container">
    <svg
      class="slider__arrow slider__arrow--left"
      viewBox="0 0 24 24"
      on:click={previousImage}
    >
      <path d="M15.41 7.41L14 6l-6 6 6 6 1.41-1.41L10.83 12z" />
    </svg>
    {#each images as image, index (image)}
      <img
        src="{image}"
        alt=""
        class="slider__thumbnail"
        on:click={() => changeImage(index)}
      />
    {/each}
    <svg
      class="slider__arrow slider__arrow--right"
      viewBox="0 0 24 24"
      on:click={nextImage}
    >
      <path d="M10 6L8.59 7.41 13.17 12l-4.58 4.59L10 18l6-6z" />
    </svg>
  </div>
<style lang="scss">
    .slider {
        &__container {
        position: relative;
        width: 100%;
        max-width: 100%; // Set the maximum width of the slider
        height: 450px; // Set the height of the slider
        display: flex;
        justify-content: center;
        align-items: center;
        overflow: hidden;
        }

        &__image {
        width: 100%;
        position: absolute;
        }

        &__thumbnail-container {
        display: flex;
        justify-content: center;
        align-items: center;
        margin-top: 10px;
        }

        &__thumbnail {
        cursor: pointer;
        width: 50px;
        height: 50px;
        margin: 0 5px;
        object-fit: cover;
        }

        &__arrow {
        cursor: pointer;
        position: absolute;
        top: 50%;
        transform: translateY(-50%);
        z-index: 1;
        width: 40px;
        height: 40px;
        fill: #fff;
        opacity: 0.7;
        &:hover {
            opacity: 1;
        }
        }

        &__arrow--left {
        left: 10px;
        }

        &__arrow--right {
        right: 10px;
        }
    }
</style>