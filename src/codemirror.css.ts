import { style, globalStyle } from "@vanilla-extract/css";
import { box, vars } from "./app.css";

export const cmContainer = style([
  box,
  {
    height: "100%",
    minHeight: 0,
  },
]);

export const loadWidget = style({
  borderRadius: 4,
  fontSize: "0.8rem",
});

globalStyle(`${cmContainer} .cm-scroller`, {
  fontFamily: vars.font.mono,
});
