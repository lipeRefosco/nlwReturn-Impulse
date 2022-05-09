import { FormEvent, useState } from "react";
import { FeedbackType, feedbackTypes } from "..";
import { api } from "../../../lib/api";
import { BackButton } from "../../BackButton";
import { CloseButton } from "../../CloseButton";
import { ScreenButton } from "../ScreenButton";
import {Loading} from '../../Loading';

interface FeedbackContentStepProps {
	feedbackType: FeedbackType,
	onFeedbackRestartRequested: () => void,
	onFeedbackSent: () => void
}

export function FeedbackContentStep({
	feedbackType,
	onFeedbackRestartRequested,
	onFeedbackSent,
} : FeedbackContentStepProps) {

	const feedbackTypesInfos = feedbackTypes[feedbackType];
	const [screenshot, setScreenshot] = useState<string | null>(null);
	const [comment, setComment] = useState<string | null>(null);
	const [isSendingFeedback, setIsSendingFeedback] = useState(false);

	async function handleFeedback(event: FormEvent){
		event.preventDefault();

		setIsSendingFeedback(true);

		// console.log({
		// 	type: feedbackType,
		// 	comment,
		// 	screenshot,
		// });
		await api.post('/feedback', {
			type: feedbackType,
			comment,
			screenshot,
		});

		setIsSendingFeedback(false);

		onFeedbackSent();
			
	}
	
	return (
		<>
			<header>
				<BackButton event={onFeedbackRestartRequested} />
				<span className="text-xl leading-6 flex items-center gap-2">
					<img className="w-6 h-6" src={feedbackTypesInfos.image.source} alt={feedbackTypesInfos.image.alt} />
					{feedbackTypesInfos.title}
				</span>
				<CloseButton />
			</header>
			<div className="py-8 w-full">
				<form
					onSubmit={e => e.preventDefault()}
					className="flex flex-col gap-2 items-center w-full"
				>
					<textarea
					onChange={(e) => {
						// setComment();
						setComment(e.target.value);
					}}
						autoFocus
						placeholder="Qual o problema que está acontencendo com você?"
						className="
							w-full
							bg-transparent
							rounded-lg
							p-4
							text-sm
							text-zinc-400
							outline-none
							placeholder:text-zinc-600
							focus:border-[#996DFF]
							focus:ring-2
							focus:ring-[#996DFF]
							focus:ring-offset-2
							focus:ring-offset-zinc-900
							transition-all
							"
					/>

					<footer className="flex gap-2 w-full">
						{/* Botão Printscreen */}
						<ScreenButton
							screenshot={screenshot}
							onScreenshotTook={setScreenshot}
						/>

						{/* Botão Submit */}
						<button
							type="submit"
							disabled={comment === null || isSendingFeedback}
						    onClick={handleFeedback}
							className="
								w-full
								p-2
								bg-[#8257E5]
								rounded-md
								border-transparent
								text-sm
								flex
								justify-center
								outline-none
								hover:bg-[#996DFF]
								focus:bg-[#996DFF]
								focus:ring-2
								focus:ring-[#996DFF]
								focus:ring-offset-2
								focus:ring-offset-zinc-900
								transition-colors
								disabled:opacity-50
								disable:hover:bg-[#8257E5]
								"
						>
							{isSendingFeedback ? (
									<Loading />
							) : (
							<>
								Enviar feedback
							</>)}
						</button>
					</footer>
				</form>
			</div>
		</>
	);
}