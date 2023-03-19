<script lang="ts">
	import * as api from '../_api';
	import { state } from '../../stores';

	async function getData(propertyType, propertyId) {
		if (propertyType == 'cover') {
			return api.getPageImage($state.user_id, $state.database_id, $state.preview_as_id, 'cover');
		}

		if (propertyType == 'icon') {
			return api.getPageImage($state.user_id, $state.database_id, $state.preview_as_id, 'icon');
		}

		return api.getContent($state.user_id, $state.preview_as_id, propertyId);
	}
</script>

<div class="preview-container">
	<div class="content">
		{#each $state.blocks as block}
			{#await getData(block.propertyType, block.propertyId)}
				<div />
			{:then content}
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
					{#if content.type == 'emoji'}
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
		{/each}
	</div>
</div>

<!-- {/each} -->
<style>
	.preview-container {
		background-color: white;
		color: black;
		min-height: 20rem;
		max-width: 100vw;
		display: flex;
		flex-direction: column;
		height: 100vh;
		display: grid;
		place-items: center;
	}

	.preview-container * {
		color: var(--gray-10);
		/* max-inline-size: var(--size-content-2); */
	}

	.content {
		margin: 1rem;
		display: grid;
		gap: 1em;
	}
</style>
