function Example() {
  return (
    <div className="max-w-lg sm:grid-cols-2 lg:grid-cols-3 grid w-full grid-cols-1 gap-3">
      {["One", "Two", "Three"].map((label) => (
        <div
          key={label}
          className="rounded-lg border border-default bg-surface-secondary px-4 py-6 text-center text-sm"
        >
          {label}
        </div>
      ))}
    </div>
  )
}

export { Example }
