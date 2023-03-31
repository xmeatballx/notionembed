<script lang="ts">
	import * as api from '../_api';
	import { state } from '../../stores';
	import Spinner from "$lib/spinner.svelte";
	import { onDestroy } from 'svelte';

	let blocks: any;
	const unsubscribe = state.subscribe(value => {
		// console.log(value)
		blocks = value.blocks;
		getContentBlocks();
	});
	onDestroy(unsubscribe);

	async function getData(propertyType: any, propertyId: any) {
		if (propertyType == 'cover') {
			return api.getPageImage($state.user_id, $state.database_id, $state.preview_as_id, 'cover');
		}

		if (propertyType == 'icon') {
			return api.getPageImage($state.user_id, $state.database_id, $state.preview_as_id, 'icon');
		}

		return api.getContent($state.user_id, $state.preview_as_id, propertyId);
	}

	async function getContentBlocks() {
		return Promise.all([...$state.blocks].map(async block => await getData(block.propertyType, block.propertyId)));
	}
</script>

<div class="content">
	{#key blocks}
		{#await getContentBlocks()}
			<Spinner/>
		{:then contentBlocks}
		{#each contentBlocks as content, i}
			{#if blocks[i].propertyType == 'title'}
				{#if blocks[i].previewElement == 'h1'}
					<h1>{content.results[0].title.text.content}</h1>
				{:else if blocks[i].previewElement == 'h2'}
					<h2>{content.results[0].title.text.content}</h2>
				{:else if blocks[i].previewElement == 'h3'}
					<h3>{content.results[0].title.text.content}</h3>
				{:else if blocks[i].previewElement == 'p'}
					<p>{content.results[0].title.text.content}</p>
				{:else if blocks[i].previewElement == 'blockquote'}
					<blockquote>{content.results[0].title.text.content}</blockquote>
				{/if}
			{/if}
			{#if blocks[i].propertyType == 'rich_text'}
				{#if blocks[i].previewElement == 'h1'}
					<h1>{content.results[0]?.rich_text.text.content ?? 'Empty'}</h1>
				{:else if blocks[i].previewElement == 'h2'}
					<h2>{content.results[0]?.rich_text.text.content ?? 'Empty'}</h2>
				{:else if blocks[i].previewElement == 'h3'}
					<h3>{content.results[0]?.rich_text.text.content ?? 'Empty'}</h3>
				{:else if blocks[i].previewElement == 'p'}
					<p>{content.results[0]?.rich_text.text.content ?? 'Empty'}</p>
				{:else if blocks[i].previewElement == 'blockquote'}
					<blockquote>{content.results[0]?.rich_text.text.content ?? 'Empty'}</blockquote>
				{/if}
			{/if}
			{#if blocks[i].propertyType == 'select'}
				{#if blocks[i].previewElement == 'h1'}
					<h1>{content.select.name}</h1>
				{:else if blocks[i].previewElement == 'h2'}
					<h2>{content.select.name}</h2>
				{:else if blocks[i].previewElement == 'h3'}
					<h3>{content.select.name}</h3>
				{:else if blocks[i].previewElement == 'p'}
					<p>{content.select.name}</p>
				{:else if blocks[i].previewElement == 'blockquote'}
					<blockquote>{content.select.name}</blockquote>
				{/if}
			{/if}
			{#if blocks[i].propertyType == 'url'}
				{#if blocks[i].previewElement == 'a'}
					<a href={content.url}>{content.url}</a>
				{:else if blocks[i].previewElement == 'object'}
					{#await api.getEmbed(content.url)}
						<p>loading</p>
					{:then embed}
						<p>{embed}</p>
					{/await}
					<iframe title="embed" src={content.url}>
						<a href={content.url}>Visit Site</a>
					</iframe>
				{/if}
			{/if}
			{#if blocks[i].propertyType == 'icon' || blocks[i].propertyType == 'cover'}
				{#if content.type == 'emoji'}
					<p>{content.icon}</p>
				{:else}
					<img src={content} alt="" />
				{/if}
			{/if}
			{#if blocks[i].propertyType == 'multi_select'}
				<ul>
					{#each content.multi_select as tag}
						<li>{tag.name}</li>
					{/each}
				</ul>
			{/if}
			{/each}
			{:catch}
			<p>error</p>
		{/await}
		{/key}
</div>

<style>
	.content {
		margin: 1rem;
		display: grid;
		gap: 1em;
	}
</style>
