import { createGlobalTheme, style, globalStyle } from "@vanilla-extract/css";

export const vars = createGlobalTheme(":root", {
  color: {
    back: "#0A0B0E",
    // back: "#282a36",
    container: "#282a36",
    text: "white",
  },
  space: {
    small: "4px",
    medium: "8px",
    big: "16px",
  },
  font: {
    mono: `"Martian Mono", "Lucida Console", "Monaco", monospace;`,
  },
});

export const box = style({
  backgroundColor: vars.color.container,
  paddingLeft: vars.space.big,
  paddingRight: vars.space.big,
});

export const header = style([
  box,
  {
    // marginBottom: vars.space.small,
    fontFamily: vars.font.mono,
    lineHeight: "200%",
    // textDecoration: "underline",
    color: "#BBB",
    paddingTop: vars.space.medium,
    paddingBottom: vars.space.big,
    // borderBottom: "1px #555 solid",
    // fontSize: "0.5rem",
    // textTransform: "uppercase",
    // textAlign: 'center'
  },
]);

export const container = style({
  height: "100vh",
});

export const panels = style({
  width: "100%",
  height: "100%",
});

export const handle = style({
  width: vars.space.small,
});

export const sidebarContainer = style([
  {
    height: "100%",
    width: "100%",
    display: "flex",
    flexDirection: "column",
  },
]);

export const sidebarPanel = style([
  box,
  {
    flex: 1,
  },
]);

export const sidebarList = style([
  {
    margin: 0,
    listStyleType: "none",
    paddingLeft: 0,
  },
]);

export const sidebarListItem = style([
  {
    display: "flex",
    gap: 2,
    marginBottom: 2,
  },
]);

export const sidebarListItemTitle = style({
  flex: 1,
});

globalStyle("body", {
  background: vars.color.back,
  color: vars.color.text,
  margin: 8,
});

globalStyle("html", {
  overflow: "hidden",
});
