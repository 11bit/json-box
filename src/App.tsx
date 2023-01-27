import "@reach/menu-button/styles.css";

import { javascript } from "@codemirror/lang-javascript";
import { json } from "@codemirror/lang-json";
import { useAtom, useAtomValue, useSetAtom } from "jotai/react";
import { Panel, PanelGroup, PanelResizeHandle } from "react-resizable-panels";

import { Codemirror } from "./Codemirror";
import {
  box,
  container,
  handle,
  handleHorizontal,
  header,
  menuButton,
  menuItem,
  menuList,
  menuTriangle,
  panels,
  sidebarContainer,
  sidebarList,
  sidebarListItem,
  sidebarListItemTitle,
  sidebarPanel,
} from "./main.css";
import { filesDb, getNewNotebook, notebooksDb, ui } from "./store";
import { evaluate } from "./evaluate";
import { DropZone } from "./Dropzone";
import { cmLoadExpressionWidget } from "./cm-load-widget";
import { Menu, MenuButton, MenuItem, MenuList } from "@reach/menu-button";

function Sidebar() {
  const files = useAtomValue(filesDb.entries);
  const del = useSetAtom(filesDb.delete);
  const addFilesToNotebook = useSetAtom(ui.addFilesToNotebook);
  const activeId = useAtomValue(ui.selectedNotebook);

  return (
    <div className={sidebarContainer}>
      <Header>Files</Header>
      <div className={sidebarPanel}>
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
      </div>
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
        extensions={[javascript(), cmLoadExpressionWidget]}
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

function Header({ children }: React.PropsWithChildren<{}>) {
  return <div className={header}>{children}</div>;
}

function NotebookMenu() {
  const [selected, setSelected] = useAtom(ui.selectedNotebook);
  const notebooks = useAtomValue(notebooksDb.entries);
  const [_, selectedNotebook] =
    notebooks.find(([id, nb]) => id === selected) || [];
  const createItem = useSetAtom(notebooksDb.set);

  return (
    <Menu>
      <MenuButton className={menuButton}>
        {selectedNotebook?.name}
        <div aria-hidden className={menuTriangle}>
          ▼
        </div>
      </MenuButton>
      <MenuList className={menuList}>
        {notebooks.map(([id, notebook]) => (
          <MenuItem
            key={id}
            onSelect={() => setSelected(id)}
            className={menuItem[id === selected ? "active" : "normal"]}
          >
            {notebook.name}
          </MenuItem>
        ))}
        <MenuItem
          className={menuItem.normal}
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
          Add ➕
        </MenuItem>
      </MenuList>
    </Menu>
  );
}

function App() {
  return (
    <div className={container}>
      <PanelGroup autoSaveId="main" direction="horizontal" className={panels}>
        <Panel defaultSize={50}>
          <PanelGroup autoSaveId="first" direction="vertical">
            <Panel defaultSize={60}>
              <Header>
                <NotebookMenu />
              </Header>
              <Notebook />
            </Panel>
            <PanelResizeHandle className={handleHorizontal} />
            <Panel>
              <Sidebar />
            </Panel>
          </PanelGroup>
        </Panel>
        <PanelResizeHandle className={handle} />
        <Panel>
          <Header>Output</Header>
          <Results />
        </Panel>
      </PanelGroup>
    </div>
  );
}

export default App;
