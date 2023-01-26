import { style, globalStyle } from "@vanilla-extract/css";
import { box, vars } from "./main.css";

export const cmContainer = style([
  box,
  {
    height: "100%",
  },
]);

export const loadWidget = style({
  borderRadius: 4,
  // border: "1px solid white",
  fontSize: "0.8rem",
});

globalStyle(`${cmContainer} .cm-scroller`, {
  fontFamily: vars.font.mono,
});
