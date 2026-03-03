import { cn } from "@/lib/utils";

type HighlightKind = "link" | "NP" | "VP" | "PP" | string;

export interface TokenLineItem {
  i: number;
  t: string;
  pos?: string;
}

export interface TokenHighlight {
  kinds: HighlightKind[];
  note?: string;
}

interface TokenLineProps {
  tokens: TokenLineItem[];
  highlights?: Record<number, TokenHighlight>;
  showPos?: boolean;
  className?: string;
}

const PHRASE_CLASSES: Record<string, string> = {
  NP: "bg-emerald-50 border border-emerald-200",
  VP: "bg-blue-50 border border-blue-200",
  PP: "bg-amber-50 border border-amber-200",
};

export function TokenLine({
  tokens,
  highlights = {},
  showPos = false,
  className,
}: TokenLineProps) {
  return (
    <div className={cn("flex flex-wrap gap-x-2 gap-y-2 text-sm text-gray-900", className)}>
      {tokens.map((token) => {
        const highlight = highlights[token.i];
        const phraseKind = highlight?.kinds.find((kind) => kind in PHRASE_CLASSES);
        const hasLink = highlight?.kinds.includes("link");

        return (
          <span
            key={`${token.i}-${token.t}`}
            title={highlight?.note}
            className={cn(
              "inline-flex items-center gap-1 rounded px-1.5 py-0.5",
              phraseKind ? PHRASE_CLASSES[phraseKind] : "bg-gray-50",
              hasLink && "border-b-2 border-b-rose-500"
            )}
          >
            <span>{token.t}</span>
            {showPos && token.pos ? (
              <span className="rounded bg-gray-200 px-1 text-[10px] font-semibold uppercase text-gray-700">
                {token.pos}
              </span>
            ) : null}
          </span>
        );
      })}
    </div>
  );
}
