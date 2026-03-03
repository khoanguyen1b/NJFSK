export interface TextAnalyzeResponse {
  meta: {
    lang: string;
    token_count: number;
    version: string;
  };
  linking_chunks: LinkingChunk[];
  syntax: {
    sentences: SyntaxSentence[];
  };
}

export interface LinkingChunk {
  chunk_id: string;
  text: string;
  tokens: ChunkToken[];
  link_points: LinkPoint[];
  future_audio: {
    tts_text: string;
    audio_url: string | null;
  };
}

export interface ChunkToken {
  i: number;
  t: string;
}

export interface LinkPoint {
  type: string;
  from: {
    token_i: number;
    char_range: [number, number];
  };
  to: {
    token_i: number;
    char_range: [number, number];
  };
  note: string;
}

export interface SyntaxSentence {
  sentence_id: string;
  text: string;
  tokens: SyntaxToken[];
  phrases: PhraseSpan[];
  dependencies?: Dependency[];
}

export interface SyntaxToken {
  i: number;
  t: string;
  pos: string;
}

export interface PhraseSpan {
  id: string;
  type: string;
  span: [number, number];
}

export interface Dependency {
  head: number;
  dep: number;
  rel: string;
}

export interface TextAnalyzeErrorResponse {
  error?: {
    code?: string;
    message?: string;
    fields?: Record<string, string>;
  };
  message?: string;
}
