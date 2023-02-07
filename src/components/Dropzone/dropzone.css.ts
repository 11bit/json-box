import { recipe } from "@vanilla-extract/recipes";
import { vars } from "../../app.css";

export const dropzone = recipe({
  base: {
    display: "flex",
    flexDirection: "column",
    height: "100%",
    backgroundColor: vars.color.container,
  },
  variants: {
    active: {
      yes: { boxShadow: "inset 0px 0px 4px 2px green;" },
      no: {},
    },
  },
});
