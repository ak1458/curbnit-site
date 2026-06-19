/** Small uppercase label with an accent dash, sits above headings. */
export function Eyebrow({ children, plain = false }: { children: React.ReactNode; plain?: boolean }) {
  return <span className={"eyebrow" + (plain ? " eyebrow--plain" : "")}>{children}</span>;
}
