import { dracula } from "@uiw/codemirror-theme-dracula";
import ReactCodeMirror, { ReactCodeMirrorProps } from "@uiw/react-codemirror";
import { cmContainer } from "./codemirror.css";

export function Codemirror(props: ReactCodeMirrorProps) {
  return (
    <ReactCodeMirror
      theme={dracula}
      className={cmContainer}
      height="100%"
      {...props}
    />
  );
}
