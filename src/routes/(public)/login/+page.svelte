<script lang="ts">
	import type { StateValue } from '_src/types';
	import { state, updateState } from '_src/stores';
	import type { User } from '@prisma/client';
	import { onMount } from 'svelte';
	export let data;
	let user: User = data.user;
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
			window.location.replace(`/user/${userObj.id}`);
		}
	});
</script>

<section class="cta">
	<h2>Connect your Notion Account</h2>
	<a
		href={`https://api.notion.com/v1/oauth/authorize?owner=user&client_id=882d6a58-d120-4254-bc23-5d0be961890e&redirect_uri=${encodeURI(import.meta.env.VITE_SITE_URL)}&response_type=code`}
		class="button">Authorize</a
	>
</section>

<style>
</style>
