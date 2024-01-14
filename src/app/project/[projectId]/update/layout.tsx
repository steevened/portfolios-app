import Stepper from "../../create/components/stepper";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="">
      <Stepper />
      <main className="min-h-screen mx-auto max-w-screen-md my-5 @container">
        <div className=" text-center">
          <h1 className="text-3xl font-semibold">Update project</h1>
          <p> Click on the button below when you were ready.</p>

          <div className="my-5">{children}</div>
        </div>
      </main>
    </div>
  );
}
