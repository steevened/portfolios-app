import Stepper from "./components/stepper";

export default function Page() {
  return (
    <div>
      <Stepper />
      <main className="min-h-screen mx-auto max-w-screen-sm my-5">
        <div className="leading-10 text-center">
          <h1 className="text-3xl font-semibold">Create a project</h1>
          <p> Click on the button below when you were ready.</p>
        </div>
      </main>
    </div>
  );
}
