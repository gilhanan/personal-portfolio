import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Contact",
};

export default function ContactLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="mt-12 sm:mt-6">
      <section className="max-w-[640px] mx-auto">
        <h1 className="text-3xl text-primary text-center">Contact</h1>
        <div className="mt-4">{children}</div>
      </section>
    </div>
  );
}
