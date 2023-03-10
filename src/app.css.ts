import {
  createGlobalTheme,
  style,
  globalStyle,
  styleVariants,
} from "@vanilla-extract/css";

export const vars = createGlobalTheme(":root", {
  color: {
    back: "#0A0B0E",
    // back: "#282a36",
    container: "#282a36",
    popup: "#4d4f5b",
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

export const outputPanel = style({
  backgroundColor: vars.color.container,
  display: "flex",
  flexDirection: "column",
});

export const box = style({
  paddingLeft: vars.space.big,
  paddingRight: vars.space.big,
  paddingBottom: vars.space.small,
});

export const headerBlock = style({
    display: "flex",
    fontFamily: vars.font.mono,
    lineHeight: "200%",
    color: "#BBB",
    paddingTop: vars.space.medium,
    paddingBottom: vars.space.big,
})

export const menuButton = style([
  {
    display: "flex",
    alignItems: "center",
    border: "none",
    padding: 0,
    fontSize: "1rem",
  },
  box,
  headerBlock,
]);

export const menuList = style({
  backgroundColor: vars.color.popup,
  padding: vars.space.medium,
  fontFamily: vars.font.mono,
});

const baseMenuItem = {
  padding: vars.space.medium,
  selectors: {
    "&:before": {
      display: "inline-block",
      content: "•",
      opacity: 0,
      width: vars.space.big,
    },
  },
};

export const menuItem = styleVariants({
  normal: baseMenuItem,
  active: [
    baseMenuItem,
    {
      selectors: {
        "&:before": {
          opacity: 1,
        },
      },
    },
  ],
});

export const menuTriangle = style({
  marginLeft: 2,
});

export const container = style({
  height: "100vh",
  padding: "8px",
});

export const panels = style({
  width: "100%",
  height: "100%",
});

export const handle = style({
  width: vars.space.small,
});

export const handleHorizontal = style({
  height: vars.space.small,
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
    overflowY: "auto",
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
    gap: vars.space.small,
    marginBottom: vars.space.small,
  },
]);

export const sidebarListItemTitle = style({
  flex: "1 1 auto",
  overflow: "hidden",
  textOverflow: "ellipsis",
});

globalStyle("body", {
  background: vars.color.back,
  color: vars.color.text,
  margin: 0,
  height: "100vh",
});
