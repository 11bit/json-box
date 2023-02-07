import { MiniDb } from "jotai-minidb";
import { atom } from "jotai/vanilla";

import planets from "./bootstrap-data/planets.json";
import chemicalElements from "./bootstrap-data/elements.json";
import beerCategories from "./bootstrap-data/beer_categories.json";

// UI state
export const ui = {
  selectedNotebook: atom("default"),
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

// Bootstrap data
const PLANETS_JSON = "planets.json";

// Notebooks
export type Notebook = {
  name: string;
  code: string;
};
export function getNewNotebook(): Notebook {
  return {
    name: "Untitled",
    code: "",
  };
}
export const notebooksDb = new MiniDb<Notebook>({
  name: "notebooks",
  initialData: {
    default: {
      name: "Jupiter's moons",
      code: `load("${PLANETS_JSON}")
  .planets
  .filter(p => p.name === "Jupiter")`,
    },
  },
});

// Files
export type JsonFile = {
  content: string;
  createdAt: number;
};

export const filesDb = new MiniDb<JsonFile>({
  name: "files",
  initialData: {
    [PLANETS_JSON]: {
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
