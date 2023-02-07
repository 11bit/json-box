import * as s from "./PanelHeader.css";

export function PanelHeader({
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
