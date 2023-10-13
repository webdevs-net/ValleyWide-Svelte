// To use: 
// Import the needed animation functions
// Use the function by adding it on element with 'in' attribute e.g in:textAnimate
// NOTE: Need to always add ID on the element you want to animate - to be specific on the element

// Dynamic attributes
// Add 'gsap-delay' on the element to add delay in seconds. e.g gsap-delay="1" (1s delay)
// Add 'gsap-duration' on the element to add duration in seconds. e.g gsap-duration="1" (1s duration)
// Add 'gsap-y' on the element to add starting position of fly in
// Add 'gsap-x' on the element to add starting position of slide in
// Add 'gsap-start' on the element to specify trigger point of scroll trigger

import {gsap}  from "gsap/dist/gsap";        
import {ScrollTrigger} from "gsap/dist/ScrollTrigger";   
import {SplitText} from "gsap/dist/SplitText";   
import {Observer} from "gsap/dist/Observer";   
// import {ScrollSmoother} from "gsap/dist/ScrollSmoother";   

gsap.registerPlugin(ScrollTrigger, SplitText, Observer);

// Default Values

const delayDefault = '0';
const durationDefault = '0.5';
const flyY = '70';
const slideX = '7';
const startDefault = "top bottom"; // start default for other animations

let mm = gsap.matchMedia();

// FadeIn

export function fadeIn(node) {

    const targetElement = node; // target element
    const targetElementID = targetElement.id;
    const delay = targetElement.getAttribute("gsap-delay") ? targetElement.getAttribute("gsap-delay") : delayDefault;
    const duration = targetElement.getAttribute("gsap-duration") ? targetElement.getAttribute("gsap-duration") : durationDefault;
    const start = targetElement.getAttribute("gsap-start") ? targetElement.getAttribute("gsap-start") : startDefault;
    targetElement.style.opacity = '0';
    
    // FadeIn animation
    mm.add("(min-width: 769px)", () => {
        ScrollTrigger.create({
            trigger: '#' + targetElementID,
            start: start,
            once: true,
            // markers: true,
            onEnter: function() { 
                const tl = gsap.timeline();
                tl.set(
                    '#' + targetElementID,
                    {
                        opacity: 0,
                    }
                );

                tl.to(
                    '#' + targetElementID,
                    {
                        duration: duration,
                        opacity: 1,
                        delay: delay,
                    }
                );
            }
        });
    });

    mm.add("(max-width: 768px)", () => { // default start on tablet and below
        ScrollTrigger.create({
            trigger: '#' + targetElementID,
            start: startDefault,
            once: true,
            // markers: true,
            onEnter: function() { 
                const tl = gsap.timeline();
                tl.set(
                    '#' + targetElementID,
                    {
                        opacity: 0,
                    }
                );

                tl.to(
                    '#' + targetElementID,
                    {
                        duration: duration,
                        opacity: 1,
                        delay: delay,
                    }
                );
            }
        });
    });

}

// fadeOut

export function fadeOut(node) {

    const targetElement = node; // target element
    const targetElementID = targetElement.id;
    const delay = targetElement.getAttribute("gsap-delay") ? targetElement.getAttribute("gsap-delay") : delayDefault;
    const duration = targetElement.getAttribute("gsap-duration") ? targetElement.getAttribute("gsap-duration") : durationDefault;
    const start = targetElement.getAttribute("gsap-start") ? targetElement.getAttribute("gsap-start") : startDefault;
    
    // fadeOut animation
    ScrollTrigger.create({
        trigger: '#' + targetElementID,
        start: start,
        once: true,
        // markers: true,
        onEnter: function() { 
            const tl = gsap.timeline();
            tl.set(
                '#' + targetElementID,
                {
                    opacity: 1,
                }
            );

            tl.to(
                '#' + targetElementID,
                {
                    duration: duration,
                    opacity: 0,
                    delay: delay,
                }
            );
        }
    });

}

// Fly

export function fly(node) {

    const targetElement = node; // target element
    const targetElementID = targetElement.id;
    const delay = targetElement.getAttribute("gsap-delay") ? targetElement.getAttribute("gsap-delay") : delayDefault;
    const duration = targetElement.getAttribute("gsap-duration") ? targetElement.getAttribute("gsap-duration") : durationDefault;
    const y = targetElement.getAttribute("gsap-y") ? targetElement.getAttribute("gsap-y") : flyY;
    const endY = targetElement.getAttribute("gsap-endY") ? targetElement.getAttribute("gsap-endY") : 0;
    const element_opacity = targetElement.getAttribute("gsap-opacity") ? targetElement.getAttribute("gsap-opacity") : 0;
    const start = targetElement.getAttribute("gsap-start") ? targetElement.getAttribute("gsap-start") : startDefault;
    targetElement.style.opacity = element_opacity;

    // Fly animation
    mm.add("(min-width: 769px)", () => {
        ScrollTrigger.create({
            trigger: '#' + targetElementID,
            start: start,
            once: true,
            // markers: true,
            onEnter: function() { 
                const tl = gsap.timeline();
                tl.set(
                    '#' + targetElementID,
                    {
                        opacity: element_opacity,
                        yPercent: y,
                    }
                );
                tl.to(
                    '#' + targetElementID,
                    {
                        duration: duration,
                        opacity: 1,
                        yPercent: endY,
                        delay: delay,
                    }
                );
            }, 
        })
    })

    mm.add("(max-width: 768px)", () => { // default start on tablet and below
        ScrollTrigger.create({
            trigger: '#' + targetElementID,
            start: startDefault,
            once: true,
            // markers: true,
            onEnter: function() { 
                const tl = gsap.timeline();
                tl.set(
                    '#' + targetElementID,
                    {
                        opacity: element_opacity,
                        yPercent: 30,
                    }
                );
                tl.to(
                    '#' + targetElementID,
                    {
                        duration: duration,
                        opacity: 1,
                        yPercent: 0,
                        delay: delay,
                    }
                );
            }, 
        })
    })
}


// Slide

export function slide(node) {

    const targetElement = node; // target element
    const targetElementID = targetElement.id;
    const delay = targetElement.getAttribute("gsap-delay") ? targetElement.getAttribute("gsap-delay") : delayDefault;
    const duration = targetElement.getAttribute("gsap-duration") ? targetElement.getAttribute("gsap-duration") : durationDefault;
    const x = targetElement.getAttribute("gsap-x") ? targetElement.getAttribute("gsap-x") : slideX;
    const start = targetElement.getAttribute("gsap-start") ? targetElement.getAttribute("gsap-start") : startDefault;
    targetElement.style.opacity = '0';

    // slide animation
    mm.add("(min-width: 769px)", () => {
        ScrollTrigger.create({
            trigger: '#' + targetElementID,
            start: start,
            once: true,
            // markers: true,
            onEnter: function() { 
                const tl = gsap.timeline();
                tl.set(
                    '#' + targetElementID,
                    {
                        opacity: 0,
                        xPercent: x,
                    }
                );
                tl.to(
                    '#' + targetElementID,
                    {
                        duration: duration,
                        xPercent: 0,
                        opacity: 1,
                        delay: delay,
                    }
                ); 
            },
        });
    });

    mm.add("(max-width: 768px)", () => { // default start on tablet and below
        ScrollTrigger.create({
            trigger: '#' + targetElementID,
            start: startDefault,
            once: true,
            // markers: true,
            onEnter: function() { 
                const tl = gsap.timeline();
                tl.set(
                    '#' + targetElementID,
                    {
                        opacity: 0,
                        xPercent: x,
                    }
                );
                tl.to(
                    '#' + targetElementID,
                    {
                        duration: duration,
                        xPercent: 0,
                        opacity: 1,
                        delay: delay,
                    }
                ); 
            },
        });
    });
}

// Text Animate
// Add text-animate class on the element

export function textAnimate(node) {

    const targetElement = node; // target element
    const targetElementID = targetElement.id;
    const delay = targetElement.getAttribute("gsap-delay") ? targetElement.getAttribute("gsap-delay") : delayDefault;
    const duration = targetElement.getAttribute("gsap-duration") ? targetElement.getAttribute("gsap-duration") : durationDefault;
    const start = targetElement.getAttribute("gsap-start") ? targetElement.getAttribute("gsap-start") : startDefault;
    targetElement.style.opacity = '0';

    // Split text
    const text = targetElement.textContent;
    const charSplit = text.split('');
    let currentDiv = '';
    let transformedHTML = '';
    charSplit.forEach((c, index) => {
        currentDiv += `<span class="letter">${c === ' ' ? '&nbsp;' : c}</span>`;
      
        if (c === ' ' || index === charSplit.length - 1) {
          if (currentDiv.trim() !== '') {
            transformedHTML += `<span>${currentDiv}</span>`;
          } else {
            transformedHTML += currentDiv; // Preserve the space as it is
          }
          currentDiv = ''; // Reset currentDiv for the next group
        }
      });
    targetElement.innerHTML = transformedHTML;

    // Text animation
    mm.add("(min-width: 769px)", () => {
        ScrollTrigger.create({
            trigger: '#' + targetElementID,
            start: start,
            once: true,
            // markers: true,
            onEnter: function() { 
                const tl = gsap.timeline();
                let letter = targetElement.querySelectorAll('span.letter');
                
                tl.set(
                    '#' + targetElementID,
                    {
                        autoAlpha: 1,
                    }
                );

                tl.set(
                    letter, 
                    {
                        yPercent: 100,
                        opacity: 0,
                    }
                );

                tl.to(
                    letter,
                    {
                        duration: duration,
                        yPercent: 0,
                        opacity: 1,
                        stagger: 0.05,
                        delay: delay,
                        ease: "back"
                    }
                );
            },
        });
    });

    mm.add("(max-width: 768px)", () => { // default start on tablet and below
        ScrollTrigger.create({
            trigger: '#' + targetElementID,
            start: startDefault,
            once: true,
            // markers: true,
            onEnter: function() { 
                const tl = gsap.timeline();
                let letter = targetElement.querySelectorAll('span.letter');
                
                tl.set(
                    '#' + targetElementID,
                    {
                        autoAlpha: 1,
                    }
                );

                tl.set(
                    letter, 
                    {
                        yPercent: 100,
                        opacity: 0,
                    }
                );

                tl.to(
                    letter,
                    {
                        duration: duration,
                        yPercent: 0,
                        opacity: 1,
                        stagger: 0.05,
                        delay: delay,
                        ease: "back"
                    }
                );
            },
        });
    });

}

// Written by parth
// for minus scroll animation where section is going upwards

// Image scaleUp

export function scaleUp(node) {

    const targetElement = node; // target element
    const targetElementID = targetElement.id;
    const delay = targetElement.getAttribute("gsap-delay") ? targetElement.getAttribute("gsap-delay") : delayDefault;
    const duration = targetElement.getAttribute("gsap-duration") ? targetElement.getAttribute("gsap-duration") : durationDefault;
    const start = targetElement.getAttribute("gsap-start") ? targetElement.getAttribute("gsap-start") : startDefault;
    // scaleUp animation

    ScrollTrigger.create({
        trigger: '#' + targetElementID,
        start: start,
        // once: true,
        // markers: true,
        onEnter: function() { 
            const tl = gsap.timeline();
            tl.to(
                '#' + targetElementID,
                {
                    duration: duration,
                    scale: 1,
                    delay: delay,
                }
            ); 
        }, 
        onEnterBack: () => {
            const tl = gsap.timeline();
            tl.to(
                '#' + targetElementID,
                {
                    duration: duration,
                    scale: 0.8,
                    delay: delay,
                }
            ); 
        },
    })
}



// slowDownSection

export function slowDownSection(node) {

    const parentElement = node; // target element
    const parentElementID = parentElement.id;
    const container = parentElement.querySelector('.container');

    const start = parentElement.getAttribute("gsap-start") ? parentElement.getAttribute("gsap-start") : '10vw';

    let scrollY = 0; // Initial scroll position
    let previousScrollY = 0; // Previous scroll position
    let direction;
    let parentHeight;
    parentElement.style.opacity = 0;

    mm.add("(min-width: 769px)", () => { // 769px up

        const containerHeight = container.offsetHeight;

        // if(window.innerWidth <= 1024) { // 1024 below
        //     parentHeight = containerHeight * 2;
        // } else { // desktop
        //     parentHeight = containerHeight * 2.3;
        // }

        parentHeight = containerHeight * 2;

        parentElement.style.height = parentHeight + 'px';
        
        gsap.to(container, {
            y: () => {

                if(window.innerWidth <= 1024) { // 1024 below
                    direction = scrollY > previousScrollY ? -0.7 : 0.7;
                } else { // desktop
                    direction = scrollY > previousScrollY ? -1 : 1;
                }

                previousScrollY = scrollY;
                return container.getBoundingClientRect().height * direction;
            },
            scrollTrigger: {
                trigger: '#' + parentElementID,
                start: () => start + ' ' + window.innerHeight * 0.7,
                end: () => '90% ' + window.innerHeight * 0.3,
                scrub: true, // Use scrub to smooth the animation
                onUpdate: (self) => {
                scrollY = self.scroll();
                },
                onEnter: () => {
                    gsap.to('#' + parentElementID, {
                        opacity: 1,
                        duration: 2,
                    });
                },
                onLeave: () => {
                    gsap.to('#' + parentElementID, {
                        opacity: 0,
                        duration: 1.5,
                    });
                },
                onLeaveBack: () => {
                    gsap.to('#' + parentElementID, {
                        opacity: 0,
                        duration: 1.5,
                    });
                },
                onEnterBack: () => {
                    gsap.to('#' + parentElementID, {
                        opacity: 1,
                        duration: 2,
                    });
                },
                // markers: true,
            },
        });
    });

    mm.add("(max-width: 768px)", () => { // no y on 768 below
        gsap.to(container, {
            scrollTrigger: {
                trigger: '#' + parentElementID,
                start: () => start + ' ' + window.innerHeight * 0.7,
                end: () => '90% ' + window.innerHeight * 0.3,
                scrub: true, // Use scrub to smooth the animation
                onEnter: () => {
                    gsap.to('#' + parentElementID, {
                        opacity: 1,
                        duration: 2,
                    });
                },
                onLeave: () => {
                    gsap.to('#' + parentElementID, {
                        opacity: 0,
                        duration: 2,
                    });
                },
                onLeaveBack: () => {
                    gsap.to('#' + parentElementID, {
                        opacity: 0,
                        duration: 2,
                    });
                },
                onEnterBack: () => {
                    gsap.to('#' + parentElementID, {
                        opacity: 1,
                        duration: 2,
                    });
                },
                // markers: true,
            },
        });
    });
    
}

// Fly 2 new fly animation to move the element same with scrolling - usually for image


export function fly2(node) {

    const targetElement = node; // target element
    const targetElementID = targetElement.id;
    const delay = targetElement.getAttribute("gsap-delay") ? targetElement.getAttribute("gsap-delay") : delayDefault;
    const duration = targetElement.getAttribute("gsap-duration") ? targetElement.getAttribute("gsap-duration") : durationDefault;
    const y = targetElement.getAttribute("gsap-y") ? targetElement.getAttribute("gsap-y") : '-100';
    const start = targetElement.getAttribute("gsap-start") ? targetElement.getAttribute("gsap-start") : "top bottom";

    // Fly2 animation
    mm.add("(min-width: 768px)", () => {
        gsap.to('#' + targetElementID, {
            yPercent: y, 
            ease: "none", 
            scrollTrigger: {
                trigger: '#' + targetElementID, 
                scrub: true,
                start: start,
                end: '+=2500px',
            }
        });
    });

    mm.add("(max-width: 767px)", () => { // different animation
        targetElement.style.opacity = 0;
        ScrollTrigger.create({
            trigger: '#' + targetElementID,
            start: 'top bottom',
            once: true,
            // markers: true,
            onEnter: function() { 
                const tl = gsap.timeline();
                tl.set(
                    '#' + targetElementID,
                    {
                        opacity: 0,
                        yPercent: 50,
                    }
                );
                tl.to(
                    '#' + targetElementID,
                    {
                        opacity: 1,
                        yPercent: 0,
                        duration: 2,
                    }
                );
            }, 
        })
    })
}


// BG Zoom

export function bgZoom(node) {

    const targetElement = node; // target element
    const targetElementID = targetElement.id;
    const bg = targetElement.querySelector('.bg');
    const start = targetElement.getAttribute("gsap-start") ? targetElement.getAttribute("gsap-start") : 'center center';
    const scale = targetElement.getAttribute("gsap-scale") ? targetElement.getAttribute("gsap-scale") : 1.3;

    // const masterTL = gsap.timeline({
    //     ease: "none",
    //     scrollTrigger: {
    //         trigger: '#' + targetElementID,
    //         start: start,
    //         //end: '50%',
    //         end: "+=" + (window.innerHeight * 3),
    //         pin: true,
    //         scrub: 4,
    //         // markers: true,
    //         // once: true,
    //     }
    // })

    // const zoomBGAnimate = () => {
    //     return gsap.to(bg, {
    //         scale: scale,
    //     });
    // }

    // masterTL.add(zoomBGAnimate())

    gsap.to(bg, {
        scale: scale, 
        ease: "none", 
        scrollTrigger: {
            trigger: '#' + targetElementID, 
            scrub: 2,
            start: "top bottom",
            end: "bottom top",
            // end: "+=" + (window.innerHeight * 1),
            // pin: true,
            // markers: true,
        }
    });

}

// Snap for testing
//  ScrollTrigger.create({
//     snap: {
//         snapTo: 1,
//         delay: 0,
//     },
// });
// End snap for testing

// Auto scroll

export function stopSection() {
    
    let sections = gsap.utils.toArray("section");
        
    sections.forEach((section, i) => {

        // Calculate the index of the next section
        const nextSectionIndex = i + 1;
        // const prevSectionIndex = i - 1;

        // if (nextSectionIndex < sections.length) {  // Check if there is a next section

            const nextSection = sections[nextSectionIndex];
            // const prevSection = sections[prevSectionIndex];

            const offsetHeight = nextSection ? nextSection.getBoundingClientRect() : '';

            // Scroll down
            function down() {
                // console.log('down')
                gsap.to(window, {
                    duration: 2, 
                    scrollTo: {
                        // y: "#" + nextSection.id, 
                        y: offsetHeight.top,
                        // offsetY: 80,
                        autoKill: true
                    }
                });
            }

            if(!section.classList.contains("autoscroll-exception")) { // if section is not exluded on the adding of scroll trigger auto scroll
                
                mm.add("(max-width: 768px)", () => {

                    // observer that will be triggered by the onEnter
                    // Touch
                    let scrollObserverTouch = Observer.create({
                        target: window,    
                        type: "touch",
                        onUp: () => down(), 
                    });
                    scrollObserverTouch.disable();

                    // Scroll
                    let scrollObserverScroll = Observer.create({
                        target: window,    
                        type: "wheel",
                        onDown: () => down(),
                    });
                    scrollObserverScroll.disable();

                    // Scroll trigger for stop and observer
                    // section.style.opacity = 0;
                    ScrollTrigger.create({
                        trigger: section,
                        start: "bottom 90%", // start of stop then enable the observer
                        end: "bottom center",
                        // markers: true,
                        // pin: true,
                        onEnter: self => {
                            self.scroll(self.start + 1);
                            scrollObserverTouch.enable();
                            scrollObserverScroll.enable();

                            // gsap.to(section, {
                            //     opacity: 1,
                            //     duration: 2,
                            // });
                        },
                        // onLeaveBack: self => {
                        //     self.scroll(self.end - 1);
                        //     scrollObserverTouch.enable();
                        //     scrollObserverScroll.enable();
                        // },
                        onLeave: () => {
                            scrollObserverTouch.disable();
                            scrollObserverScroll.disable();
                        }
                    });

                });

            } 

        // }
        
    });
}