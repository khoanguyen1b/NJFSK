"use client";

import { Button } from "@/components/ui/button";

interface LongTextInputProps {
  text: string;
  isLoading: boolean;
  errorMessage: string | null;
  onTextChange: (nextText: string) => void;
  onAnalyze: () => void;
  onClear: () => void;
}

export function LongTextInput({
  text,
  isLoading,
  errorMessage,
  onTextChange,
  onAnalyze,
  onClear,
}: LongTextInputProps) {
  const isEmpty = text.trim().length === 0;

  return (
    <section className="rounded-lg border border-gray-200 bg-white p-4">
      <div className="mb-2 flex items-center justify-between">
        <label htmlFor="long-text-input" className="text-sm font-semibold text-gray-900">
          Long text
        </label>
        <span className="text-xs text-gray-500">{text.length} chars</span>
      </div>

      <textarea
        id="long-text-input"
        value={text}
        onChange={(event) => onTextChange(event.target.value)}
        placeholder="Paste your text here..."
        className="min-h-[240px] w-full rounded-md border border-gray-300 p-3 text-sm text-gray-900 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/30"
      />

      {errorMessage ? (
        <div className="mt-3 rounded-md border border-red-200 bg-red-50 px-3 py-2 text-sm text-red-700">
          {errorMessage}
        </div>
      ) : null}

      <div className="mt-4 flex gap-2">
        <Button type="button" onClick={onAnalyze} disabled={isEmpty || isLoading}>
          {isLoading ? "Analyzing..." : "Analyze"}
        </Button>
        <Button type="button" variant="outline" onClick={onClear} disabled={isLoading && isEmpty}>
          Clear
        </Button>
      </div>
    </section>
  );
}
