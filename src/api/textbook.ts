import { addTextbookSchemaType } from "@/lib/form-validation";
import {
  doc,
  setDoc,
  getDoc,
  db,
  addDoc,
  collection,
} from "@/lib/firebase-init";
import { uploadFile } from "./imagekit";

export const addTextBook = async (
  data: addTextbookSchemaType & { added_by: string }
) => {
  const uploadData = await uploadFile(data.cover);

  if (!uploadData || !uploadData.url) {
    console.error("eror image");
    throw new Error("Imagekit error");
  }
  const updatedData = {
    ...data,
    cover: uploadData.url,
    added_by: data.added_by,
    created_at: new Date(),
  };
  console.log(updatedData);
  const docRef = await addDoc(collection(db, "textbook"), updatedData);
  if (!docRef.id) throw new Error("Firebase error");
};
