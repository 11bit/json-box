import { style, globalStyle } from "@vanilla-extract/css";

export const cmContainer = style({
  height: "100%",
});

export const loadWidget = style({
  borderRadius: 4,
  border: "1px solid white",
  fontSize: "0.8rem",
});

globalStyle(`${cmContainer} .cm-scroller`, {
  fontFamily: `"Martian Mono", "Lucida Console", "Monaco", monospace;`,
});
