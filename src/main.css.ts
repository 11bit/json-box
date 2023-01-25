import { style, globalStyle } from "@vanilla-extract/css";

export const container = style({
  height: "100vh",
});

export const panels = style({
  width: "100%",
  height: "100%",
  background: "#282a36",
});

export const handle = style({
  background: "#0A0B0E",
  width: 4,
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
  background: "#0A0B0E",
  color: "white",
  margin: 8,
});

globalStyle("html", {
  overflow: "hidden",
});
