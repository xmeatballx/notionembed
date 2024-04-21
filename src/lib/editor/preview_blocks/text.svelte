<script lang="ts">
	export let element: string;
</script>

{#if element == 'h1'}
	<h1>
		<slot />
	</h1>
{:else if element == 'h2'}
	<h2>
		<slot/>
	</h2>
{:else if element == 'h3'}
	<h3>
		<slot/>
	</h3>
{:else if element == 'p'}
	<p>
		<slot/>
	</p>
{:else if element == 'blockquote'}
	<blockquote>
		<slot/>
	</blockquote>
{/if}

<style>
	blockquote {
		max-width: var(--size-content-3);
	}
</style>
