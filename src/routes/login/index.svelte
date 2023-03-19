<script>
	import { page } from '$app/stores';
	import { onMount } from 'svelte';
	onMount(() => {
		const queryCode = $page.url.searchParams.get('code');
		if (queryCode) {
			window.localStorage.setItem('notion code', queryCode);
		}

		const storedCode = window.localStorage.getItem('notion code');
		if (storedCode) {
			window.location.replace(`/user/${storedCode}`);
		}
	});
</script>

<section class="cta">
	<h2>Connect your Notion Account</h2>
	<a
		href="https://api.notion.com/v1/oauth/authorize?owner=user&client_id=882d6a58-d120-4254-bc23-5d0be961890e&redirect_uri=http%3A%2F%2Flocalhost%3A3000%2Flogin&response_type=code"
		class="button">Authorize</a
	>
</section>

<style>
</style>
