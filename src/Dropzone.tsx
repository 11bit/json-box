import { useSetAtom } from "jotai/react";
import { useDropzone } from "react-dropzone";

import { dropzone } from "./dropzone.css";
import { filesDb } from "./store";

export function DropZone({
  children,
  onAdd,
}: React.PropsWithChildren<{ onAdd: (fileIds: string[]) => void }>) {
  const addFile = useSetAtom(filesDb.set);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop: async (dropped: File[]) => {
      const ids: string[] = [];
      for (const droppedFile of dropped) {
        const id = crypto.randomUUID();
        await addFile(id, {
          name: droppedFile.name,
          content: await droppedFile.text(),
          createdAt: Date.now(),
        });
        ids.push(id);
      }

      onAdd(ids);
    },
    multiple: false,
    noClick: true,
  });

  return (
    <div
      className={dropzone({ active: isDragActive ? "yes" : "no" })}
      {...getRootProps()}
    >
      <input {...getInputProps()} />
      {children}
    </div>
  );
}
