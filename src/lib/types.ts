export interface AIResponse {
  answer: string;
  question: string;
}

export interface ContentInterface {
  _id: string;
  title: string;
  description: string;
  url: string;
  type: ContentType;
  userId: string;
  __v: number;
}

export type ContentType =
  | "all"
  | "figma"
  | "twitter"
  | "others"
  | "spotify"
  | "youtube";
