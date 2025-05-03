"use client";

import { useEffect, useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import { onAuthStateChanged } from "firebase/auth";
import { useAdminFirebaseStore } from "@/zustand/adminFirebase";
import { auth } from "@/lib/firebase-init";
import Loader from "@/providers/app-loader";
import { adminRoutes, routes } from "@/lib/routes";

export function useIsAuth() {
  const router = useRouter();
  const pathname = usePathname();
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
        pathname === routes.login && router.replace(adminRoutes.admin);
      } else {
        logOutAdminFirebaseStore();
        router.replace(routes.login); // redirect if not authenticated
      }
    });

    return () => unsubscribe();
  }, [router]); // ✅ include router

  return authChecked;
}
