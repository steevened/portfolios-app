"use client";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { deleteLanguage } from "@/lib/actions";
import { Language } from "@prisma/client";

export default function LanguageBadge({ language }: { language: Language }) {
  return (
    <span>
      <Badge className="flex justify-between gap-2.5">
        {language.name}
        <span>
          <Button
            onClick={() => deleteLanguage({ id: language.id })}
            type="button"
            size={"icon"}
            variant={"ghostDestructive"}
            className="w-5 h-5 text-white hover:text-destructive rounded-full"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-4 w-4"
              viewBox="0 0 24 24"
            >
              <path
                fill="currentColor"
                d="m12 13.4l-2.917 2.925q-.276.275-.704.275t-.704-.275q-.275-.275-.275-.7t.275-.7L10.6 12L7.675 9.108Q7.4 8.832 7.4 8.404q0-.427.275-.704q.275-.275.7-.275t.7.275L12 10.625L14.892 7.7q.276-.275.704-.275q.427 0 .704.275q.3.3.3.712t-.3.688L13.375 12l2.925 2.917q.275.276.275.704t-.275.704q-.3.3-.712.3t-.688-.3z"
              ></path>
            </svg>
          </Button>
        </span>
      </Badge>
    </span>
  );
}
