<script>
	import '@fontsource/archivo/900.css';
</script>

<section class="container">
	<div class="hero">
		<div class="hero--content">
			<h2>Use your Notion content to create custom embeddable widgets</h2>
			<div class="button--wrapper">
				<button><a href="/login">Get Started</a></button>
			</div>
		</div>
		<iframe title="demo-one" src="http://localhost:3000/embed/clxc9qur90000ywqf8hjymcgj" />
	</div>
</section>

<style>
	.container {
		max-width: 120ch;
		margin: 0 auto;
	}

	.hero {
		height: calc(100vh - 72px);
		display: flex;
		align-items: center;
	}

	.hero .hero--content {
		display: grid;
		gap: var(--size-4);
		width: 60%;
	}

	.hero h2 {
		font-family: 'Archivo';
		font-size: var(--font-size-7);
		font-weight: bolder;
		margin-bottom: var(--size-2);
		max-width: 30ch;
	}

	.hero iframe {
		width: 50%;
	}

	.hero button {
		background-color: var(--header);
	}
</style>
