"use client";

import { Button } from "@/components/ui/button";
import { LinkingChunk } from "@/lib/types/textAnalyze";
import { TokenHighlight, TokenLine } from "@/components/text-analyze/TokenLine";

interface LinkingChunksViewProps {
  chunks: LinkingChunk[];
}

export function LinkingChunksView({ chunks }: LinkingChunksViewProps) {
  if (chunks.length === 0) {
    return (
      <div className="rounded-md border border-dashed border-gray-300 p-4 text-sm text-gray-600">
        No linking chunks returned from API.
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {chunks.map((chunk) => {
        const highlights = buildLinkHighlights(chunk);
        const audioUrl = chunk.future_audio?.audio_url ?? null;

        return (
          <section key={chunk.chunk_id} className="rounded-lg border border-gray-200 bg-white p-4">
            <div className="mb-2 flex items-start justify-between gap-3">
              <div>
                <p className="text-xs font-semibold uppercase tracking-wide text-gray-500">{chunk.chunk_id}</p>
                <p className="mt-1 text-sm font-medium text-gray-900">{chunk.text}</p>
              </div>
              <Button
                type="button"
                variant="outline"
                size="sm"
                disabled={!audioUrl}
                onClick={() => {
                  if (audioUrl) {
                    window.open(audioUrl, "_blank", "noopener,noreferrer");
                  }
                }}
              >
                Play
              </Button>
            </div>

            <TokenLine tokens={chunk.tokens} highlights={highlights} />

            <p className="mt-2 text-xs text-gray-500">
              Link points: <strong>{chunk.link_points.length}</strong>
            </p>
          </section>
        );
      })}
    </div>
  );
}

function buildLinkHighlights(chunk: LinkingChunk): Record<number, TokenHighlight> {
  const highlights: Record<number, TokenHighlight> = {};

  for (const point of chunk.link_points) {
    const fromI = point.from?.token_i;
    const toI = point.to?.token_i;

    if (typeof fromI === "number") {
      const existing = highlights[fromI];
      highlights[fromI] = {
        kinds: uniqueKinds([...(existing?.kinds ?? []), "link"]),
        note: point.note,
      };
    }

    if (typeof toI === "number") {
      const existing = highlights[toI];
      highlights[toI] = {
        kinds: uniqueKinds([...(existing?.kinds ?? []), "link"]),
        note: point.note,
      };
    }
  }

  return highlights;
}

function uniqueKinds(kinds: string[]): string[] {
  return [...new Set(kinds)];
}
