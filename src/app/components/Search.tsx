interface SearchProps {
  onSearchChange: (search: string) => void;
}

export function Search({ onSearchChange }: SearchProps) {
  return (
    <input
      onChange={({ target: { value } }) => {
        onSearchChange(value);
      }}
      className="text-sm sm:text-base text-secondary px-4 py-2 border rounded-lg bg-input-bg"
      type="search"
      placeholder="Search Projects"
      aria-label="Search projects"
    />
  );
}
