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
import { filesDb, getNewNotebook, notebooksDb } from "./store";
import { evaluate } from "./evaluate";
import { DropZone } from "./Dropzone";

function Sidebar() {
  const files = useAtomValue(filesDb.entries);
  const notebooks = useAtomValue(notebooksDb.entries);
  const del = useSetAtom(filesDb.delete);

  return (
    <div className={sidebarContainer}>
      Files:
      <ul className={sidebarList}>
        {files.map(([id, file]) => (
          <li key={id} className={sidebarListItem}>
            <div className={sidebarListItemTitle}>{file.name}</div>
            <button>insert</button>
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

function Pipeline({ name }: { name: string }) {
  // TODO: Fix and remove
  useAtom(notebooksDb.keys);
  useAtom(filesDb.keys);

  const [storedPipeline, setPipeline] = useAtom(notebooksDb.item(name));
  const pipeline = storedPipeline || getNewNotebook();

  return (
    <DropZone
      onAdd={(fileIds) => {
        setPipeline((old) => {
          const code = `${fileIds.map(
            (x, i) => `let file${i} = load("${x}")`
          )}\n${old?.code}`;

          return { ...old, code };
        });
      }}
    >
      <Codemirror
        placeholder="Drag'n'drop json file"
        extensions={[javascript()]}
        value={pipeline.code}
        onChange={(value) => {
          setPipeline((p) => ({ ...p, name: p.name || "", code: value }));
        }}
      />
    </DropZone>
  );
}

function Results({ name }: { name: string }) {
  const pipeline = useAtomValue(notebooksDb.item(name));
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
          <Pipeline name="default" />
        </Panel>
        <PanelResizeHandle className={handle} />
        <Panel>
          <Results name="default" />
        </Panel>
      </PanelGroup>
    </div>
  );
}

export default App;
