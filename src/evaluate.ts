import { JsonFile, Notebook } from "./store";

export function evaluate({ code }: Notebook, files: Record<string, JsonFile>) {
  const withData = stripComments(code).replace(
    /load\((\"|')(.*?)(\"|')\)/gm,
    (_, _1, d) => {
      return `(${files[d]?.content || "'No result'"})`;
    }
  );

  try {
    // return withData; // JSON.stringify(eval(withData), null, 2);
    return JSON.stringify(eval(withData), null, 2);
  } catch (e) {
    return String(e);
  }
}

function stripComments(src: string) {
  return src.replace(/\/\/.*?$/gm, "");
}
