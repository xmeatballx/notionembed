<script lang="ts">
	import * as api from '../_api';
	import { state } from '../../stores';
	import Spinner from "$lib/spinner.svelte";
	import { onDestroy } from 'svelte';
	import PreviewBlock from './previewBlock.svelte';

	let blocks: any;
	const unsubscribe = state.subscribe(value => {
		console.log(value.blocks)
		blocks = value.blocks;
	});
	onDestroy(unsubscribe);
</script>

<div class="content">
		{#each blocks as block, i (i)}
			<PreviewBlock {block} />
		{/each}
</div>

<style>
	.content {
		margin: 1rem;
		display: grid;
		gap: 1em;
		max-width: var(--heading-size-3);
	}
</style>
