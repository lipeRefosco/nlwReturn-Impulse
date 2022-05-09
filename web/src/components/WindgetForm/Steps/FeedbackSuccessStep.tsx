import { CloseButton } from "../../CloseButton";
import successImgUrl from "../../../assets/success.svg";

interface FeedbackSuccessStepProps{
    onFeedbackSent: (isSended: boolean) => void,
    onFeedbackRestartRequested: () => void
}

export function FeedbackSuccessStep({
    onFeedbackSent,
    onFeedbackRestartRequested
} : FeedbackSuccessStepProps) {
    return (
        <>
            <header>
                <CloseButton />
            </header>
            <div className="flex flex-col items-center py-8 w-[305px] gap-2">
                <img src={successImgUrl} alt="Enviado com sucesso" />
                <h3>Agradecemos o feedback!</h3>
                <button
                    onClick={() => {
                        onFeedbackSent(false);
                        onFeedbackRestartRequested();
                    }}
                    className="py-2 px-6 bg-zinc-800 rounded-md mt-4"
                >
                    Quero enviar outro
                </button>
            </div>
        </>
    );
}