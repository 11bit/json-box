import { style, globalStyle } from "@vanilla-extract/css";

export const cmContainer = style({
  height: "100%",
});

globalStyle(`${cmContainer} .cm-scroller`, {
  fontFamily: `"Martian Mono", "Lucida Console", "Monaco", monospace;`,
});
