export interface Thread {
  id: string;
  title: string;
  date: string;
}

export interface Source {
  id: string;
  title: string;
  url: string;
  siteName: string;
  favicon?: string;
  snippet: string;
}

export interface ChatTurn {
  id: string;
  role: "user" | "assistant";
  content: string;
  sources?: Source[];
  focusMode?: string;
}

export type Theme = "dark" | "light";
