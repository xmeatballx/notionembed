<header class="site-header">
    <div>
        <h1>NotionEmbed</h1>
    </div>
    <nav>
        <ul>
            <li>
                <a href="/">Home</a>
            </li>
            <li>
                <a href="/login">Login</a>
            </li>
        </ul>
    </nav>
</header>

<style>
    .site-header {
        display: flex;
        justify-content: space-between;
        padding: var(--size-2);
		border-bottom: 1px solid var(--surface-3);
        box-shadow: var(--shadow-2);
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