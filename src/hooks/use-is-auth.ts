"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { onAuthStateChanged } from "firebase/auth";
import { useAdminFirebaseStore } from "@/zustand/adminFirebase";
import { auth } from "@/lib/firebase-init";
import Loader from "@/providers/app-loader";
import { routes } from "@/lib/routes";

export function useIsAuth() {
  const router = useRouter();
  const [authChecked, setAuthChecked] = useState(false);
  const setAdminFirebaseStore =
    useAdminFirebaseStore.getState().setAdminFirebaseStore;
  const logOutAdminFirebaseStore =
    useAdminFirebaseStore.getState().logOutAdminFirebaseStore;

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (firebaseUser) => {
      if (firebaseUser) {
        setAdminFirebaseStore(firebaseUser);
        setAuthChecked(true);
      } else {
        logOutAdminFirebaseStore();
        router.replace(routes.login); // redirect if not authenticated
      }
    });

    return () => unsubscribe();
  }, [router]); // ✅ include router

  return authChecked;
}
