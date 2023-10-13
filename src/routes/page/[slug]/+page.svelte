<script lang="ts">
	import { Col, Container, Row } from "sveltestrap";
	export let data;
	let domain = "https://api.ulfbuilt.com";
	let page =  data.data[0].attributes;
</script>
<svelte:head>
	<title>{page.title}</title>
	<meta name="description" content="ULF BUILT" />
</svelte:head>

<section class="page">
    <Container>
        <Row>
            <Col>
                <h1 class="page__title">{page.title}</h1>
                <div class="page__content">
                    {@html page.content}
                </div>
            </Col>
        </Row>
    </Container>
</section>


<style lang="scss">
    img{
        max-width: 100%;
    }
   .page{
    &__title{
            font-weight:400;
            margin-bottom: 1rem;
        } 
        &__content{
            min-height: 30vw;
            @media(max-width:767px){
                min-height: auto;
            }
        }        
    }
</style>