'use client';

import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "@/app/firebase/config";
import { signOut } from "firebase/auth";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function Home() {
  const [user, loading] = useAuthState(auth);
  const router = useRouter();
  const [userSession, setUserSession] = useState<string | null>(null);

  useEffect(() => {
    setUserSession(sessionStorage.getItem("user"));
  }, []);

  useEffect(() => {
    if (!loading && !user && !userSession) {
      router.push("/sign-up");
    }
  }, [user, userSession, loading, router]);

  if (loading) return <p className="p-10 text-center">Checking authentication...</p>;

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-900 text-white">
      <h1 className="text-3xl mb-5">Welcome {user?.email || "User"}!</h1>
      <button
        onClick={() => {
          signOut(auth);
          sessionStorage.removeItem("user");
          router.push("/sign-up");
        }}
        className="bg-red-600 hover:bg-red-500 px-5 py-2 rounded"
      >
        Log Out
      </button>
    </div>
  );
}
