"use client";

import { useEffect, useState } from "react";
import { LinkingChunksView } from "@/components/text-analyze/LinkingChunksView";
import { SyntaxView } from "@/components/text-analyze/SyntaxView";
import { TextAnalyzeResponse } from "@/lib/types/textAnalyze";
import { cn } from "@/lib/utils";

interface TabsViewProps {
  result: TextAnalyzeResponse;
}

type TabValue = "linking" | "syntax";

export function TabsView({ result }: TabsViewProps) {
  const [activeTab, setActiveTab] = useState<TabValue>("linking");

  useEffect(() => {
    setActiveTab("linking");
  }, [result]);

  return (
    <section className="rounded-lg border border-gray-200 bg-gray-50 p-4">
      <div className="mb-4 inline-flex rounded-md border border-gray-200 bg-white p-1">
        <button
          type="button"
          className={tabClassName(activeTab === "linking")}
          onClick={() => setActiveTab("linking")}
        >
          Linking
        </button>
        <button
          type="button"
          className={tabClassName(activeTab === "syntax")}
          onClick={() => setActiveTab("syntax")}
        >
          Syntax
        </button>
      </div>

      {activeTab === "linking" ? (
        <LinkingChunksView chunks={result.linking_chunks} />
      ) : (
        <SyntaxView sentences={result.syntax.sentences} />
      )}
    </section>
  );
}

function tabClassName(isActive: boolean): string {
  return cn(
    "rounded px-3 py-1.5 text-sm font-medium transition-colors",
    isActive
      ? "bg-blue-600 text-white"
      : "text-gray-600 hover:bg-gray-100 hover:text-gray-900"
  );
}
