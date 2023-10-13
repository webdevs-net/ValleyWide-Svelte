<script lang="ts">
	import { Col, Container, Row } from "sveltestrap";
	export let data;
	let domain = "https://api.ulfbuilt.com";
	let member =  data.data[0].attributes;
	console.log(data);
</script>
<svelte:head>
	<title>{member.name}</title>
	<meta name="description" content="ULF BUILT" />
</svelte:head>

<section class="member">
    <Container fluid>
        <Row>
            <Col>
                <div class="member__info">
                    <h1>{member.name}</h1>
                    <span>{member.position}</span>
                    <div class="member__info__content">
                        {@html member.content}
                    </div>
                </div>
            </Col>
            <Col>
                <div class="member__img" style="--banner: url({domain}/{member.memberPhoto.data.attributes.formats.large.url})">
                </div>
            </Col>
        </Row>
    </Container>
</section>

<style lang="scss">
    .member{
        &__info{
            padding: 0 3rem;
        }
        &__img{
            background-image: var(--banner);
            background-size: cover;
            height: 50vw;
            width: 100%;
            margin-right: -1rem;
            margin-left: 1rem;
        }
    }
</style>