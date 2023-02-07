import { useSetAtom } from "jotai/react";
import { forwardRef, useImperativeHandle } from "react";
import { useDropzone } from "react-dropzone";

import { dropzone } from "./dropzone.css";
import { filesDb } from "../../store";

export const DropZone = forwardRef(function DropZoneComponent(
  {
    children,
    onAdd,
  }: React.PropsWithChildren<{ onAdd?: (fileIds: string[]) => void }>,
  ref
) {
  const addFile = useSetAtom(filesDb.set);

  const { getRootProps, getInputProps, isDragActive, open } = useDropzone({
    onDrop: async (dropped: File[]) => {
      const ids: string[] = [];
      for (const droppedFile of dropped) {
        await addFile(droppedFile.name, {
          content: await droppedFile.text(),
          createdAt: Date.now(),
        });
        ids.push(droppedFile.name);
      }

      onAdd?.(ids);
    },
    multiple: true,
    noClick: true,
  });

  useImperativeHandle(
    ref,
    () => ({
      open,
    }),
    [open]
  );

  return (
    <div
      className={dropzone({ active: isDragActive ? "yes" : "no" })}
      {...getRootProps()}
    >
      <input {...getInputProps()} />
      {children}
    </div>
  );
});
