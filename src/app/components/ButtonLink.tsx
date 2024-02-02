import Link from "next/link";

export interface ButtonLinkProps {
  url: string;
  text: string;
}

export function ButtonLink({
  url,
  text,
  children,
}: React.PropsWithChildren<ButtonLinkProps>): ReturnType<React.FC> {
  return (
    <Link
      href={url}
      target="_blank"
      className="flex gap-2 text-sm items-center p-1 border rounded-md shadow-sm hover:bg-slate-100 dark:hover:bg-slate-800"
    >
      <div className="w-8 h-8 p-1">{children}</div>
      <span className="text-primary">{text}</span>
    </Link>
  );
}
