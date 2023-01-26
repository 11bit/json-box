import { JsonFile, Notebook } from "./store";

export function evaluate({ code }: Notebook, files: Record<string, JsonFile>) {
  const withData = code.replace(/load\((\"|')(.*?)(\"|')\)/gm, (_, _1, d) => {
    return `(${files[d].content})` || "not found";
  });

  try {
    return JSON.stringify(eval(withData), null, 2);
  } catch (e) {
    return String(e);
  }
}
