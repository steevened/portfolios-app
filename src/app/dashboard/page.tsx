import LanguagesSection from "./_components/languages-section";

export default async function Page() {
  return (
    <div className="grid gap-10 p-2.5">
      <div className="pb-2.5 border-b">
        <LanguagesSection />
      </div>
      <div className="py-5 border-b"></div>
    </div>
  );
}
