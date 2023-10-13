<script>
    import { onMount } from 'svelte';
    import {gsap}  from "gsap/dist/gsap";        
    import {ScrollTrigger} from "gsap/dist/ScrollTrigger";   
    import {ScrollSmoother} from "gsap/dist/ScrollSmoother"; 
    import {ScrollToPlugin} from "gsap/dist/ScrollToPlugin"; 
    let smoothValue;
    
    gsap.registerPlugin(ScrollTrigger, ScrollSmoother, ScrollToPlugin);

    onMount(() => {

      if(window.innerWidth <= 768) {
        smoothValue = 0;
      } else {
        smoothValue = 2;
      }

      const smoother = ScrollSmoother.create({
        wrapper: "#wrapper",
        content: "#content",
        smooth: smoothValue,
        effects: true,
        normalizeScroll: true,
        smoothTouch: 1.5, 
        // speed: 0.2, // speed for the whole page scrolling
      });

      // auto scroll

      // setTimeout(() => {
      //   let sections = gsap.utils.toArray("section");
        
      //   sections.forEach((section, i) => {

      //     // Calculate the index of the next section
      //     const nextSectionIndex = i + 1;

      //     if (nextSectionIndex < sections.length) {  // Check if there is a next section

      //       const nextSection = sections[nextSectionIndex];

      //       if(!section.classList.contains("autoscroll-exception")) { // if section is not exluded on the adding of scroll trigger auto scroll
             
      //         ScrollTrigger.create({
      //           trigger: section,
      //           start: "top bottom",
      //           end: "60% 30%",
      //           markers: true,
      //           onLeave: () => {
      //             console.log('Leaving section:', section.id);
      //             console.log('Scrolling to next section:', nextSection.id);
      //             // smoother.scrollTo("#"+nextSection.id, true, "top 10vw");

      //             // gsap.to(smoother, {
      //             //   // don't let it go beyond the maximum scrollable area
      //             //   scrollTop: Math.min(ScrollTrigger.maxScroll(window), smoother.offset("#"+nextSection.id, 'top 10vw')),
      //             //   duration: 2
      //             // });
      //             gsap.to(window, {
      //               duration: 2, 
      //               scrollTo: {
      //                 y: "#"+nextSection.id, 
      //                 offsetY: 50,
      //                 autoKill: true
      //               }
      //             });

      //             // disable
      //             // window.addEventListener('wheel', { passive: false });

      //             // setTimeout(() => {
      //             //   console.log('re enable scroll');
      //             // },2000)
      //           },
      //         });

      //       } 

      //     }
          
      //   });
      // }, 1000);

    });

  </script>
  
  <style>
    /* Add global styles for your layout here */
  </style>
  

  <div id="wrapper">
    <div id="content">
      <!-- Your common layout elements go here -->
        <slot />
    </div>
  </div>