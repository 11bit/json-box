import { dracula } from "@uiw/codemirror-theme-dracula";
import ReactCodeMirror, { ReactCodeMirrorProps } from "@uiw/react-codemirror";
import { useEffect, useState } from "react";
import { EditorView } from "@codemirror/view";
import { Transaction } from "@codemirror/state";
import { cmContainer } from "./codemirror.css";

export function Codemirror({
  value,
  onChange,
  ...props
}: ReactCodeMirrorProps) {
  const [initialValue] = useState(value);
  const [view, setView] = useState<EditorView | undefined>(undefined);

  useEffect(() => {
    const currentValue = view ? view.state.doc.toString() : "";
    if (view && value !== currentValue) {
      // Fix echoing of the remote changes:
      //  If value changes from outside (usually it is sync with other tab or replication event)
      //  then update the CodeMirror state but mark it as a `remote` so that we can prevent `onChange` handler for it
      view.dispatch({
        changes: { from: 0, to: currentValue.length, insert: value || "" },
        annotations: [Transaction.remote.of(true)],
      });
    }
  }, [value, view]);

  return (
    <ReactCodeMirror
      ref={(ref) => {
        if (ref?.view && !view) {
          setView(ref.view);
        }
      }}
      value={initialValue}
      theme={dracula}
      className={cmContainer}
      height="100%"
      onChange={(value, viewUpdate) => {
        // Fix echoing of the remote changes:
        //  If transaction is market as remote we don't have to call `onChange` handler again
        if (
          viewUpdate.transactions.some((transaction) =>
            transaction.annotation(Transaction.remote)
          )
        ) {
          return;
        }

        onChange?.(value, viewUpdate);
      }}
      {...props}
    />
  );
}
