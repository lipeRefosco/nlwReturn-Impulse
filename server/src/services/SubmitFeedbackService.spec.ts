import { SubmitFeedbackService } from "./SubmitFeedbackService";

const createFeedbackSpy = jest.fn();
const SendMailSpy = jest.fn();

const submitFeedback = new SubmitFeedbackService(
    { create: createFeedbackSpy },
    { sendMail: SendMailSpy }
);

describe('Submit fedback', () => {
    it('should be able to submit a feedback', async () => {

        await expect(submitFeedback.execute({
            type: 'BUG',
            comment: 'Comentário',
            screenshot: 'data:image/png;base64,2091230981kmçasdasd'
        })).resolves.not.toThrow();

        expect(createFeedbackSpy).toHaveBeenCalled();
        expect(SendMailSpy).toHaveBeenCalled();

    });

    it('should not be able to submit a feedback with out type', async () => {

        await expect(submitFeedback.execute({
            type: '',
            comment: 'Comentário',
            screenshot: 'data:image/png;base64,2091230981kmçasdasd'
        })).rejects.toThrow();

    });

    it('should not be able to submit a feedback with out comment', async () => {

        await expect(submitFeedback.execute({
            type: 'Bug',
            comment: '',
            screenshot: 'data:image/png;base64,2091230981kmçasdasd'
        })).rejects.toThrow();

    });

    it('should not be able to submit a feedback with an invalid screenshot', async () => {

        await expect(submitFeedback.execute({
            type: 'Bug',
            comment: 'Está tudo bugado',
            screenshot: 'teste.png'
        })).rejects.toThrow();

    });
    
});