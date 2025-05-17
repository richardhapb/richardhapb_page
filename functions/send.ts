import { Resend } from 'resend';
import type { Env } from './types.ts'


interface MessageObject {
	name: string
	email: string
	messageHtml: string
	lang: string
}

async function sendEmail(env: Env, { name, email, messageHtml, lang }: MessageObject) {
	const resend = new Resend(env.MAIL_API_KEY);
	const result = await resend.emails.send({
		from: 'Richard Peña <contact@richardhapb.com>',
		to: [`${name} <${email}>`],
		subject: lang == "en" ? "New contact from richardhapb.com!" : "¡Nuevo contacto desde richardhapb.com!",
		html: messageHtml
	});

	return result
}

export async function onRequestPost(context: { request: Request, env: Env }): Promise<Response> {
	const { request, env } = context

	if (request.method === "POST" && new URL(request.url).pathname === "/send") {

		const enabled = await env.MAIL_NS.get("enabled");
		if (enabled === "false") {
			return new Response("Service disabled", { status: 503 });
		}

		const form = await request.formData();

		// 🛡️ Honeypot anti-bot
		const botcheck = form.get("botcheck")?.toString() || "";
		if (botcheck !== "") {
			return new Response("Blocked", { status: 403 });
		}

		try {
			const ts = Number(form.get("ts")?.toString() || Date.now().toString());
			if (Date.now() - ts < 5000) {
				return new Response("Blocked", { status: 403 });;
			}
		} catch {
			return new Response("Bad request", { status: 400 });
		}

		const name = (form.get("name")?.toString() || "").trim();
		const email = (form.get("email")?.toString() || "").trim();
		const message = (form.get("message")?.toString() || "").trim();
		const lang = form.get("lang")?.toString() || "en";

		if (message.length === 0 || name.length === 0 || email.length === 0) {
			return new Response("Bad request", { status: 400 });
		}

		try {
			const { error } = await sendEmail(env, {
				name: name,
				email: email,
				lang: lang,
				messageHtml: `
	<h2>${name}, ${lang == "en" ? " thanks for contact me!" : " ¡gracias por contacterme!"}</h2>
	<p>${lang == "en" ? "I will contact you with a response to your request." : "Me pondré en contacto contigo con una respuesta a tu solicitud."}</p>
	<br />
	<p>${lang == "en" ? "Regards." : "Saludos."}</p>
	<h4>Richard Peña</h4>
	`
			})

			if (error) {
				return new Response(error.message, { status: 500 })
			}

			const { error: emailError } = await sendEmail(env, {
				name: name,
				email: env.PERSONAL_EMAIL,
				lang: lang,
				messageHtml: `
	<h2>${name}, ${lang == "en" ? " contacted you!" : " ¡te ha enviado un mensaje!"}</h2>
	<p>${lang == "en" ? `${name} contacted you and is waiting for a response.` : `${name} se ha puesto en contacto contigo y está esperando una respuesta.`}</p>
	<br />
	<p>${lang == "en" ? "The message:" : "El mensaje:"}</p>
	<p><strong>${message}</strong></p>
	`
			})

			if (emailError) {
				return new Response(emailError.message, { status: 500 })
			}

			return new Response("Email sent successfuly");
		} catch (err: any) {
			return new Response(`Internal error: ${err.message}`, { status: 500 });
		}
	}

	return new Response(null, { status: 405 })
}
