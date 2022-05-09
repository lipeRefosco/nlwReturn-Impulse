import { useState } from "react";

import bugImageUrl from "../../assets/bug.svg";
import ideaImageUrl from "../../assets/idea.svg";
import thoughtImageUrl from "../../assets/thought.svg";

import { CloseButton } from "../CloseButton";
import { FeedbackContentStep } from "./Steps/FeedbackContentStep";
import { FeedbackSelectionStep } from "./Steps/FeedbackSelectionStep";
import { FeedbackSuccessStep } from "./Steps/FeedbackSuccessStep";

export const feedbackTypes = {
  BUG: {
    title: 'Problema',
    image: {
      source: bugImageUrl,
      alt: 'Imagem de um inseto.'
    }
  },
  IDEA: {
    title: 'Idéia',
    image: {
      source: ideaImageUrl,
      alt: 'Imagem de uma lampada.'
    }
  },
  OTHER: {
    title: 'Outro',
    image: {
      source: thoughtImageUrl,
      alt: 'Imagem de um balão de pensamento.'
    }
  }
}

export type FeedbackType = keyof typeof feedbackTypes;

export function WidgetForm() {

  const [feedbackType, setFeedbackType] = useState<FeedbackType | null>(null);
  const [feedbackSent, setFeedbackSent] = useState(false);

  function handleRestartFeedback() {
    setFeedbackType(null);
  }

  return (
    <div className="bg-zinc-900
      p-4
      mb-4
      relative
      rounded-2xl
      flex
      flex-col
      items-center
      shadow-lg
      w-[calc(100vw-2rem)] md:w-auto
      "
    >

      {feedbackSent ? (
        <FeedbackSuccessStep
          onFeedbackSent={setFeedbackSent}
          onFeedbackRestartRequested={handleRestartFeedback}
        />
      ) : (
        <>
          {(!feedbackType) ? (
            <FeedbackSelectionStep onClickChangeFeedbackType={setFeedbackType} />
          ) : (
            <FeedbackContentStep
              onFeedbackSent={() => setFeedbackSent(true)}
              onFeedbackRestartRequested={handleRestartFeedback}
              feedbackType={feedbackType}
            />
          )}
        </>
      )}

      <footer>
        <span className="text-xs text-zinc-600">Feito com ♥ pela <a className="underline underline-offset-2" href="https://rocketseat.com.br/">Rocketseat</a></span>
      </footer>
    </div>
  );
} 