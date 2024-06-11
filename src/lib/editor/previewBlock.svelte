<script lang="ts">
	import { dbOptions } from '../../stores';
	import * as api from '../_api';
	import PreviewBlocks from './preview_blocks/index.svelte';

	export let block: any = '';
	export let embed: any | undefined = undefined;
	export let blocks: any[] | undefined = undefined;
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
				switch (propertyType) {
					default:
						return await api.getContent(embed.forUser, embed.pageIds[page], propertyId);

					case 'cover':
						return await api.getPageImage(
							embed.forUser,
							embed.databaseId,
							embed.pageIds[page],
							'cover'
						);
					case 'icon':
						return await api.getPageImage(
							embed.forUser,
							embed.databaseId,
							embed.pageIds[page],
							'icon'
						);
					case 'relation':
						return await api.getRelation(
							embed.forUser,
							embed.databaseId,
							embed.pageIds[page],
							propertyId
						);
					case 'people':
						return await api.getPerson(embed.forUser, embed.databaseId, embed.pageIds[page]);
				}
			} else {
				switch (propertyType) {
					default:
						return await api.getContent(user.id, $dbOptions.preview_as_id, propertyId);
					case 'cover':
						return await api.getPageImage(
							user.id,
							$dbOptions.database_id,
							$dbOptions.preview_as_id,
							'cover'
						);
					case 'icon':
						return await api.getPageImage(
							user.id,
							$dbOptions.database_id,
							$dbOptions.preview_as_id,
							'icon'
						);
					case 'relation':
						return await api.getRelation(
							user.id,
							$dbOptions.database_id,
							$dbOptions.preview_as_id,
							propertyId
						);
					case 'people':
						return await api.getPerson(user.id, $dbOptions.preview_as_id, propertyId);
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
	<PreviewBlocks {block} {content} />
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
