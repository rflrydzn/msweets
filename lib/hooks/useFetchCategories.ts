"use client";
import { supabase } from "@/lib/supabase";
import { useQuery } from "@tanstack/react-query";
import { Categories } from "../types/types";
const fetchCategories = async (): Promise<Categories[]> => {
  const { data, error } = await supabase.from("categories").select();

  if (error) {
    console.error("Error", error);
  }

  return data || [];
};

export function useFetchCategories() {
  return useQuery({
    queryKey: ["categories"],
    queryFn: () => fetchCategories(),
  });
}
