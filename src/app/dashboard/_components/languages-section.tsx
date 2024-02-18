import { prisma } from "@/lib/db/prisma";
import LanguageBadge from "./language-badge";
import LanguagesForm from "./languages-form";

export default async function TechSection() {
  const languages = await prisma.language.findMany();

  return (
    <div className="grid gap-5">
      <div>
        <h3>Programming languages</h3>
        <p className="text-muted-foreground text-sm">
          {languages.length > 0
            ? `This is a list of all the programming languages that the users can choose from. You can add more by clicking the button below.`
            : "Add some programming languages to the list."}
        </p>
      </div>

      {languages.length > 0 ? (
        <ul className="flex flex-wrap gap-2.5">
          {languages.map((l) => (
            <li key={l.id} className="relative">
              <LanguageBadge language={l} />
            </li>
          ))}
        </ul>
      ) : null}

      <LanguagesForm />
    </div>
  );
}
