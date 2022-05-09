"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const nodemailer_1 = __importDefault(require("nodemailer"));
const transport = nodemailer_1.default.createTransport({
    host: "smtp.mailtrap.io",
    port: 2525,
    auth: {
        user: "090c3086d2823a",
        pass: "bcb7785a7ea4fe"
    }
});
class NodemailerMailAdapter {
    async sendMail({ subject, body }) {
        await transport.sendMail({
            from: 'Equipe feedget <oi@teste.com>',
            to: 'Teste <teste.email@email.com>',
            subject,
            html: body,
        });
    }
    ;
}
exports.NodemailerMailAdapter = NodemailerMailAdapter;
