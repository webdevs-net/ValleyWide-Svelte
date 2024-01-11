<script>
	import {Swipe, SwipeItem} from "svelte-swipe";
	import { Container, Row, Col} from "sveltestrap";
    // import Swipe from "svelte-swipe";
    let active_item = 0; //readonly
    let SwipeComp;
  
      function changeSlide(i){
      SwipeComp.goTo(i)
    }
  
    export let images = [];
  
  </script>
  <section class="gallery-slider">
    <Container>
      <Row>
        <Col>
          <div class="card">
            <div class="swipe-holder">
                <Swipe bind:active_item bind:this={SwipeComp}>
                    {#each images as image}
                    <SwipeItem>
                        <img loading="lazy" class="img-fluid" src={image} alt="">
                    </SwipeItem>
                    {/each}
                </Swipe>
            </div>
            <div class="card-body">
                  <div class="is-center">
                      {#each images as image, i}
                          <img loading="lazy" class="{active_item == i ? 'rounded' : 'img-thumbnail'}" on:click={() => changeSlide(i)} src={image} alt="">
                      {/each}
                  </div>
            </div>
          </div>	      
        </Col>
      </Row>
    </Container>
  </section>

  <style lang="scss">
    .swipe-holder{
        img{
            width: 100%;
        }
      height: 40vw;
      width: 100%;
    }
    .is-center{
      display: flex;
      justify-content: center;
      align-items: center;
    }
    img{
      max-width: 100%;
      height: auto;
    }

    .gallery-slider{
      .card-body{
        img{
          max-width: 300px;
        }
      }
    }
   
  </style>

  