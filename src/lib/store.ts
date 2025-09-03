import { atom } from "jotai";
import type { ContentInterface } from "./types";

export const contentsAtom = atom<ContentInterface[]>([]);

export const filterAtom = atom<string>("all");

export const filteredContentAtom = atom((get) => {
  const filter = get(filterAtom);
  const contents = get(contentsAtom);

  if (filter === "all") {
    return contents;
  }

  return contents.filter(
    (content: ContentInterface) =>
      content.type.toLowerCase() === filter.toLowerCase(),
  );
});
