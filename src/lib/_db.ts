import type { RedisCommandArgument } from '@redis/client/dist/lib/commands';
import { createClient } from 'redis';
const dbClient = createClient({
	socket: {
		port: import.meta.env.VITE_REDIS_PORT,
		host: import.meta.env.VITE_REDIS_URL
	}
});
dbClient.on('error', (err) => console.log(err));
dbClient.on('connect', () => console.log('connected'));

await dbClient.connect();

type Props = {
	key: RedisCommandArgument;
	value?: RedisCommandArgument;
};

async function set(props: Props) {
	if (props.value) {
		await dbClient.set(props.key, props.value);
	}
}

async function get(props: Props) {
	return await dbClient.get(props.key);
}

export { get, set };
