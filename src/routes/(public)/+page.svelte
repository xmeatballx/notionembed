<script>
	import { form, field } from 'svelte-forms';
	import { required } from 'svelte-forms/validators';

	const one = field('one', '', [required()]);
	const two = field('two', '', [required()]);
	const myForm = form(one, two);
</script>

<section>
	<select name="one" id="one" bind:value={$one.value}>
		<option value="sdfa">Hi</option>
		<option value="sdfSa">Hi</option>
		<option value="sdfaa">Hi</option>
		<option value="sddfa">Hi</option>
	</select>
	<select name="two" id="two" bind:value={$two.value}>
		<option value="a">fsd</option>
		<option value="s">dsd</option>
	</select>
	{JSON.stringify(myForm.summary())}
</section>
