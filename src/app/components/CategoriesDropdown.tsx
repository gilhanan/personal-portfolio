import { FC } from "react";
import { Category, categories } from "@shared/models";

interface CategoriesDropdownProps {
  onCategoryChange: (category: Category) => void;
}

export default function CategoriesDropdown({
  onCategoryChange,
}: CategoriesDropdownProps): ReturnType<FC> {
  return (
    <select
      onChange={({ target: { value } }) => {
        onCategoryChange(value as Category);
      }}
      className="text-sm sm:text-base text-secondary pl-4 pr-10 py-2 border rounded-lg bg-input-bg"
      aria-label="Select a category"
    >
      <option className="text-secondary" value="">
        All categories
      </option>
      {categories.map((option) => (
        <option className="text-secondary" key={option}>
          {option}
        </option>
      ))}
    </select>
  );
}
