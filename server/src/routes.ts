import express from 'express';
import { NodemailerMailAdapter } from './adapters/nodemailer/NodemailerMailAdapter';
import { PrismaFeedbacksRepository } from './repositories/prisma/PrismaFeedbacksRepository';
import { SubmitFeedbackService } from './services/SubmitFeedbackService';

export const routes = express.Router();

routes.post('/feedback', async (req, res) => {

	const prismaFeedbacksRepository = new PrismaFeedbacksRepository();
	const nodemailerMailAdapter = new NodemailerMailAdapter();

	const submitFeedbackService = new SubmitFeedbackService(
		prismaFeedbacksRepository,
		nodemailerMailAdapter
	);
	
	try{
		await submitFeedbackService.execute(req.body);
		return res.status(201).send();
	}catch(e){
		console.log(e);
		return res.status(500).send();
	}

})