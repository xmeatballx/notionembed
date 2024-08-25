<script lang="ts">
	import type { Block } from 'src/types';
	import Text from './text.svelte';
	import ExternalURLEmbed from './embed.svelte';
	import List from './list.svelte';
	import Date from './date.svelte';
	import Badge from './badge.svelte';
	import Person from './person.svelte';
	import Checkbox from './checkbox.svelte';

	export let block: Block;
	export let content: any;
</script>

{#if block.propertyType == 'title'}
	<Text element={block.previewElement}>{content.results[0]?.title?.text?.content ?? "Untitled"}</Text>
{/if}

{#if block.propertyType == 'rich_text'}
	<Text element={block.previewElement}>{content.results[0]?.rich_text.text.content ?? 'Empty'}</Text
	>
{/if}

{#if block.propertyType == 'select'}
	<Text element={block.previewElement}>{content.select.name}</Text>
{/if}

{#if block.propertyType == 'url'}
	{#if block.previewElement == 'a'}
		<a href={content.url} target="_blank">{content.url}</a>
	{:else if block.previewElement == 'object'}
		<ExternalURLEmbed url={content.url} />
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
	{#if block.previewElement == 'ul'}
		<List items={content.multi_select} type="bullet" />
	{:else if block.previewElement == 'ol'}
		<List items={content.multi_select} type="numbered" />
	{/if}
{/if}

{#if block.propertyType == 'relation'}
	{#each content as relation}
		<a href={relation.url} target="_blank">{relation.content}</a>
	{/each}
{/if}

{#if block.propertyType == 'email'}
	<a href="mailto: {content.email}">{content.email}</a>
{/if}

{#if block.propertyType == 'people'}
	{#each content as result}
		<Text element={block.previewElement}>{result.people.name}</Text>
	{/each}
{/if}

{#if block.propertyType == 'date' && content.date}
	<Date element={block.previewElement} date={content.date} />
{/if}

{#if block.propertyType == 'last_edited_time'}
	<Date element={block.previewElement} date={content.last_edited_time} />
{/if}

{#if block.propertyType == 'created_time'}
	<Date element={block.previewElement} date={content.created_time} />
{/if}

{#if block.propertyType == 'status'}
	<Badge>{content.status.name}</Badge>
{/if}

{#if block.propertyType == 'created_by'}
	<Person person={content.created_by} />
{/if}

{#if block.propertyType == 'files'}
	{#each content.files as file}
		<a href={file.file.url} target="_blank">{file.name}</a>
	{/each}
{/if}

{#if block.propertyType == 'last_edited_by'}
	<Person person={content.last_edited_by} />
{/if}

{#if block.propertyType == 'number'}
	<Text element={block.previewElement}>{content.number}</Text>
{/if}

{#if block.propertyType == 'rollup'}
	{#each content.results as result}
		<Text element={block.previewElement}>{result.title.plain_text}</Text>
	{/each}
{/if}

{#if block.propertyType == 'unique_id'}
	{#if content.unique_id.prefix}
		<Text element={block.previewElement}>{content.unique_id.prefix + content.unique_id.number}</Text
		>
	{:else}
		<Text element={block.previewElement}>{content.unique_id.number}</Text>
	{/if}
{/if}

{#if block.propertyType == 'phone_number'}
	<Text element={block.previewElement}>{content.phone_number}</Text>
{/if}

{#if block.propertyType == 'checkbox'}
	<Checkbox checked={content.checkbox} element={block.previewElement} />
{/if}

<style>
	a {
		max-inline-size: 50ch;
		text-overflow: ellipsis;
	}
</style>
