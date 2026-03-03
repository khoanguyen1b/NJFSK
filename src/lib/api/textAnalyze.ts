import {
  TextAnalyzeErrorResponse,
  TextAnalyzeResponse,
} from "@/lib/types/textAnalyze";

const TEXT_ANALYZE_DEFAULT_PATH = "/text-analyze";
const TEXT_ANALYZE_LEGACY_API_PATH = "/api/text-analyze";

export class TextAnalyzeApiError extends Error {
  status: number;
  fields?: Record<string, string>;

  constructor(message: string, status: number, fields?: Record<string, string>) {
    super(message);
    this.name = "TextAnalyzeApiError";
    this.status = status;
    this.fields = fields;
  }
}

export async function analyzeText(text: string): Promise<TextAnalyzeResponse> {
  const response = await fetch(buildTextAnalyzeEndpoint(), {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      text,
      options: {
        linking: { mode: "mvp", max_chunk_words: 12 },
        syntax: { mode: "mvp" },
      },
    }),
  });

  if (!response.ok) {
    throw await toApiError(response);
  }

  return (await response.json()) as TextAnalyzeResponse;
}

function buildTextAnalyzeEndpoint(): string {
  const baseUrl =
    process.env.NEXT_PUBLIC_API_BASE_URL?.trim() ||
    process.env.NEXT_PUBLIC_API_URL?.trim();
  const endpointPath =
    process.env.NEXT_PUBLIC_TEXT_ANALYZE_PATH?.trim() || TEXT_ANALYZE_DEFAULT_PATH;

  if (!baseUrl) {
    return endpointPath;
  }

  const normalizedBase = baseUrl.replace(/\/+$/, "");
  const normalizedPath = normalizePath(endpointPath);

  if (normalizedBase.endsWith(normalizedPath)) {
    return normalizedBase;
  }

  if (normalizedBase.endsWith(TEXT_ANALYZE_LEGACY_API_PATH)) {
    return normalizedBase;
  }

  if (
    normalizedBase.endsWith("/api") &&
    (normalizedPath === "/text-analyze" || normalizedPath === "/api/text-analyze")
  ) {
    return `${normalizedBase}/text-analyze`;
  }

  return `${normalizedBase}${normalizedPath}`;
}

function normalizePath(path: string): string {
  if (!path) {
    return TEXT_ANALYZE_DEFAULT_PATH;
  }

  const withLeadingSlash = path.startsWith("/") ? path : `/${path}`;
  return withLeadingSlash.replace(/\/+$/, "");
}

async function toApiError(response: Response): Promise<TextAnalyzeApiError> {
  const fallbackMessage = `Request failed with status ${response.status}`;

  try {
    const parsed = (await response.json()) as TextAnalyzeErrorResponse;
    const message = parsed.error?.message ?? parsed.message ?? fallbackMessage;
    return new TextAnalyzeApiError(message, response.status, parsed.error?.fields);
  } catch {
    return new TextAnalyzeApiError(fallbackMessage, response.status);
  }
}
