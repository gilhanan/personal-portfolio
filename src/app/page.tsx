import { Banner } from "@components/Banner";
import { Projects } from "@components/Projects";

export default function Home() {
  return (
    <div className="flex flex-col gap-16">
      <Banner />
      <Projects />
    </div>
  );
}
