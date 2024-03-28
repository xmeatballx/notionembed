<script lang="ts">
	import { state } from '../../stores';
	import * as api from '../_api';
	import Spinner from '$lib/spinner.svelte';
	import { writable, get } from 'svelte/store';
	import type { Block, Embed } from '@prisma/client';
	import { onMount } from 'svelte';

	export let block: any = '';
	export let embed: Embed | undefined = undefined;
	export let blocks: Block[] | undefined = undefined;
	export let page: number = 0;
	let contentData = getData(block.propertyType, block.propertyId);

	$: if (block != '') {
		contentData = getData(block.propertyType, block.propertyId);
	}
	$: if (page) {
		contentData = getData(block.propertyType, block.propertyId);
	}
	async function getData(propertyType: any, propertyId: any) {
		try {
			const userIdStringified = window?.localStorage?.getItem('user');
			const user = JSON.parse(userIdStringified ?? '{}');
			if (embed && blocks) {
				if (propertyType == 'cover') {
					return await api.getPageImage(
						embed.forUser,
						embed.databaseId,
						embed.pageIds[page],
						'cover'
					);
				} else if (propertyType == 'icon') {
					return await api.getPageImage(
						embed.forUser,
						embed.databaseId,
						embed.pageIds[page],
						'icon'
					);
				} else if (propertyType == 'relation') {
					const content = await api.getRelation(embed.forUser, embed.databaseId, embed.pageIds[page], propertyId);
					return content;
				} else {
					const content = await api.getContent(embed.forUser, embed.pageIds[page], propertyId);
					return content;
				}
			} else {
				console.log('prop id', propertyId, 'prop type', propertyType);
				if (propertyType == 'cover') {
					console.log('getting cover');
					return await api.getPageImage(user.id, $state.database_id, $state.preview_as_id, 'cover');
				} else if (propertyType == 'icon') {
					return await api.getPageImage(user.id, $state.database_id, $state.preview_as_id, 'icon');
				} else if (propertyType == 'relation') {
					const content = await api.getRelation(user.id, $state.database_id, $state.preview_as_id, propertyId);
					return content;
				} else {
					const content = await api.getContent(user.id, $state.preview_as_id, propertyId);
					return content;
				}
			}
		} catch (error) {
			console.error(error);
		}
	}
</script>

<!-- {#key block} -->
{#await contentData}
	{#if block.propertyType == 'cover'}
		<div class="image-placeholder" />
	{:else}
		<div class="text-placeholder" />
	{/if}
{:then content}
	<!-- {JSON.stringify(content)} -->
	{#if block.propertyType == 'title'}
		{#if block.previewElement == 'h1'}
			<h1>{content.results[0].title.text.content}</h1>
		{:else if block.previewElement == 'h2'}
			<h2>{content.results[0].title.text.content}</h2>
		{:else if block.previewElement == 'h3'}
			<h3>{content.results[0].title.text.content}</h3>
		{:else if block.previewElement == 'p'}
			<p>{content.results[0].title.text.content}</p>
		{:else if block.previewElement == 'blockquote'}
			<blockquote>{content.results[0].title.text.content}</blockquote>
		{/if}
	{/if}
	{#if block.propertyType == 'rich_text'}
		{#if block.previewElement == 'h1'}
			<h1>{content.results[0]?.rich_text.text.content ?? 'Empty'}</h1>
		{:else if block.previewElement == 'h2'}
			<h2>{content.results[0]?.rich_text.text.content ?? 'Empty'}</h2>
		{:else if block.previewElement == 'h3'}
			<h3>{content.results[0]?.rich_text.text.content ?? 'Empty'}</h3>
		{:else if block.previewElement == 'p'}
			<p>{content.results[0]?.rich_text.text.content ?? 'Empty'}</p>
		{:else if block.previewElement == 'blockquote'}
			<blockquote>{content.results[0]?.rich_text.text.content ?? 'Empty'}</blockquote>
		{/if}
	{/if}
	{#if block.propertyType == 'select'}
		{#if block.previewElement == 'h1'}
			<h1>{content.select.name}</h1>
		{:else if block.previewElement == 'h2'}
			<h2>{content.select.name}</h2>
		{:else if block.previewElement == 'h3'}
			<h3>{content.select.name}</h3>
		{:else if block.previewElement == 'p'}
			<p>{content.select.name}</p>
		{:else if block.previewElement == 'blockquote'}
			<blockquote>{content.select.name}</blockquote>
		{/if}
	{/if}
	{#if block.propertyType == 'url'}
		{#if block.previewElement == 'a'}
			<a href={content.url}>{content.url}</a>
		{:else if block.previewElement == 'object'}
			{#await api.getEmbed(content.url)}
				<p>loading</p>
			{:then embed}
				<!-- <p>{embed}</p> -->
			{/await}
			<iframe title="embed" src={content.url}>
				<a href={content.url}>Visit Site</a>
			</iframe>
		{/if}
	{/if}
	{#if block.propertyType == 'icon' || block.propertyType == 'cover'}
		{#if content?.type == 'emoji'}
			<p>{content.icon}</p>
		{:else}
			<img src={content} alt="" />
		{/if}
	{/if}
	{#if block.propertyType == 'multi_select'}
		<ul>
			{#each content.multi_select as tag}
				<li>{tag.name}</li>
			{/each}
		</ul>
	{/if}
	{#if block.propertyType == 'relation'}
		{#each content as relation}
		<a href={relation.url}>{relation.content}</a>
		{/each}
	{/if}
	{#if block.propertyType == 'date'}
		<p>{content.date.start}</p>	
	{/if}
{/await}

<!-- {/key} -->
<style>
	img,
	.image-placeholder {
		width: var(--size-content-3);
		height: var(--size-content-3);
		max-width: 90vw;
		max-height: 90vw;
	}

	.image-placeholder {
		animation: pulse 2s infinite;
		background-color: var(--surface-2);
	}

	.text-placeholder {
		animation: pulse 2s infinite;
		width: var(--heading-size-3);
		height: var(--font-size-6);
		background-color: var(--surface-2);
		border-radius: var(--size-2);
	}

	a {
		max-inline-size: 50ch;
		text-overflow: ellipsis;
	}

	blockquote {
		max-width: var(--size-content-3);
	}

	@keyframes pulse {
		0% {
			opacity: 0;
		}
		50% {
			opacity: 0.5;
		}
		100% {
			opacity: 0;
		}
	}
</style>
