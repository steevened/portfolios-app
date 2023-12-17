import { getProjectUnpublished } from "@/lib/services/projects.service";
import { getAllTechnologies } from "@/lib/services/technologies.service";
import ProjectDetails from "./components/project-form";
import Stepper from "./components/stepper";

export default async function Page() {
  const technologies = await getAllTechnologies();

  const projectUnpublished = await getProjectUnpublished();

  return (
    <div>
      <Stepper />
      <main className="min-h-screen mx-auto max-w-screen-sm my-5 @container">
        <div className="leading-10 text-center">
          <h1 className="text-3xl font-semibold">Create a project</h1>
          <p> Click on the button below when you were ready.</p>

          <div className="">
            <ProjectDetails
              initialProject={projectUnpublished}
              technologies={technologies}
            />
          </div>
        </div>
      </main>
    </div>
  );
}
