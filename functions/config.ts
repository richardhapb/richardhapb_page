import type { Env, ConfigPayload } from './types.ts'


export async function onRequestPost(context: { request: Request, env: Env }): Promise<Response> {
	const { request, env } = context;

	const auth = request.headers.get("Authorization");

	if (!auth || !auth.startsWith("Bearer ")) {
		return new Response("Unauthorized", { status: 403 });
	}

	try {
		const token = auth.split(" ")[1];

		if (token != env.AUTH_TOKEN) throw new Error;
	} catch {
		return new Response("Invalid token", { status: 403 });
	}

	try {
		const config = await request.json() as ConfigPayload;

		if (typeof config.mailEnabled !== 'boolean') throw new Error("Invalid config");

		await env.MAIL_NS.put("enabled", String(config.mailEnabled));
	} catch (error) {
		return new Response(String(error), { status: 400 });
	}


	return new Response("OK", { status: 200 });
}
