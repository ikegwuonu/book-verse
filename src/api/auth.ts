import { auth, db } from "@/lib/firebase-init";
import { addAdminSchemaType, loginSchemaType } from "@/lib/form-validation";
import { showsuccess } from "@/lib/toast";
import { IAdminInfo } from "@/lib/types";
import { handleApiError } from "@/lib/utils";

import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "firebase/auth";
import { doc, getDoc, setDoc } from "firebase/firestore";
import { uploadFile } from "./imagekit";
import { FirebaseError } from "firebase/app";

export const addAdmin = async (data: addAdminSchemaType) => {
  const emailRef = doc(db, "admin", data.email);
  const emailDoc = await getDoc(emailRef);

  if (emailDoc.exists()) {
    throw new Error("Email already exists!");
  }

  const create = await createUserWithEmailAndPassword(
    auth,
    data.email,
    data.last_name
  );
  if (!create.user) {
    throw new Error("Failed to create user");
  }

  const uploadData = await uploadFile(data.image);

  if (!uploadData || !uploadData.url) {
    throw new Error("Imagekit error");
  }

  await setDoc(emailRef, {
    ...data,
    image: uploadData.url,
    created_at: new Date(),
  });
};
export const logIn = async (data: loginSchemaType): Promise<IAdminInfo> => {
  try {
    const userCredential = await signInWithEmailAndPassword(
      auth,
      data.email,
      data.password
    );

    if (!userCredential.user) throw new Error("Unauthorized");

    const emailRef = doc(db, "admin", data.email);
    const emailDoc = await getDoc(emailRef);

    if (!emailDoc.exists()) {
      throw new Error("Admin record not found");
    }

    const userInfo = emailDoc.data() as IAdminInfo;
    return userInfo;
  } catch (error) {
    if (error instanceof FirebaseError) {
      handleApiError(error.code);
      handleApiError(error.message);
      // You can now display a custom message based on error.code
    } else {
      handleApiError(error);
    }

    throw error; // Ensure useMutation receives the error
  }
};
