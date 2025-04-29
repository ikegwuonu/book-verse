import { getAuth, sendSignInLinkToEmail } from "firebase/auth";
import { isSignInWithEmailLink, signInWithEmailLink } from "firebase/auth";
import { showerror, showsuccess } from "./toast";
import { app } from "./firebase";

const auth = getAuth(app);
export const actionCodeSettings = (email: string) => {
  return {
    // URL you want to redirect back to. The domain (www.example.com) for this
    // URL must be in the authorized domains list in the Firebase Console.
    url: `http://localhost:3000/admin/dashboard/add-admin?email=${email}`,
    // This must be true.
    handleCodeInApp: true,

    // The domain must be configured in Firebase Hosting and owned by the project.
    // linkDomain: `https://book-verse-eta.vercel.app/admin/login?email=${email}`,
  };
};

export const signUp = (email: string): boolean => {
  sendSignInLinkToEmail(auth, email, actionCodeSettings(email))
    .then(() => {})
    .catch((error) => {
      showerror(error.message);
      console.error("Error sending email link:", error);
      return false;
    });
  return true;
};

export const finishSignUp = (email: string) => {
  if (isSignInWithEmailLink(auth, window.location.href)) {
    // Additional state parameters can also be passed via URL.
    // This can be used to continue the user's intended action before triggering
    // the sign-in operation.
    // Get the email if available. This should be available if the user completes
    // the flow on the same device where they started it.
    //   let email = window.localStorage.getItem('emailForSignIn');
    //   if (!email) {
    // User opened the link on a different device. To prevent session fixation
    // attacks, ask the user to provide the associated email again. For example:
    //     email = window.prompt('Please provide your email for confirmation');
    //   }
    // The client SDK will parse the code from the link for you.
    signInWithEmailLink(auth, email, window.location.href)
      .then((result) => {
        // Clear email from storage.
        window.localStorage.removeItem("emailForSignIn");
        // You can access the new user by importing getAdditionalUserInfo
        // and calling it with result:
        // getAdditionalUserInfo(result)
        // You can access the user's profile via:
        // getAdditionalUserInfo(result)?.profile
        // You can check if the user is new or existing:
        // getAdditionalUserInfo(result)?.isNewUser
      })
      .catch((error) => {
        // Some error occurred, you can inspect the code: error.code
        // Common errors could be invalid email and invalid or expired OTPs.
      });
  }
};
