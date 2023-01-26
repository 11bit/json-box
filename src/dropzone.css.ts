import { recipe } from "@vanilla-extract/recipes";

export const dropzone = recipe({
  base: {
    height: "100vh",
  },
  variants: {
    active: {
      yes: { border: "3px green dashed" },
      no: {},
    },
  },
});
