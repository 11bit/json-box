import { style, globalStyle } from "@vanilla-extract/css";

export const container = style({
  width: "100vw",
  height: "100vh",
});

export const handle = style({
  background: "#000000bf",
  width: "3px",
});

export const sidebarContainer = style({
  margin: "2px 20px",
});

export const sidebarList = style({
  margin: 0,
  listStyleType: "none",
  paddingLeft: 0,
});

export const sidebarListItem = style({
  display: "flex",
  gap: 2,
  marginBottom: 2,
});

export const sidebarListItemTitle = style({
  flex: 1,
});

globalStyle("body", {
  background: "#282a36",
  color: "white",
});
