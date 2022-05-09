import { FeedbackType, feedbackTypes } from "..";
import { CloseButton } from "../../CloseButton";

interface FeedbackSelectionStepProps {
	onClickChangeFeedbackType: (type: FeedbackType) => void;
}

export function FeedbackSelectionStep({ onClickChangeFeedbackType }: FeedbackSelectionStepProps) {

	return (
		<>
			<header>
				<span className="text-xl leading-6">Deixe seu feedback</span>

				<CloseButton />
			</header>
			<div className="flex gap-2 py-8 w-full">
				{Object.entries(feedbackTypes).map(([key, value]) => {
					return (
						<button
							key={key}
							onClick={() => onClickChangeFeedbackType(key as FeedbackType)}
							className="bg-zinc-800
								rounded-lg
								py-5
								w-24
								flex
								flex-col
								items-center
								border-2
								border-transparent
								hover:border-[#8257E5]
								focus:border-[#8257E5]
								focus:outline-none
								transition-colors
								ease-linear
								">
							<img src={value.image.source} alt={value.image.alt} />
							<span>{value.title}</span>
						</button>
					);
				})}
			</div>
		</>
	);
}