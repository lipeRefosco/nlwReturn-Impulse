import nodemailer from 'nodemailer';
import { MailAdapter, SendMailData } from "../MailAdapter";


const transport = nodemailer.createTransport({
	host: "smtp.mailtrap.io",
	port: 2525,
	auth: {
	  user: "090c3086d2823a",
	  pass: "bcb7785a7ea4fe"
	}
});

export class NodemailerMailAdapter implements MailAdapter{
    async sendMail ({subject, body}: SendMailData) {

        await transport.sendMail({
        	from: 'Equipe feedget <oi@teste.com>',
        	to: 'Teste <teste.email@email.com>',
        	subject,
        	html: body,
        })

    };
}