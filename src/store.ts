import { MiniDb } from "jotai-minidb";
import { atom } from "jotai/vanilla";
import { createJSONStorage, atomWithStorage } from "jotai/vanilla/utils";

import planets from "./bootstrap-data/planets.json";
import chemicalElements from "./bootstrap-data/elements.json";
import beerCategories from "./bootstrap-data/beer_categories.json";
import { atomWithLocation } from "jotai-location";

// Types
export type Notebook = {
  name: string;
  code: string;
};
export type JsonFile = {
  content: string;
  createdAt: number;
};

// Notebooks
export const notebooksDb = new MiniDb<Notebook>({
  name: "notebooks",
  initialData: {
    default: {
      name: "Jupiter's moons",
      code: `load("planets.json")
  .planets
  .find(p => p.name === "Jupiter")
  .moons`,
    },
  },
});

export function getNewNotebook(): Notebook {
  return {
    name: "Untitled",
    code: "",
  };
}

// Files
export const filesDb = new MiniDb<JsonFile>({
  name: "files",
  initialData: {
    "planets.json": {
      createdAt: Date.now(),
      content: JSON.stringify(planets),
    },
    "beer_categories.json": {
      createdAt: Date.now(),
      content: JSON.stringify(beerCategories),
    },
    "chemical_elements.json": {
      createdAt: Date.now(),
      content: JSON.stringify(chemicalElements),
    },
  },
});

// UI state
const loc = atomWithLocation();
export const ui = {
  selectedNotebook: atom(
    (get) => {
      const selected = get(loc).pathname?.split("/").at(-1);
      return selected || "default";
    },
    (_get, set, notebook: string) => {
      set(loc, (l) => ({
        ...l,
        pathname: notebook,
      }));
    }
  ),
  addFilesToNotebook: atom(
    null,
    (get, set, notebookId: string, fileIds: string[]) => {
      const notebook = get(notebooksDb.item(notebookId)) || getNewNotebook();
      const code = `${fileIds.map((x, i) => `load("${x}")`)}\n${
        notebook?.code
      }`;

      set(notebooksDb.item(notebookId), { ...notebook, code });
    }
  ),
};
