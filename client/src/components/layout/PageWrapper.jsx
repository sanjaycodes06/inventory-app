export default function PageWrapper({ title, description, children, actions }) {
  return (
    <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
      {(title || description || actions) && (
        <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <div>
            {title ? (
              <h2 className="font-display text-2xl font-semibold tracking-tight text-white">{title}</h2>
            ) : null}
            {description ? <p className="mt-1 max-w-2xl text-sm text-slate-400">{description}</p> : null}
          </div>
          {actions ? <div className="flex shrink-0 flex-wrap gap-2">{actions}</div> : null}
        </div>
      )}
      {children}
    </div>
  );
}
