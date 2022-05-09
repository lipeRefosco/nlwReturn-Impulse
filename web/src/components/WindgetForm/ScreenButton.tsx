import { Camera, Trash } from "phosphor-react";
import html2canvas from "html2canvas";
import { useState } from "react";
import { Loading } from "../Loading";

interface ScreenButtonProps{
	screenshot: string | null,
	onScreenshotTook: (screenshot : string | null) => void
}

export function ScreenButton({
	screenshot,
	onScreenshotTook
} : ScreenButtonProps) {

	const [isTakingScreenshot, setIsTakingScreenshot] = useState(false);


	async function handleTakeScreenshot(){
    // Define que está tirando uma screenshot
		setIsTakingScreenshot(true);

    // Seleciona a tag HTML e converte para base64
		const canvas = await html2canvas(document.querySelector('html')!);
		const base64image = canvas.toDataURL('image/png');

    // Seta o screenshot
		onScreenshotTook(base64image);

    // Define que não está mais tirando screenshot
		setIsTakingScreenshot(false);
	}


	if(screenshot){
		return(
			<button
				type="button"
				className="
					w-10 h-10 p-1
					relative
					rounded-md
					flex
					justify-end
					items-end
					overflow-hidden
				"
				style={{
					backgroundImage: `url('${screenshot}')`,
					backgroundSize: '100% auto ',
					backgroundPosition: 'center',
					backgroundRepeat: 'no-repeat'
				}}
			>
				<span
					onClick={() => onScreenshotTook(null)}
					className="
							absolute
							right-0
							bottom-0
							p-1
					">
							<Trash className="w-3 h-3" />
					</span>
			</button>
		);
	}

	return (
		<button
			onClick={handleTakeScreenshot}
			className="
				p-2
				bg-zinc-800
				rounded-md
				border-transparent
				outline-none
				hover:bg-zinc-700
				focus:bg-zinc-700
				focus:ring-2
				focus:ring-[#996DFF]
				focus:ring-offset-2
				focus:ring-offset-zinc-900
				transition-colors"
		>
			{ isTakingScreenshot ? <Loading /> : <Camera className="w-6 h-6" />}
		</button>
	);
}