<script lang="ts">
	import PreviewBlock from '$lib/editor/previewBlock.svelte';
	import { getDatabase } from '@notionhq/client/build/src/api-endpoints';
	import type { Block, Embed } from '@prisma/client';
	import { onDestroy } from 'svelte';
	import { state } from '../../../stores';
	import * as api from '../../../lib/_api';
	import EmbedBlock from '$lib/embed/embedBlock.svelte';
	import Spinner from '$lib/spinner.svelte';

	export let embed: Embed;
	export let blocks: Block[];

	export const layout = null;
	let page = 0;
	let intervalID: any;

	if (embed && embed.autoplay) {
		intervalID = setInterval(() => {
			if (embed?.autoplayOrder == 'RANDOM') {
				page = Math.floor(Math.random() * embed.pageIds.length);
			}
		}, 10000);
	}
	let contentArrayPromise: Promise<any[]> = Promise.all(
		embed.pageIds.map(
			async (pagedId) =>
				await Promise.all(
					blocks.map(async (block) => getData(block.propertyType, block.propertyId, pagedId))
				)
		)
	);

	async function getData(propertyType: any, propertyId: any, pageId: string) {
		try {
			if (embed && blocks) {
				if (propertyType == 'cover') {
					return await api.getPageImage(embed.forUser, embed.databaseId, pageId, 'cover');
				} else if (propertyType == 'icon') {
					return await api.getPageImage(embed.forUser, embed.databaseId, pageId, 'icon');
				} else {
					const content = await api.getContent(embed.forUser, pageId, propertyId);
					return content;
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
		{#each contentArray as slide, i}
			<div class={`content ${i == page ? 'active' : ''}`}>
				{#each blocks as block, j}
					{#if i == page}
						<EmbedBlock {block} content={slide[j]} />
					{:else}
						<EmbedBlock {block} content={slide[j]} />
					{/if}
				{/each}
			</div>
		{/each}
	{/await}
</div>

<style>
	.fullscreen {
		width: calc(100vw - 0px);
		height: calc(100vh - 0px);
		display: flex;
		flex-direction: column;
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
