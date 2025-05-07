import { db, doc, getDoc, setDoc } from "@/lib/firebase-init";
import { subscribeNewsletterSchemaType } from "@/lib/form-validation";
import IsEmail from "isemail";

export const subscribeNewsletter = async (
  data: subscribeNewsletterSchemaType
) => {
  try {
    if (!IsEmail.validate(data.email)) {
      throw new Error("Not a valid email");
      return;
    }
    const emailRef = doc(db, "newsletter", data.email);
    const emailDoc = await getDoc(emailRef);

    if (emailDoc.exists()) {
      throw new Error("Email already exists!");
    }
    await setDoc(emailRef, {
      ...data,
      created_at: new Date(),
    });
  } catch (error) {
    throw error;
  }
};
