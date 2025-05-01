import { ActionError, defineAction } from 'astro:actions';
import { Resend } from 'resend';


interface MessageObject {
    name: string
    email: string
    messageHtml: string
    lang: string
}

async function sendEmail({ name, email, messageHtml, lang }: MessageObject) {
    const resend = new Resend(import.meta.env.MAIL_API_KEY);
    const result = await resend.emails.send({
        from: 'Richard Peña <contact@richardhapb.com>',
        to: [`${name} <${email}>`],
        subject: lang == "en" ? "New contact from richardhapb.com!" : "¡Nuevo contacto desde richardhapb.com!",
        html: messageHtml
    });

    return result
}

export const server = {
    send: defineAction({
        accept: 'form',
        handler: async (formData: FormData) => {
            const name = formData.get('name')?.toString() ?? '';
            const email = formData.get('email')?.toString() ?? '';
            const message = formData.get('message')?.toString() ?? '';
            const lang = formData.get('lang')?.toString() ?? '';

            const { error } = await sendEmail({
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
                throw new ActionError({
                    code: 'BAD_REQUEST',
                    message: error.message,
                });
            }

            const { data: emailData, error: emailError } = await sendEmail({
                name: name,
                email: import.meta.env.PERSONAL_EMAIL,
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
                throw new ActionError({
                    code: 'BAD_REQUEST',
                    message: emailError.message,
                });
            }

            return emailData;
        },
    })
};
