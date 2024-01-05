<div class="spinner" />

<style>
	.spinner {
		display: inline-block;
		border: 2px solid rgba(0, 0, 0, 0.2);
		border-radius: 50%;
		border-top-color: #3498db;
		animation: spin 1s ease-in-out infinite;
		width: 20px;
		height: 20px;
		align-self: center;
		justify-self: center;
	}

	@keyframes spin {
		to {
			transform: rotate(360deg);
		}
	}
</style>
