<script lang="ts">
	import { page } from '$app/stores';
	import SaveEmbedForm from '$lib/embed/saveEmbedForm.svelte';
	import { onMount } from 'svelte';
	import type { User } from '@prisma/client';
	import Modal from '$lib/modal.svelte';

	let saveFormOpen = false;
	let user: User;
	let currentPath: string;
	let mobileNavOpen = false;

	$: {
		currentPath = $page.url?.pathname;
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
		<a href="/" class="home_link"><h1 class="header-name">NotionEmbed</h1></a>
	</div>
	<button class="hamburger" on:click={() => (mobileNavOpen = !mobileNavOpen)}>
		<div class="1" />
		<div class="2" />
		<div class="3" />
	</button>
	<nav class={mobileNavOpen ? '' : 'hidden'}>
		<ul>
			{#if currentPath}
				{#if !currentPath.includes('profile')}
					<li>
						<button class="save" on:click={() => (saveFormOpen = true)}> Save </button>
					</li>
				{/if}
				<li>
					<a href="/">Home</a>
				</li>
				{#if user}
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
			{/if}
		</ul>
	</nav>
</header>
{#if saveFormOpen}
	<Modal>
		<SaveEmbedForm closed={() => (saveFormOpen = false)} />
	</Modal>
{/if}

<style>
	.site-header {
		display: flex;
		justify-content: space-between;
		padding: var(--size-3);
		box-shadow: var(--shadow-2);
		background-color: var(--header);
	}

	.site-header h1 {
		font-size: var(--font-size-5);
		text-shadow: 0 1px 0 var(--surface-1);
		font-weight: bold;
	}

	.site-header button {
		padding: 0.5em 1em;
		line-height: 1em;
		font-size: var(--font-size-3);
		background-color: transparent;
		box-shadow: none;
		border: none;
		text-shadow: none;
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

	.site-header nav a:not(.home_link) {
		font-size: var(--size-4);
		color: var(--text-1);
		font-weight: 600;
	}

	.home_link {
		display: flex;
		padding: 0;
	}

	nav.hidden {
		top: 0;
		bottom: 100%;
	}

	.hamburger {
		display: none;
	}

	@media (max-width: 740px) {
		.site-header nav {
			position: absolute;
			top: 0;
			left: 0;
			right: 0;
			z-index: 10;
			overflow: hidden;
			transition: all 0.5s;
		}
		.site-header nav ul {
			display: flex;
			flex-direction: column;
			padding-top: var(--size-8);
			background-color: var(--header);
			padding: var(--size-8) 0 var(--size-4) 0;
			height: auto;
		}
		.site-header button.hamburger {
			display: flex;
			align-items: center;
			justify-content: center;
			flex-direction: column;
			gap: var(--size-relative-2);
			width: var(--size-6);
			padding: 0;
			z-index: 20;
		}

		.hamburger div {
			width: 100%;
			height: 2px;
			background-color: var(--text-1);
		}

		button.save {
			padding: var(--size-1);
		}
	}
</style>
