import { MiniDb } from "jotai-minidb";
import { atom } from "jotai/vanilla";

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
export const notebooksDb = new MiniDb<Notebook>({ name: "pipelines" });

// Files
export type JsonFile = {
  content: string;
  name: string;
  createdAt: number;
};

export const filesDb = new MiniDb<JsonFile>({
  name: "files",
});
