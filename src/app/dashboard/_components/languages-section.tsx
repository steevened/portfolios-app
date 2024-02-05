import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { createTechnology } from "@/lib/actions/technologies.action";
import { getAllTechnologies } from "@/lib/services/technologies.service";
import TechBadge from "./language-badge";
import { prisma } from "@/lib/db/prisma";

export default async function TechSection() {
  const technologies = await getAllTechnologies();

  const languages = await prisma.language.findMany();

  return (
    <form action={createTechnology} className="grid gap-5">
      <div>
        <h3>Programming languages</h3>
        <p className="text-muted-foreground text-sm">
          {languages.length > 0
            ? `This is a list of all the programming languages that the users can choose from. You can add more by clicking the button below.`
            : "No programming languages found"}
        </p>
      </div>

      {languages.length > 0 ? (
        <ul className="flex flex-wrap gap-2.5">
          {languages.map((l) => (
            <li key={l.id} className="relative">
              <TechBadge technology={l} />
            </li>
          ))}
        </ul>
      ) : null}

      <Input
        name="language-name"
        placeholder="Write some programming language..."
      />
      <div>
        <Button>Add Programmin language</Button>
      </div>
    </form>
  );
}
