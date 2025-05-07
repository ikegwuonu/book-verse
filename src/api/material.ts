import { addMaterialSchemaType } from "@/lib/form-validation";
import { uploadFile } from "./imagekit";
import {
  addDoc,
  collection,
  db,
  deleteDoc,
  doc,
  getDocs,
  orderBy,
  query,
  updateDoc,
} from "@/lib/firebase-init";
import { IGetMaterial } from "@/lib/types";

export const addMaterial = async (
  data: addMaterialSchemaType & { added_by: string }
) => {
  const uploadDoc = await uploadFile(data.document);

  if (!uploadDoc || !uploadDoc.url) {
    throw new Error("Doc Imagekit error");
  }

  const updatedData = {
    ...data,

    document: uploadDoc.url,
    added_by: data.added_by,
    created_at: new Date(),
  };
  console.log(updatedData);
  const docRef = await addDoc(collection(db, "material"), updatedData);
  if (!docRef.id) throw new Error("Firebase error");
};

export const getAllMaterials = async (): Promise<
  (IGetMaterial & { id: string })[]
> => {
  const snapshot = await getDocs(
    query(collection(db, "material"), orderBy("created_at"))
  );
  if (!snapshot.docs) throw new Error("Firebase Error");
  return snapshot.docs.map((doc) => ({
    id: doc.id,
    ...(doc.data() as IGetMaterial),
  }));
};
export const deleteMaterial = async (id: string) => {
  try {
    await deleteDoc(doc(db, "material", id));
  } catch (error) {
    throw error;
  }
};
export const updateMaterial = async (
  id: string,
  data: Partial<IGetMaterial>
) => {
  const materialRef = doc(db, "material", id);
  if (!materialRef.id) throw new Error("Material not found");
  try {
    await updateDoc(materialRef, {
      ...data,
    });
    console.log("   Material updated successfully");
  } catch (error) {
    throw new Error("Update error");
  }
};
