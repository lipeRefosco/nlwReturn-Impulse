"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.routes = void 0;
const express_1 = __importDefault(require("express"));
const NodemailerMailAdapter_1 = require("./adapters/nodemailer/NodemailerMailAdapter");
const PrismaFeedbacksRepository_1 = require("./repositories/prisma/PrismaFeedbacksRepository");
const SubmitFeedbackService_1 = require("./services/SubmitFeedbackService");
exports.routes = express_1.default.Router();
exports.routes.post('/feedback', async (req, res) => {
    const prismaFeedbacksRepository = new PrismaFeedbacksRepository_1.PrismaFeedbacksRepository();
    const nodemailerMailAdapter = new NodemailerMailAdapter_1.NodemailerMailAdapter();
    const submitFeedbackService = new SubmitFeedbackService_1.SubmitFeedbackService(prismaFeedbacksRepository, nodemailerMailAdapter);
    await submitFeedbackService.execute(req.body);
    return res.status(201).send();
});
