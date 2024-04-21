<script lang="ts">
	export let person: any;
	console.log("PERSON: ", person);
</script>

<div class="person--container">
	<div class="avatar">
		{#if person.avatar_url}
			<img src={person.avatar_url} alt="avatar" />
		{:else}
			<span>{person.name.charAt(0)}</span>
		{/if}
	</div>
	<p>{person.name}</p>
</div>

<style>
	.person--container {
		display: flex;
		align-items: flex-end;
	}

	.avatar {
		border-radius: var(--size-1);
		background-color: var(--surface-2);
		width: var(--size-6);
		height: var(--size-6);
		display: flex;
		align-items: center;
		justify-content: center;
		margin-right: var(--size-1);
	}
</style>
