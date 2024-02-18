import Stepper from "./create/_components/stepper";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="p-2.5">
      <Stepper />
      <main className=" mx-auto max-w-screen-md my-5 @container">
        {children}
      </main>
    </div>
  );
}
