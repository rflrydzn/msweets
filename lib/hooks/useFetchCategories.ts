import { supabase } from "@/lib/supabase";
import { useQuery } from "@tanstack/react-query";

const fetchCategories = async () => {
  const { data, error } = await supabase.from("categories").select();

  if (error) {
    console.error("Error", error);
  }

  return data;
};

export function useFetchCategories() {
  return useQuery({
    queryKey: ["categories"],
    queryFn: () => fetchCategories(),
  });
}
