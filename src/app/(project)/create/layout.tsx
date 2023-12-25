import Stepper from "./components/stepper";

export default function layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="">
      <Stepper />
      <main className="min-h-screen mx-auto max-w-screen-md my-5 @container">
        <div className=" text-center">
          <h1 className="text-3xl font-semibold">Create a project</h1>
          <p> Click on the button below when you are ready.</p>

          <div className="my-5">{children}</div>
        </div>
      </main>
    </div>
  );
}
