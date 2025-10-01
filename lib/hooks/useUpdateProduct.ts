import { supabase } from "../supabase";
import {
  useMutation,
  useQueryClient,
  useMutationState,
} from "@tanstack/react-query";
import { getPublicURL } from "../getPublicUrl";

type UpdateProductProps = {
  id: number;
  name: string;
  price: string | number;
  file: File | null;
};
export const useUpdateProduct = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async ({ id, name, price, file }: UpdateProductProps) => {
      const publicUrl = await getPublicURL(file);
      const { error } = await supabase
        .from("products")
        .update({
          name: name,
          price: Number(price),
          image_url: publicUrl,
        })
        .eq("id", id);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["table-products"] });
    },
  });
};
