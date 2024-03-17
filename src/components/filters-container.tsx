import { getLanguages } from "@/lib/services";
import FiltersDrawer from "./filters-drawer";

export default async function FiltersContainer() {
  const languages = await getLanguages();
  return <FiltersDrawer languages={languages} />;
}
