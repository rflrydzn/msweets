import { supabase } from "./supabase";
export const getPublicURL = async (file: File | null) => {
  if (!file) return;
  try {
    const originalName = file.name;
    const nameWithoutExt = originalName.replace(/\.[^/.]+$/, "");
    const jpgFileName = `${nameWithoutExt}.jpg`;

    const filepath = `public/${Date.now()}-${jpgFileName}`;

    let uploadFile = file;
    if (!originalName.toLowerCase().endsWith(".jpg")) {
      uploadFile = new File([file], jpgFileName, { type: "image/jpeg" });
    }

    const { data, error } = await supabase.storage
      .from("images")
      .upload(filepath, uploadFile);

    if (error) {
      console.error("Upload Error:", error);
      throw error;
    }

    const {
      data: { publicUrl },
    } = supabase.storage.from("images").getPublicUrl(filepath);

    console.log("Uploaded successfully", data);

    return publicUrl;
  } catch (error) {
    console.error("Error uploading file:", error);
    throw error;
  } finally {
  }
};
