<script lang="ts">
	import { onDestroy } from 'svelte';
	import * as api from '../../../lib/_api';
	import Spinner from '$lib/spinner.svelte';
	import PreviewBlocks from '$lib/editor/preview_blocks/index.svelte';
	import '_src/app.css';

	export let data;
	let embed: any = data.embed;
	let blocks: any[] = data.blocks;

	export const layout = null;
	let page = 0;
	let intervalID: any;

	if (embed && embed.autoplay) {
		intervalID = setInterval(() => {
			if (embed?.autoplayOrder == 'RANDOM') {
				page = Math.floor(Math.random() * embed.pageIds.length);
			}
		}, embed.autoplayInterval * 1000);
	}
	let contentArrayPromise: Promise<any[]> = Promise.all(
		embed.pageIds.map(
			async (pagedId: string) =>
				await Promise.all(
					blocks.map(async (block) => getData(block.propertyType, block.propertyId, pagedId))
				)
		)
	);

	async function getData(propertyType: any, propertyId: any, pageId: string) {
		try {
			if (embed && blocks) {
				switch (propertyType) {
					default:
						return await api.getContent(embed.forUser, pageId, propertyId);

					case 'cover':
						return await api.getPageImage(embed.forUser, embed.databaseId, pageId, 'cover');
					case 'icon':
						return await api.getPageImage(embed.forUser, embed.databaseId, pageId, 'icon');
					case 'relation':
						return await api.getRelation(embed.forUser, embed.databaseId, pageId, propertyId);
					case 'people':
						return await api.getPerson(embed.forUser, pageId, propertyId);
				}
			}
		} catch (error) {
			console.error(error);
		}
	}

	onDestroy(() => {
		clearInterval(intervalID);
	});
</script>

<div class="fullscreen">
	{#await contentArrayPromise}
		<Spinner />
	{:then contentArray}
		{#if contentArray}
			{#each contentArray as slide, i}
				<div class={`content ${i == page ? 'active' : ''}`}>
					{#if blocks}
						{#each blocks as block, j}
							<PreviewBlocks {block} content={slide[j]} />
						{/each}
					{/if}
				</div>
			{/each}
		{/if}
	{/await}
</div>

<style>
	.fullscreen {
		width: calc(100vw - 0px);
		height: calc(100vh - 0px);
		display: flex;
		flex-direction: column;
		background-color: var(--surface-1);
		/* justify-content: center; */
	}
	.content {
		margin: 1rem auto;
		flex-direction: column;
		display: flex;
		gap: 1em;
		width: var(--size-content-3);
		max-width: 90vw;
		transition: opacity 2s;
		opacity: 0;
		position: absolute;
		left: 50%;
		transform: translateX(-50%);
		z-index: 0;
	}

	.content.active {
		opacity: 1;
		z-index: 1;
	}
</style>
