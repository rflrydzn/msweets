import { supabase } from "../supabase";
import {
  useMutation,
  useQueryClient,
  useMutationState,
} from "@tanstack/react-query";
import { getPublicURL } from "../getPublicUrl";
import { ProductOptions } from "../types/types";

type UpdateProductProps = {
  id: number;
  name: string;
  description: string;
  category_id?: number;
  options: ProductOptions;
  images: { file?: File; preview: string }[];
};
export const useUpdateProduct = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async ({
      id,
      name,
      description,
      category_id,
      options,
      images,
    }: UpdateProductProps) => {
      const publicUrls = await Promise.all(
        images.map((image) => {
          return image.file ? getPublicURL(image.file) : image.preview;
        })
      );

      const { error } = await supabase
        .from("products")
        .update({
          name: name,
          description: description,
          category_id: category_id,
          options: options,
          productGallery: publicUrls,
        })
        .eq("id", id);

      if (error) {
        throw new Error(error.message);
      }

      return true;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["table-products"] });
    },
  });
};
