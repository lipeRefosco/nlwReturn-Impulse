import { MailAdapter } from "../adapters/MailAdapter";
import { FeedbackRepository } from "../repositories/FeedbacksRepositories";

interface SubmitFeedbackServiceRequest {
    type: string;
    comment: string;
    screenshot?: string;
}

export class SubmitFeedbackService{
    constructor(
       private feedbacksRepository: FeedbackRepository,
       private mailAdapter: MailAdapter
    ) {};

    async execute(request: SubmitFeedbackServiceRequest){
        const {type, comment, screenshot} = request;

        if(!type){
            throw new Error('Type is required!');
        }

        if(!comment){
            throw new Error('Comment is required!');
        }

        if(screenshot && !screenshot.startsWith('data:image/png;base64, ')) {
            throw new Error('Invalid screenshot format!');
        }

        await this.feedbacksRepository.create({
            type,
            comment,
            screenshot
        });

        await this.mailAdapter.sendMail({
            subject: 'Novo feedback',
            body: [
        		'<div style="font-family: sans-serif; font-size: 16px; color: #121;">',
        		`<p>Tipo do feedback>: ${type}</p>`,
        		`<p>Comenário>: ${comment}</p>`,
                `<p><img nosrc='${screenshot}' /></p>`,
        		'</div>'
        	].join('\n')
        });
    }
}