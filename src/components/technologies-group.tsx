import { getAllTechnologies } from "@/lib/services/technologies.service";
import ToggleTechnology from "./toggle-technology";

export default async function TechnologiesGroup({
  searchParams,
}: {
  searchParams: {
    [key: string]: string | string[] | undefined;
  };
}) {
  const technologies = await getAllTechnologies();
  return <ToggleTechnology technologies={technologies} />;
}
