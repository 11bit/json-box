import { style } from "@vanilla-extract/css";
import { box, headerBlock } from "../../app.css";

export const header = style([
  box,
  headerBlock,
]);

export const headerTitle = style({
  flex: 1,
});
