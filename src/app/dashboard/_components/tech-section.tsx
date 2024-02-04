import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { createTechnology } from "@/lib/actions/technologies.action";
import { getAllTechnologies } from "@/lib/services/technologies.service";
import TechBadge from "./tech-badge";

export default async function TechSection() {
  const technologies = await getAllTechnologies();

  return (
    <form action={createTechnology} className="grid gap-5">
      <div>
        <h3>Programming languages</h3>
        <p className="text-muted-foreground text-sm">
          {technologies.length > 0
            ? `This is a list of all the programming languages that the users can choose from. You can add more by clicking the button below.`
            : "No technologies found"}
        </p>
      </div>

      {technologies.length > 0 ? (
        <ul className="flex flex-wrap gap-2.5">
          {technologies.map((t) => (
            <li key={t.id} className="relative">
              <TechBadge technology={t} />
            </li>
          ))}
        </ul>
      ) : null}

      <Input name="technology-name" placeholder="Write some technology..." />
      <div>
        <Button>Add Technology</Button>
      </div>
    </form>
  );
}
