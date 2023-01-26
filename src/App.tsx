import { javascript } from "@codemirror/lang-javascript";
import { json } from "@codemirror/lang-json";
import { useAtom, useAtomValue, useSetAtom } from "jotai/react";
import { Panel, PanelGroup, PanelResizeHandle } from "react-resizable-panels";

import { Codemirror } from "./Codemirror";
import {
  container,
  handle,
  panels,
  sidebarContainer,
  sidebarList,
  sidebarListItem,
  sidebarListItemTitle,
} from "./main.css";
import { filesDb, getNewNotebook, notebooksDb, ui } from "./store";
import { evaluate } from "./evaluate";
import { DropZone } from "./Dropzone";

function Sidebar() {
  const files = useAtomValue(filesDb.entries);
  const notebooks = useAtomValue(notebooksDb.entries);
  const del = useSetAtom(filesDb.delete);
  const addFilesToNotebook = useSetAtom(ui.addFilesToNotebook);
  const activeId = useAtomValue(ui.selectedNotebook);

  return (
    <div className={sidebarContainer}>
      Files:
      <ul className={sidebarList}>
        {files.map(([id, file]) => (
          <li key={id} className={sidebarListItem}>
            <div className={sidebarListItemTitle}>{file.name}</div>
            <button onClick={() => addFilesToNotebook(activeId, [id])}>
              insert
            </button>
            <button onClick={() => del(id)}>del</button>
          </li>
        ))}
      </ul>
      Notebooks:
      <ul className={sidebarList}>
        {notebooks.map(([id, file]) => (
          <li key={id} className={sidebarListItem}>
            <div className={sidebarListItemTitle}>{file.name}</div>
            <button onClick={() => del(id)}>del</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

function Notebook() {
  const notebookId = useAtomValue(ui.selectedNotebook);
  const [storedPipeline, setPipeline] = useAtom(notebooksDb.item(notebookId));
  const pipeline = storedPipeline || getNewNotebook();
  const addFilesToNotebook = useSetAtom(ui.addFilesToNotebook);

  return (
    <DropZone
      onAdd={(fileIds) => {
        addFilesToNotebook(notebookId, fileIds);
      }}
    >
      <Codemirror
        placeholder="Drag'n'drop json file"
        extensions={[javascript()]}
        value={pipeline.code}
        onChange={(value) => {
          setPipeline({ ...pipeline, code: value });
        }}
      />
    </DropZone>
  );
}

function Results() {
  const notebookId = useAtomValue(ui.selectedNotebook);
  const pipeline = useAtomValue(notebooksDb.item(notebookId));
  const f = useAtomValue(filesDb.items);

  const value = pipeline && f ? evaluate(pipeline, f) : "";
  return (
    <Codemirror
      placeholder="Preview"
      readOnly={true}
      extensions={[json()]}
      value={value}
    />
  );
}

function App() {
  return (
    <div className={container}>
      <PanelGroup autoSaveId="main" direction="horizontal" className={panels}>
        <Panel defaultSize={10}>
          <Sidebar />
        </Panel>
        <PanelResizeHandle className={handle} />
        <Panel defaultSize={40}>
          <Notebook />
        </Panel>
        <PanelResizeHandle className={handle} />
        <Panel>
          <Results />
        </Panel>
      </PanelGroup>
    </div>
  );
}

export default App;
