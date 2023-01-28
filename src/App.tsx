import "@reach/menu-button/styles.css";

import { javascript } from "@codemirror/lang-javascript";
import { json } from "@codemirror/lang-json";
import { useAtom, useAtomValue, useSetAtom } from "jotai/react";
import { Panel, PanelGroup, PanelResizeHandle } from "react-resizable-panels";

import { Codemirror } from "./Codemirror";
import * as s from "./app.css";
import { filesDb, getNewNotebook, notebooksDb, ui } from "./store";
import { evaluate } from "./evaluate";
import { DropZone } from "./Dropzone";
import { Menu, MenuButton, MenuItem, MenuList } from "@reach/menu-button";
import { useRef } from "react";

function Sidebar() {
  const dropzone = useRef<{ open: VoidFunction }>();
  const files = useAtomValue(filesDb.entries);
  const del = useSetAtom(filesDb.delete);
  const addFilesToNotebook = useSetAtom(ui.addFilesToNotebook);
  const activeId = useAtomValue(ui.selectedNotebook);

  return (
    <DropZone ref={dropzone}>
      <div className={s.sidebarContainer}>
        <Header
          right={
            <button onClick={() => dropzone.current?.open()}>Add File</button>
          }
        >
          Files
        </Header>
        <div className={s.sidebarPanel}>
          <ul className={s.sidebarList}>
            {files.map(([id]) => (
              <li key={id} className={s.sidebarListItem}>
                <div className={s.sidebarListItemTitle}>{id}</div>
                <button onClick={() => addFilesToNotebook(activeId, [id])}>
                  Use in notebook ⤴
                </button>
                <button onClick={() => del(id)}>Delete</button>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </DropZone>
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
      <Header>
        <NotebookMenu />
      </Header>
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

function Header({
  children,
  right,
}: React.PropsWithChildren<{ right?: React.ReactNode }>) {
  return (
    <div className={s.header}>
      <div className={s.headerTitle}>{children}</div>
      {right}
    </div>
  );
}

function NotebookMenu() {
  const [selected, setSelected] = useAtom(ui.selectedNotebook);
  const notebooks = useAtomValue(notebooksDb.entries);
  const [_, selectedNotebook] =
    notebooks.find(([id, nb]) => id === selected) || [];
  const createItem = useSetAtom(notebooksDb.set);

  return (
    <Menu>
      <MenuButton className={s.menuButton}>
        {selectedNotebook?.name}
        <div aria-hidden className={s.menuTriangle}>
          ▼
        </div>
      </MenuButton>
      <MenuList className={s.menuList}>
        {notebooks.map(([id, notebook]) => (
          <MenuItem
            key={id}
            onSelect={() => setSelected(id)}
            className={s.menuItem[id === selected ? "active" : "normal"]}
          >
            {notebook.name}
          </MenuItem>
        ))}
        <MenuItem
          className={s.menuItem.normal}
          onSelect={async () => {
            const name = prompt("Create notebook");
            if (name) {
              const id = crypto.randomUUID();
              await createItem(id, {
                name,
                code: "",
              });
              setSelected(id);
            }
          }}
        >
          Add
        </MenuItem>
      </MenuList>
    </Menu>
  );
}

function App() {
  return (
    <div className={s.container}>
      <PanelGroup autoSaveId="main" direction="horizontal" className={s.panels}>
        <Panel defaultSize={50}>
          <PanelGroup autoSaveId="first" direction="vertical">
            <Panel defaultSize={60}>
              <Notebook />
            </Panel>
            <PanelResizeHandle className={s.handleHorizontal} />
            <Panel>
              <Sidebar />
            </Panel>
          </PanelGroup>
        </Panel>
        <PanelResizeHandle className={s.handle} />
        <Panel className={s.outputPanel}>
          <Header>Output</Header>
          <Results />
        </Panel>
      </PanelGroup>
    </div>
  );
}

export default App;
