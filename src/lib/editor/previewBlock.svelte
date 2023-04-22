<script lang="ts">
    import { state } from '../../stores';
    import * as api from '../_api';
	import Spinner from '$lib/spinner.svelte';
	import { writable, get } from 'svelte/store';

	
    export let block: any = "";
    let contentData = getData(block.propertyType, block.propertyId);

    
    $: if (block != "") {
			contentData = getData(block.propertyType, block.propertyId);
		} 

    async function getData(propertyType: any, propertyId: any) {
            if (propertyType == 'cover') {
                return api.getPageImage($state.user_id, $state.database_id, $state.preview_as_id, 'cover');
            }

            if (propertyType == 'icon') {
                return api.getPageImage($state.user_id, $state.database_id, $state.preview_as_id, 'icon');
            }

            const content = await api.getContent($state.user_id, $state.preview_as_id, propertyId);
            return content;
	}

</script>
<!-- {#key block} -->
{#await contentData}
    {#if block.propertyType == "cover"}
        <div class="image-placeholder"></div>
    {:else}
    <div class="text-placeholder"></div>
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
						<p>{embed}</p>
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
            {/await}
    <!-- {/key} -->

    <style>
    img, .image-placeholder {
        width: 50ch;
        height: 50ch;
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

    @keyframes pulse {
        0% {
            opacity: 0;
        }
        50% {
            opacity: .5;
        }
        100% {
            opacity: 0;
        }
    }
    </style>