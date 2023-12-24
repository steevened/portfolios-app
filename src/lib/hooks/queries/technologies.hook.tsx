import { getAllTechnologies } from "@/lib/services/technologies.service";
import { useQuery } from "@tanstack/react-query";

export const useGetAllTechnologies = () => {
  const { data, isLoading } = useQuery({
    queryKey: ["technologies"],
    queryFn: getAllTechnologies,
  });

  return {
    data,
    isLoading,
  };
};
