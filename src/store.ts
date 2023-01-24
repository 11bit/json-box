import { MiniDb } from "jotai-minidb";

// Pipelines
export type Notebook = {
  name: string;
  code: string;
};
export function getNewNotebook(): Notebook {
  return {
    name: "Untitled",
    code: `const json = file('test')`,
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
