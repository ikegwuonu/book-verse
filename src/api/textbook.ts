import {
  addTextbookSchemaType,
  updateTextbookSchemaType,
} from "@/lib/form-validation";
import {
  doc,
  setDoc,
  getDoc,
  db,
  addDoc,
  collection,
  getCountFromServer,
  query,
  orderBy,
  limit,
  startAfter,
  getDocs,
  deleteDoc,
  updateDoc,
} from "@/lib/firebase-init";
import { uploadFile } from "./imagekit";
import { IGetTextBook, IUpdateTextbook } from "@/lib/types";

export const addTextBook = async (
  data: addTextbookSchemaType & { added_by: string }
) => {
  const uploadImage = await uploadFile(data.cover);

  if (!uploadImage || !uploadImage.url) {
    throw new Error("Image Imagekit error");
  }
  const uploadDoc = await uploadFile(data.document);

  if (!uploadDoc || !uploadDoc.url) {
    throw new Error("Doc Imagekit error");
  }

  const updatedData = {
    ...data,
    cover: uploadImage.url,
    document: uploadDoc.url,
    added_by: data.added_by,
    created_at: new Date(),
  };
  console.log(updatedData);
  const docRef = await addDoc(collection(db, "textbook"), updatedData);
  if (!docRef.id) throw new Error("Firebase error");
};

interface GetTextbooksProps {
  totalCount: number;
  totalPages: number;
  textbooks: (IGetTextBook & { id: string })[];
}

let lastVisible: any = null;
const pageSize = 10;

export const getAllTextbooks = async (): Promise<
  (IGetTextBook & { id: string })[]
> => {
  const snapshot = await getDocs(
    query(collection(db, "textbook"), orderBy("created_at"))
  );
  if (!snapshot.docs) throw new Error("Firebase Error");
  return snapshot.docs.map((doc) => ({
    id: doc.id,
    ...(doc.data() as IGetTextBook),
  }));
};
export const deleteTextbook = async (id: string) => {
  try {
    await deleteDoc(doc(db, "textbook", id));
  } catch (error) {
    throw error;
  }
};

export const updateTextbook = async (id: string, data: IUpdateTextbook) => {
  const textbookRef = doc(db, "textbook", id);
  if (!textbookRef.id) throw new Error("Textbook not found");
  try {
    await updateDoc(textbookRef, {
      ...data,
    });
    console.log("Textbook updated successfully");
  } catch (error) {
    throw new Error("Update error");
  }
};
