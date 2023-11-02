import Link from "next/link";
import { ThemedImage } from "@components/ThemedImage";

export interface ButtonLinkProps {
  url: string;
  text: string;
  lightSrc: string;
  darkSrc: string;
}

export function ButtonLink({
  url,
  text,
  lightSrc,
  darkSrc,
}: ButtonLinkProps): ReturnType<React.FC> {
  return (
    <Link
      href={url}
      target="_blank"
      className="flex gap-2 text-sm items-center p-1 border rounded-md shadow-sm hover:bg-slate-100 dark:hover:bg-slate-800"
    >
      <ThemedImage
        lightSrc={lightSrc}
        darkSrc={darkSrc}
        width={30}
        alt={text}
      />
      <span className="text-primary">{text}</span>
    </Link>
  );
}
