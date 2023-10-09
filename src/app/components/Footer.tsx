"use client";
import React from "react";
import { socialLinks } from "@data/socialLinks";

export function Footer(): ReturnType<React.FC> {
  return (
    <div className="flex flex-col gap-6 items-center">
      <h1 className="text-3xl text-primary">Follow me</h1>
      <div className="flex gap-4 sm:gap-8">
        {socialLinks.map(({ url, icon, ariaLabel }, index) => (
          <a
            href={url}
            target="__blank"
            aria-label={ariaLabel}
            key={index}
            className="p-4 bg-primary-bg hover:bg-secondary-bg shadow-sm rounded-md"
          >
            <i className="text-xl text-secondary sm:text-2xl md:text-3xl">
              {React.createElement(icon)}
            </i>
          </a>
        ))}
      </div>
    </div>
  );
}
