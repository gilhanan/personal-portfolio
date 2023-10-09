"use client";
import { useState } from "react";
import { Category } from "@shared/models";
import { projects } from "@data/projects";
import CategoriesDropdown from "@components/CategoriesDropdown";
import { ProjectTile } from "@components/ProjectTile";
import { Search } from "@components/Search";

export function Projects(): ReturnType<React.FC> {
  const [searchTerm, setSearchTerm] = useState<string>();
  const [category, setCategory] = useState<Category>();

  const filteredProjects = projects.filter((project) => {
    const isCategoryMatch = category ? project.category === category : true;
    const isSearchMatch = searchTerm
      ? project.title.toLowerCase().includes(searchTerm.toLowerCase())
      : true;
    return isCategoryMatch && isSearchMatch;
  });

  return (
    <section>
      <div className="text-center">
        <h1 className="text-3xl text-primary">Projects portfolio</h1>
      </div>
      <div className="mt-4">
        <p className="text-secondary">
          Search projects by title or filter by category
        </p>
        <div className="flex flex-col gap-2 sm:flex-row justify-between mt-2">
          <Search onSearchChange={setSearchTerm} />
          <CategoriesDropdown onCategoryChange={setCategory} />
        </div>
      </div>
      <hr className="mt-6" />
      <div className="mt-6">
        {filteredProjects.length === 0 && (
          <p className="text-center text-secondary">No projects found</p>
        )}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {filteredProjects
            .sort((a, b) => a.category.localeCompare(b.category))
            .map((project, index) => (
              <ProjectTile key={index} {...project} />
            ))}
        </div>
      </div>
    </section>
  );
}
