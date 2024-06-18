<script lang="ts">
	import type { StateValue } from '_src/types';
	import { state, updateState } from '_src/stores';
	import { onMount } from 'svelte';
	import Spinner from '_src/lib/spinner.svelte';
	export let data;
	let user = data.user;
	let redirecting = false;
	// console.log(data);
	onMount(() => {
		// const queryCode = $page.url.searchParams.get('code');
		if (user) {
			window.localStorage.setItem('user', JSON.stringify(user));
			updateState('user_id', user.id as StateValue);
		}
		const storedUser = window.localStorage.getItem('user');
		if (storedUser) {
			const userObj = JSON.parse(storedUser);
			redirecting = true;
			window.location.replace(`/user/${userObj.id}`);
		}
	});
</script>

<section class="cta--wrapper">
	<div class="cta">
		{#if redirecting}
			<Spinner/>
			<h2>Getting things ready...</h2>
		{:else}
			<h2>Log In</h2>
			<p>No need to create a username or password. <br /> Just authorize with Notion and we'll remember you.</p>
			<button type="button">
				<a
					href={`https://api.notion.com/v1/oauth/authorize?owner=user&client_id=882d6a58-d120-4254-bc23-5d0be961890e&redirect_uri=${encodeURI(
						import.meta.env.VITE_SITE_URL
					)}&response_type=code`}
					class="button">Connect to Notion</a
				>
			</button>
		{/if}
	</div>
</section>

<style>
	section.cta--wrapper {
		height: calc(100vh - 72px);
		display: grid;
		place-items: center;
	}

	.cta {
		background-color: var(--surface-2);
		box-shadow: var(--shadow-1);
		max-width: 25vw;
		min-width: 39ch;
		border-radius: var(--size-2);
		margin: 0 auto;
		padding: var(--size-6);
		display: grid;
		gap: var(--size-3);
		text-align: center;
	}

	h2 {
		font-family: 'Archivo';
		font-weight: bold;
		font-size: var(--font-size-fluid-1);
	}

	p {
		font-size: var(--font-size-0);
	}

	button {
		display: block;
		background-color: var(--header);
		margin: 0 auto;
	}

	button a {
		color: var(--text-1);
	}

	button a:visited {
		color: inherit;
	}

	button a::before {
		content: "";
		float: left;
		width: 1.25em;
		height: 1.25em;
		background-image: url('icons/notion.svg');
		background-size: 100%;
		opacity: 0.8;
		margin-right: var(--size-1);
	}

	@media (prefers-color-scheme: dark) {
		button a::before {
		background-image: url('icons/notion-dark.svg');
		}
	}
</style>
