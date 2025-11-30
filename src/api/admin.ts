import {
  db,
  getDocs,
  query,
  collection,
  orderBy,
  doc,
  updateDoc,
  deleteDoc,
  where,
} from "@/lib/firebase-init";
import { IGetAdmin, IUpdateAdmin } from "@/lib/types";

export const getAdmin = async (): Promise<IGetAdmin[]> => {
  const snapshot = await getDocs(
    query(collection(db, "admin"), orderBy("created_at"))
  );
  if (!snapshot.docs) throw new Error("Firebase Error");
  console.log(snapshot.docs);
  return snapshot.docs.map((doc) => ({
    ...(doc.data() as IGetAdmin),
  }));
};
export const updateAdmin = async (data: IUpdateAdmin, uid: string) => {
  const adminRef = doc(db, "admin", uid);
  if (!adminRef.id) throw new Error("Admin not found");
  try {
    await updateDoc(adminRef, {
      ...data,
    });
    console.log("Admin updated successfully");
  } catch (error) {
    throw new Error("Update error");
  }
};
export const deleteAdmin = async (email: string) => {
  try {
    const querySnapshot = await getDocs(
      query(collection(db, "admin"), where("email", "==", email))
    );
    if (querySnapshot) {
      querySnapshot.forEach((doc) => {
        deleteDoc(doc.ref);
      });
    }
  } catch (error) {
    throw error;
  }
};
