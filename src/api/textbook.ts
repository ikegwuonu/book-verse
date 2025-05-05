import { addTextbookSchemaType } from "@/lib/form-validation";
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
} from "@/lib/firebase-init";
import { uploadFile } from "./imagekit";
import { IGetTextBook } from "@/lib/types";

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
