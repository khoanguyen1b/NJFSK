"use client";

import { useEffect, useRef, useState } from "react";
import { LongTextInput } from "@/components/text-analyze/LongTextInput";
import { TabsView } from "@/components/text-analyze/TabsView";
import { analyzeText } from "@/lib/api/textAnalyze";
import { normalizeLongTextInput } from "@/lib/text/normalize";
import { TextAnalyzeResponse } from "@/lib/types/textAnalyze";

export default function TextAnalyzePage() {
  const [text, setText] = useState("");
  const [result, setResult] = useState<TextAnalyzeResponse | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const resultRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (result && resultRef.current) {
      resultRef.current.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  }, [result]);

  const handleAnalyze = async () => {
    const normalizedText = normalizeLongTextInput(text);

    if (!normalizedText) {
      setErrorMessage("Please paste text before analyzing.");
      setResult(null);
      return;
    }

    setIsLoading(true);
    setErrorMessage(null);

    try {
      const response = await analyzeText(normalizedText);
      setText(normalizedText);
      setResult(response);
    } catch (error) {
      setResult(null);
      setErrorMessage(error instanceof Error ? error.message : "Analyze request failed.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleClear = () => {
    setText("");
    setResult(null);
    setErrorMessage(null);
  };

  return (
    <main className="mx-auto max-w-5xl space-y-6 p-6">
      <header>
        <h1 className="text-2xl font-bold text-gray-900">Text Analyze</h1>
        <p className="mt-1 text-sm text-gray-600">
          Paste text, run analyze, then review Linking chunks and Syntax output.
        </p>
      </header>

      <LongTextInput
        text={text}
        isLoading={isLoading}
        errorMessage={errorMessage}
        onTextChange={setText}
        onAnalyze={handleAnalyze}
        onClear={handleClear}
      />

      <div ref={resultRef}>
        {result ? (
          <TabsView result={result} />
        ) : (
          <section className="rounded-lg border border-dashed border-gray-300 bg-gray-50 p-4 text-sm text-gray-600">
            Results will appear here after you click Analyze.
          </section>
        )}
      </div>
    </main>
  );
}
