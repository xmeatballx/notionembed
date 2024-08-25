<script>
</script>

<section class="container">
	<div class="hero">
		<div class="hero--content">
			<h2>Your Notion content <br/> widget-ified</h2>
			<p>Turn your Notion database entries into a slideshow that you can embed in your Notion dashboard</p>
			<div class="button--wrapper">
				<button><a href="/login">Get Started</a></button>
			</div>
		</div>
		<div class="hero--img--container">
			<img src="hero.png" />
		</div>
	</div>
</section>

<style>
	.container {
		margin: 0 auto;
	}

	.hero {
		display: grid;
		grid-template-columns: repeat(12, 1fr);
		align-items: center;
		/*grid-template-rows: 1fr 1fr 1fr;*/
		/*flex-direction: column;*/
	}

	.hero .hero--content {
		grid-column: 7 / 13;
		grid-row: 1;
		display: flex;
		flex-direction: column;
		gap: var(--size-4);
		background-color: var(--surface-1-mid);
		padding: var(--size-11);
	}

	.hero h2 {
		font-family: 'Archivo';
		font-size: var(--font-size-fluid-3);
		line-height: var(--font-lineheight-1);
		letter-spacing: var(--font-letterspacing-1);
		font-weight: bolder;
		max-width: 80ch;
	}

	.hero p {
		font-family: 'Archivo';
		font-weight: 400;
		font-size: var(--font-size-fluid-1);
		letter-spacing: var(--font-letterspacing-1);
		max-inline-size: 45ch;
		margin-bottom: var(--size-2);
	}

	.hero--img--container {
		grid-column: 1 / 7;
		grid-row: 1;
		overflow: hidden;
		position: relative;
		width: 100%;
		height: calc(100vh - 72px - var(--size-10));
	}

	.hero img {
		height: 100%;
		box-shadow: 0 10px 15px -3px rgb(0 0 0 / 0.1), 0 4px 6px -4px rgb(0 0 0 / 0.1);
		object-fit: cover;
		object-position: right;
		/*	margin-top: var(--size-8);
		margin-bottom: var(--size-8); */
	}

	.hero button {
		background-color: var(--header);
	}

	.hero button a:visited {
		color: inherit;
	}

	@media (max-width: 740px) {
		.hero {
			display: flex;
			flex-direction: column;
		}

		.hero--content {
			padding: var(--size-8) !important;
		}
	}
</style>
