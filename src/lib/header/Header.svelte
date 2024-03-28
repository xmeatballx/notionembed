<script lang="ts">
	import { page } from '$app/stores';
	import SaveEmbedForm from '$lib/embed/saveEmbedForm.svelte';
	import { onMount } from 'svelte';
	import { state } from '../../stores';
	import type { User } from '@prisma/client';

	let saveFormOpen = false;
	let user: User;
	let currentPath: string;

	$: {
		currentPath = $page.url.pathname;
	}

	onMount(() => {
		if (typeof window !== 'undefined') {
			const userStringified = window.localStorage.getItem('user');
			user = userStringified ? JSON.parse(userStringified) : undefined;
		}
	});
</script>

<header class="site-header">
	<div>
		<h1>NotionEmbed</h1>
	</div>
	<nav>
		<ul>
			{#if currentPath.startsWith('/user/') && !currentPath.includes('profile')}
				<li>
					<button on:click={() => (saveFormOpen = true)}> Save </button>
				</li>
			{/if}
			<li>
				<a href="/">Home</a>
			</li>
			{#if !currentPath.startsWith('/user/')}
				<li>
					<a href="/login">Login</a>
				</li>
			{:else if user}
				{#if currentPath.includes('profile')}
					<li>
						<a href={`/user/${user.id}`} data-sveltekit-reload>Create</a>
					</li>
				{:else}
					<li>
						<a href={`/user/${user.id}/profile`}>Profile</a>
					</li>
				{/if}
			{/if}
		</ul>
	</nav>
</header>
{#if saveFormOpen}
	<div class="fullscreen">
		<div class="modal">
			<SaveEmbedForm closed={() => (saveFormOpen = false)} />
		</div>
	</div>
{/if}

<style>
	.fullscreen {
		width: 100vw;
		height: 100vh;
		position: absolute;
		inset: 0;
		display: grid;
		place-items: center;
		z-index: 1;
	}

	.modal {
		background-color: var(--surface-1);
		outline: 2px var(--text-1) solid;
		border-radius: 1ch;
		padding: 1em;
	}
	.site-header {
		display: flex;
		justify-content: space-between;
		padding: var(--size-2);
		border-bottom: 1px solid var(--surface-3);
		box-shadow: var(--shadow-2);
	}

	.site-header h1 {
		font-size: var(--font-size-5);
	}

	.site-header button {
		padding: 0.5em 1em;
		line-height: 1em;
		font-size: var(--font-size-3);
	}

	.site-header nav {
	}

	.site-header nav ul {
		height: 100%;
		display: flex;
		align-items: center;
		gap: var(--size-2);
		list-style: none;
	}

	.site-header nav a {
		font-size: var(--size-4);
		color: var(--text-1);
		font-weight: 600;
	}
</style>
