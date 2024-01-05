<script lang="ts">
	import { state } from '../../stores';
	import * as api from '../_api';
	import Spinner from '$lib/spinner.svelte';
	import { writable, get } from 'svelte/store';
	import type { Block, Embed } from '@prisma/client';
	import { onMount } from 'svelte';

	export let block: any = '';
	export let content: any;
</script>

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
