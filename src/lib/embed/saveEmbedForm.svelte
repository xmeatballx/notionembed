<script lang="ts">
	import { state } from '../../stores';
	import { page } from '$app/stores';
	export let closed: any;
	let previewLink: string;
	let formValues = {
		name: $state.database_name,
		layout: 'SINGLE',
		autoplay: true,
		autoplayInterval: 10,
		autoplayOrder: 'RANDOM'
	};

	async function createEmbed() {
		const storedUser = window.localStorage.getItem('user');
		const userObj = JSON.parse(storedUser ?? '{}');
		const { name, autoplay, autoplayInterval, autoplayOrder } = formValues;
		const data = {
			userId: userObj.id,
			databaseId: $state.database_id,
			pageIds: $state.page_ids,
			blocks: $state.blocks,
			name,
			autoplay,
			autoplayInterval,
			autoplayOrder
		};
		const response = await fetch('/embed/create', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify(data)
		});
		const result = await response.json();
		const url = new URL(window.location.href);
		console.log(url);
		previewLink = url.origin + `/embed/${result.embed.id}`;
	}

	async function updateEmbed() {
		const storedUser = window.localStorage.getItem('user');
		const userObj = JSON.parse(storedUser ?? '{}');
		const { name, autoplay, autoplayInterval, autoplayOrder } = formValues;
		const data = {
			userId: userObj.id,
			databaseId: $state.database_id,
			pageIds: $state.page_ids,
			blocks: $state.blocks,
			name,
			autoplay,
			autoplayInterval,
			autoplayOrder
		};
		console.log("PAGE: ", $page);
		const response = await fetch(`/embed/${$page.params.embedId}/update`, {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify(data)
		});
		const result = await response.json();
		const url = new URL(window.location.href);
		console.log(url);
		previewLink = url.origin + `/embed/${result.embed.id}`;
	}

	function handleSubmit(e: SubmitEvent): any {
		e.preventDefault();
		if ($page.params.embedId) {
			updateEmbed();
		} else {
			createEmbed();
		}
	}

	let isCopied = false;

	async function copyTextToClipboard() {
		try {
			await navigator.clipboard.writeText(previewLink);
			isCopied = true;
		} catch (error) {
			console.error('Error copying text to clipboard:', error);
		}
	}
</script>

<div class="form--heading">
	<h2>Save your embed</h2>
	<button class="controls" on:click={() => closed()}>
		<div class="x x1" />
		<div class="x x2" />
	</button>
</div>
{#if !previewLink}
	<form on:submit={handleSubmit}>
		<div class="name--container">
			<label for="name">Give your embed a name</label>
			<input type="text" name="name" id="name" bind:value={formValues.name} />
		</div>
		<div class="layout--container">
			<span>Layout</span>
			<div class="radio">
				<input type="radio" name="layout" id="SINGLE" value="SINGLE" checked />
				<label for="SINGLE">One at a time </label>
			</div>
			<div class="radio">
				<input type="radio" name="layout" id="CAROUSEL" disabled />
				<label for="carousel">Carousel (Coming Soon)</label>
			</div>
		</div>
		<div class="autoplay--container">
			<div class="autoplay--input--container">
				<label for="autoplay">Autoplay?</label>
				<input type="checkbox" name="autoplay" id="autoplay" bind:checked={formValues.autoplay} />
			</div>
		</div>
		{#if formValues.autoplay}
			<div class="interval--container">
				<div class="interval--input--container">
					<label for="autoplayInterval">Autoplay interval</label>
					<div class="interval--seconds--container">
						<input type="number" min="0" max="99" bind:value={formValues.autoplayInterval} />
						<span>seconds</span>
					</div>
				</div>
			</div>
			<div class="order--container">
				<span>Autoplay Order</span>
				<div class="radio order--input--container">
					<input
						type="radio"
						name="autoPlayOrder"
						id="RANDOM"
						value="RANDOM"
						bind:group={formValues.autoplayOrder}
					/>
					<label for="RANDOM">Random</label>
				</div>
				<div class="radio order--input--container">
					<input
						type="radio"
						name="autoPlayOrder"
						id="ASC"
						value="ASC"
						bind:group={formValues.autoplayOrder}
					/>
					<label for="ASC">Ascending</label>
				</div>
				<div class="radio order--input--container">
					<input
						type="radio"
						name="autoPlayOrder"
						id="DESC"
						value="DESC"
						bind:group={formValues.autoplayOrder}
					/>
					<label for="DESC">Descending</label>
				</div>
			</div>
		{/if}
		<button type="submit">Save</button>
	</form>
{:else}
	<div class="link">
		<span>Your embed link is ready!</span>
		<span>Here are some ways you could use the link:</span>
		<ul>
			<li>Paste this back into Notion to create an embed</li>
			<li>Add it to your website in an iframe</li>
		</ul>
		<button on:click={copyTextToClipboard}>
			{#if isCopied}
				<div class="callout">
					<span>Copied!</span>
				</div>
			{:else}
				<div class="callout">
					<span>Click to copy embed link</span>
				</div>
			{/if}
		</button>
	</div>
	<!-- <a href={previewLink} target="_blank" on:click={closed}>{previewLink}</a> -->
{/if}

{#if isCopied}{/if}

<style>
	.form--heading {
		display: flex;
		justify-content: space-between;
	}
	.x {
		width: 16px;
		height: 2px;
		background-color: var(--text-2);
		position: absolute;
	}

	.x.x1 {
		rotate: 45deg;
	}

	.x.x2 {
		rotate: -45deg;
	}

	form {
		display: grid;
		gap: var(--size-3);
	}
	input[type='text'],
	input[type='number'] {
		border: 2px solid var(--text-1);
	}

	input[type='radio'] {
		display: none;
	}

	.name--container {
		display: grid;
	}

	.layout--container,
	.order--container {
		display: flex;
		gap: var(--size-1);
		flex-wrap: wrap;
	}

	.layout--container span,
	.order--container span {
		width: 100%;
	}

	.radio {
		border-radius: var(--size-4);
		padding: 0 var(--size-2);
		border: 2px solid var(--text-1);
	}

	.radio:has(input:disabled) label:hover {
		cursor: default;
	}

	.radio:has(input:disabled) {
		background-color: var(--surface-1);
		color: var(--text-1);
		font-weight: 400;
	}
	.radio:hover,
    /* prettier-ignore*/
	.radio:has(input:checked) {
		background-color: var(--text-1);
		color: var(--surface-1);
		font-weight: 500;
	}

	.autoplay--input--container {
		display: flex;
		align-items: center;
		gap: var(--size-2);
	}

	.interval--seconds--container input {
		width: 5ch;
		padding: 0 0 0 var(--size-1);
	}

	button[type='submit'] {
		border-color: var(--text-1);
		color: var(--text-1);
	}

	button[type='submit']:hover {
		background-color: var(--text-1);
		color: var(--surface-1);
	}

	button[type='submit']:active {
		background-color: var(--text-2);
		color: var(--surface-1);
	}
	.link {
		margin-top: var(--size-6);
		display: grid;
	}

	.link button {
		padding: 0;
		background-color: transparent;
		border: none;
		box-shadow: none;
		width: fit-content;
	}

	.callout {
		/* margin: var(--size-1); */
		padding: var(--size-1) var(--size-2);
		font-size: var(--font-size-0);
		border: 2px solid var(--text-1);
		border-radius: var(--size-1);
		margin-top: var(--size-4);
	}
</style>
