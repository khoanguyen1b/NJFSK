"use client";

import { useMemo, useState } from "react";
import { Button } from "@/components/ui/button";
import { SyntaxSentence } from "@/lib/types/textAnalyze";
import { TokenHighlight, TokenLine } from "@/components/text-analyze/TokenLine";

interface SyntaxViewProps {
  sentences: SyntaxSentence[];
}

export function SyntaxView({ sentences }: SyntaxViewProps) {
  const [showPhrases, setShowPhrases] = useState(true);

  const sentenceHighlights = useMemo(() => {
    return sentences.reduce<Record<string, Record<number, TokenHighlight>>>((acc, sentence) => {
      acc[sentence.sentence_id] = showPhrases
        ? buildPhraseHighlights(sentence)
        : {};
      return acc;
    }, {});
  }, [sentences, showPhrases]);

  if (sentences.length === 0) {
    return (
      <div className="rounded-md border border-dashed border-gray-300 p-4 text-sm text-gray-600">
        No syntax sentences returned from API.
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between rounded-lg border border-gray-200 bg-white p-3">
        <p className="text-sm text-gray-700">
          Phrase highlights: NP (green), VP (blue), PP (amber)
        </p>
        <Button
          type="button"
          variant="outline"
          size="sm"
          onClick={() => setShowPhrases((prev) => !prev)}
        >
          {showPhrases ? "Hide phrases" : "Show phrases"}
        </Button>
      </div>

      {sentences.map((sentence) => {
        const dependencies = sentence.dependencies ?? [];

        return (
          <section
            key={sentence.sentence_id}
            className="rounded-lg border border-gray-200 bg-white p-4"
          >
            <p className="text-xs font-semibold uppercase tracking-wide text-gray-500">
              {sentence.sentence_id}
            </p>
            <p className="mt-1 text-sm font-medium text-gray-900">{sentence.text}</p>

            <TokenLine
              className="mt-3"
              tokens={sentence.tokens}
              showPos
              highlights={sentenceHighlights[sentence.sentence_id]}
            />

            {showPhrases && sentence.phrases.length > 0 ? (
              <div className="mt-3 flex flex-wrap gap-2 text-xs text-gray-600">
                {sentence.phrases.map((phrase) => (
                  <span key={phrase.id} className="rounded bg-gray-100 px-2 py-1">
                    {phrase.id}: {phrase.type} [{phrase.span[0]}, {phrase.span[1]}]
                  </span>
                ))}
              </div>
            ) : null}

            {dependencies.length > 0 ? (
              <div className="mt-3 rounded-md bg-gray-50 p-3">
                <p className="text-xs font-semibold uppercase tracking-wide text-gray-500">
                  Dependencies
                </p>
                <ul className="mt-2 space-y-1 text-sm text-gray-700">
                  {dependencies.map((dependency, index) => (
                    <li key={`${dependency.head}-${dependency.dep}-${index}`}>
                      {dependency.head} -&gt; {dependency.dep} ({dependency.rel})
                    </li>
                  ))}
                </ul>
              </div>
            ) : null}
          </section>
        );
      })}
    </div>
  );
}

function buildPhraseHighlights(sentence: SyntaxSentence): Record<number, TokenHighlight> {
  const highlights: Record<number, TokenHighlight> = {};

  for (const phrase of sentence.phrases) {
    const [start, end] = phrase.span;
    if (start > end) {
      continue;
    }

    for (let i = start; i <= end; i++) {
      const existing = highlights[i];
      highlights[i] = {
        kinds: uniqueKinds([...(existing?.kinds ?? []), phrase.type]),
        note: `${phrase.id}: ${phrase.type}`,
      };
    }
  }

  return highlights;
}

function uniqueKinds(kinds: string[]): string[] {
  return [...new Set(kinds)];
}
