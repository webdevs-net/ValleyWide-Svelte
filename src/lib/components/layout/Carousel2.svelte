<script>
  import { textAnimate, slide, fly } from '$lib/GsapAnimation.js';
  import leftar from '$lib/img/left-ar.svg';
  import rightar from '$lib/img/right-ar.svg';
  import {Col} from 'sveltestrap';

  const domain = "https://api.ulfbuilt.com"
  export let preHeading; 
  export let heading; 
  export let btnTitle;
  export let btnUrl;
  export let featuredProjects;
      
  function nextslide() {
      const container = document.querySelector('.slider-container');
      container.style.transition = 'transform 0.5s ease-in-out';
      container.style.transform = 'translateX(-424px)';
      console.log();
      setTimeout(() => {
          const firstDiv = container.firstElementChild; // Get the first div element
          container.appendChild(firstDiv);
          container.style.transition = 'none';
          container.style.transform = 'translateX(0px)';
      }, 500);
  }
  function prevslide() {
      const container = document.querySelector('.slider-container');
      container.style.transform = 'translateX(-424px)';
      container.style.transition = 'none';
      const lastDiv = container.lastElementChild;
      container.insertBefore(lastDiv, container?.firstElementChild);
      setTimeout(() => {
          container.style.transition = 'transform 0.5s ease-in-out';
          container.style.transform = 'translateX(0px)';
      }, 10);
  }

let isDragging = false;
let startX = 0;
let initialLeft = 0;
let startt = 0;
let endt = 0;

function handleStart(event) {

  const anchors = document.querySelectorAll('.zoomImg');
  anchors.forEach(anchor => {
  anchor.addEventListener('click', preventAnchorClick, { once: true });
  });

  const container = document.querySelector('.slider-container');
  // const lastDiv = container.lastElementChild;
  // container.style.transition = 'transform 0s ease-in-out';
  // container.style.transform = 'translateX(-424px)';
  // container.insertBefore(lastDiv, container?.firstElementChild);

  startt = event.clientX;
  isDragging = true;
  if (event.touches) {
    startX = event.touches[0].clientX - initialLeft;
    // console.log("start>event-touch");
  } else {
    startX = event.clientX - initialLeft;
    // console.log("start>event");
  }
}

function handleMove(event) {


  if (isDragging) {
    let clientX;
    if (event.touches) {
      clientX = event.touches[0].clientX;
    } else {
      clientX = event.clientX;
    }

    //This is moving touch or movement
    const newX = clientX - startX;
    const container = document.querySelector('.slider-container');
    container.style.transform = 'translateX('+newX+'px)';


      var style = window.getComputedStyle(container);
      var matrix = new WebKitCSSMatrix(style.transform);
      // console.log('translateX: ', matrix.m41);
    if(startX > clientX){
      //2341 -- 3412
      //if start of drag point is bigger than client than it considered as swipe right to left or swipe left or previous
      if(matrix.m41 == -424 ){
          const firstDiv = container.firstElementChild; // Get the first div element
          container.appendChild(firstDiv);
          container.style.transition = 'none';
          container.style.transform = 'translateX(0px)';

        // console.log("previous2");
      }
      // console.log("previous");
    }
    if(clientX > startX){
      //4123 -- 3412
      //if start of client point is bigger than start point than it considered as swipe left to right or swipe right
      // console.log("next");
    }
  
    if(matrix.m41 == 1){
          const lastDiv = container.lastElementChild;
          container.style.transition = 'transform 0s ease-in-out';
          container.style.transform = 'translateX(-424px)';
          container.insertBefore(lastDiv, container?.firstElementChild);
          console.log(matrix.m41);
      }


    // const carousel = document.querySelector('.carousel');
    // carousel.style.left = newX + 'px';
    // console.log(newX +" "+ newX2);
  }
}

function handleEnd(event) {

    let clientX;
    if (event.touches) {
      clientX = event.touches[0].clientX;
    } else {
      clientX = event.clientX;
    }
    const container = document.querySelector('.slider-container');
      // if(startX > clientX){
      //   // 2341
      //   console.log("this one");
      //     container.style.transition = 'transform 0.5s ease-in-out';
      //     container.style.transform = 'translateX(-424px)';
          
      //     setTimeout(() => {
      //       console.log("executed");
      //       const firstDiv = container.firstElementChild;
      //       container.appendChild(firstDiv);
      //       container.style.transition = 'none';
      //       container.style.transform = 'translateX(0px)';
      //     }, 5000);
      // }
      // if(clientX > startX){
      //   container.style.transition = 'transform 0.5s ease-in-out';
      //   container.style.transform = 'translateX(0px)';
      // }
         container.style.transition = 'transform 0.5s ease-in-out';
        container.style.transform = 'translateX(0px)';
      console.log(" C" + clientX + " S" + startX);


  if (isDragging) {
    isDragging = false;
  }
}

function preventAnchorClick(event) {
  event.preventDefault();
  console.log('Anchor click prevented');
}
</script>
<Col md="3">
  <div class="slider-caption">
    <div class="slider-caption__heading">
      <p in:slide id="carousel-preheading" gsap-duration="1.5">{preHeading ? preHeading : ''}</p>
      <h2 class="text-animate secondary-font" in:textAnimate gsap-duration="1.5" id="carousel-heading">{heading ? heading : ''}</h2>
    </div>
  <!-- {#if controls} -->
  <div class="left-right desktop">
      <button class="left" on:click={prevslide}>
          <img src="{leftar}">
      </button>
      <button class="right" on:click={nextslide}>
          <img src="{rightar}">
      </button>
  </div>
  </div>
</Col>
<Col md=9 class="carousel-section" style="overflow: hidden;padding-left:0px;position: relative;height: 40rem;">
<div class="carousel" style="position:absolute;left:0;top:0;">
<div class="slides" in:fly id="carousel-image-container" gsap-duration="1" gsap-y="10" gsap-start="top center"
  on:mousedown={handleStart}
  on:mousemove={handleMove}
  on:mouseup={handleEnd}
  on:touchstart={handleStart}
  on:touchmove={handleMove}
  on:touchend={handleEnd}>
          <div class="slider-container">
          {#each featuredProjects.data as project, index}
          <div class="slider-container__carousel-cell" id="carousel-item">
            <a href="/portfolio/{project.attributes.slug ? project.attributes.slug : '#'}" data-sveltekit-reload class="zoomImg" draggable="false">
              {#if project.attributes.featuredImage.data != null}
                <img draggable="false" src="{domain}{project.attributes.featuredImage.data.attributes.formats.large.url ? project.attributes.featuredImage.data.attributes.formats.large.url : project.attributes.featuredImage.data.attributes.url}" alt="{project.attributes.featuredImage.data.attributes.alternativeText}" />
              {:else}
              {#await promise}
              {:then fallback} 
                <img src="{fallback ? domain+fallback.attributes.url : noFeatured}" alt="{project.attributes.title}"  draggable="false">
              {/await}
              {/if}
              <div class="slider-container__carousel-cell__text">
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
</div>
</div>
</Col>
<div class="slider-caption">
<div class="left-right mobile">
<button class="left" on:click={prevslide}>
    <img src="{leftar}">
</button>
<button class="right" on:click={nextslide}>
    <img src="{rightar}">
</button>
</div>
</div>

<style lang="scss">
:global(.transition-left) {
  transform: translateX(-424px) !important; /* Adjust the value as needed */
  transition-duration: 0.5s;
}
:global(.transition-left-no-dur) {
  transform: translateX(-424px) !important; /* Adjust the value as needed */
}
:global(.transition-right) {
  transform: translateX(424px) !important; /* Adjust the value as needed */
  transition-duration: 0.5s;
}
  .slides{
      :global(div){
          min-width:300px;
      }
  }
.left-right{
  display: inline-flex;
  box-shadow: 0 0 5px #aaa;
  border-radius: 40px;
  background-color: $white-color;
}
.desktop{
@include media-max(sm){
  display: none;
}
}
.mobile{
display: none;
@include media-max(sm){
  display: flex;
}
}
.left-right.mobile{
align-self: center;
margin: 40px 0;
}
.left, .right{
  border: 0px;
  padding: 1.25rem;
  background-color: transparent;
  margin: 0px;
}
.left-right img{
  height: 30px;
}
  
.slider-caption{
  height: 100%;
  // display: flex;
  // align-items: center;
  // flex-wrap: wrap;  
  display: flex;
  align-items: flex-start;
  flex-direction: column;
  gap: 5rem;
  &__heading{
    margin-top: 5rem;
    margin-bottom: 1rem;
    width: 100%;
    @include media-max(sm){
        text-align: center;
        margin-top: 0;
        margin-bottom: 3rem;
    }    
    p{
      font-size: 1.5rem;
      margin-bottom: 1rem;
      color: $primary-color;
      font-weight: 500;
    }
    h2{
      // flex-wrap: wrap;
      // width: 18rem;
      @include media-max(ipadmini){
          line-height: 2rem;
      }    
    }
  }
}

.slider-container {
  -moz-user-select: -moz-none;
  -khtml-user-select: none;
  -webkit-user-select: none;
  -ms-user-select: none;
  user-select: none;
  width: 2000px;
  transition-property: transform; /* Specify the property to transition */
  transition-timing-function: ease-in-out;
  position: relative;
  user-drag: none;
  cursor: grab;
white-space: nowrap;
&__carousel-cell {
  max-width: 25rem;
  position: relative;
  margin-right: 1.5rem;
  box-sizing: border-box;
  height: 32rem;
  overflow: hidden;
  display: inline-block;
  &:hover{
      .slider-container__carousel-cell__text{
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
  @include media-max(ipadmini){
    height: 50vh;
  }   
  @include media-max(sm){
    height: 50vh;
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
        display: flex;
        align-items: center;
          @include media-max(sm){
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
                  // font-size: 0.6rem;
              }                
          }
          i{
            position: absolute;
            top: 20%;
            right: 1rem;
          }
  }      
  img {
    display: block;
    // width: auto;
    object-fit: cover;
    height: 100%;
  }
}
}


// .slider-btn{
//   margin: 3rem 5rem 0;
//   text-align: right;
//   height: 0;
//   @include media-max(sm){
//     text-align: center;
//     margin: 2rem 0 0;
//   }
// }

// .progress-ring-container {
//   margin-top: 1rem;
//   position: relative;
//   bottom: 10px;
//   left: 10px;
//   z-index: 1;
//   box-shadow: 0px 4px 5px rgba(0, 0, 0, 0.15);
//   display: inline-block;
//   border-radius: 2rem;  
//   @include media-max(sm){
//     margin-top: 3rem;
//     left: 0;
//   }
// }

// .progress-ring {
//   &__border {
//     transition: stroke-dashoffset 0.5s ease-out;
//   }

//   &__arrow {
//     font-family: Arial, sans-serif;
//     cursor: pointer;
//     user-select: none;
//     fill: $primary-color;

//     &--left,
//     &--right {
//       // Add any common styles for left and right arrows here
//     }

//     &--left {
//       // Add any specific styles for left arrow here
//     }

//     &--right {
//       // Add any specific styles for right arrow here
//     }
//   }
// }


</style>