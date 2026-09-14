interface ChipProps {
  children: string;
}

/** A compact tag for technologies. Always rendered inside a `<ul>`. */
export function Chip({ children }: ChipProps) {
  return (
    <li className="border-border bg-card text-foreground rounded-md border px-2.5 py-1 font-mono text-xs">
      {children}
    </li>
  );
}

interface ChipListProps {
  items: readonly string[];
  label: string;
}

export function ChipList({ items, label }: ChipListProps) {
  return (
    <ul aria-label={label} className="flex flex-wrap gap-2">
      {items.map((item) => (
        <Chip key={item}>{item}</Chip>
      ))}
    </ul>
  );
}
