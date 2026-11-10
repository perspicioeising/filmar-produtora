export function PageHeader({
  title,
  description,
  action,
}: {
  title: string;
  description?: string;
  action?: React.ReactNode;
}) {
  return (
    <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
      <div>
        <h1 className="text-3xl text-mist-100 sm:text-4xl">{title}</h1>
        {description && (
          <p className="mt-2 max-w-xl text-sm text-mist-500">{description}</p>
        )}
      </div>
      {action}
    </div>
  );
}
