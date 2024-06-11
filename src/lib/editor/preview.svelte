<script lang="ts">
	import * as api from '../_api';
	import { state, blocks } from '../../stores';
	import Spinner from '$lib/spinner.svelte';
	import { onDestroy } from 'svelte';
	import PreviewBlock from './previewBlock.svelte';
</script>

<div class="content">
	{#each $blocks as block}
		<PreviewBlock {block} />
	{/each}
</div>

<style>
	.content {
		margin: 1rem;
		display: grid;
		gap: 1em;
		max-width: var(--size-content-3);
	}
</style>
