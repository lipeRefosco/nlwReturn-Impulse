import { ArrowLeft } from "phosphor-react";

interface BackButtonProps {
	event: () => void
}

export function BackButton({ event }: BackButtonProps) {
	return (
		<button
			onClick={event}
			className="absolute
				top-5
				left-5
				text-zinc-400
				hover:text-zinc-100"
			>
			<ArrowLeft weight="bold" className="w-4 h-4" />
		</button>
	);
}