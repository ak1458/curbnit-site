/** Row of pill tags with an accent dot (service areas, credentials, etc.). */
export function ServiceTags({ items }: { items: readonly string[] }) {
  return (
    <div className="tags">
      {items.map((t) => (
        <span className="tag" key={t}>
          <span className="dot" />
          {t}
        </span>
      ))}
    </div>
  );
}
