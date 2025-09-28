import { useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "../supabase";
import { AddProduct, Product } from "../types/types";

async function insertProduct(product: AddProduct) {
  const { error } = await supabase.from("products").insert(product);
  if (error) throw new Error();
}

export const useAddProduct = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: insertProduct,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["table-products"] });
    },
  });
};
