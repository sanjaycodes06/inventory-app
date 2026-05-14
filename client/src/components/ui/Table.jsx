export default function Table({ columns, rows }) {
  return (
    <div className="overflow-hidden rounded-xl border border-white/10 bg-slate-900/40 shadow-lg shadow-black/30 backdrop-blur-sm">
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-white/10 text-left text-sm">
          <thead className="bg-white/5">
            <tr>
              {columns.map((c) => (
                <th
                  key={c.key}
                  scope="col"
                  className="whitespace-nowrap px-4 py-3 font-semibold text-slate-400 first:pl-6 last:pr-6"
                >
                  {c.label}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-white/5">
            {rows.length === 0 ? (
              <tr>
                <td colSpan={columns.length} className="px-6 py-12 text-center text-slate-500">
                  No rows to display.
                </td>
              </tr>
            ) : (
              rows.map((row, i) => (
                <tr key={row.id ?? i} className="transition hover:bg-white/[0.04]">
                  {columns.map((c) => (
                    <td key={c.key} className="whitespace-nowrap px-4 py-3 text-slate-200 first:pl-6 last:pr-6">
                      {row[c.key]}
                    </td>
                  ))}
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
