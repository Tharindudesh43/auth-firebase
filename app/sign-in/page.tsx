'use client';

import { useState } from "react";
import { useSignInWithEmailAndPassword } from "react-firebase-hooks/auth";
import { auth } from "@/app/firebase/config";
import { useRouter } from "next/navigation";

export default function SignIn() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [signInWithEmailAndPassword, user, loading, error] = useSignInWithEmailAndPassword(auth);
  const router = useRouter();

  const handleSignIn = async () => {
    if (!email || !password) return alert("Fill all fields!");
    const res = await signInWithEmailAndPassword(email, password);
    if (res) {
      sessionStorage.setItem("user", "true");
      router.push("/");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-900">
      <div className="bg-gray-800 p-10 rounded-lg shadow-xl w-96">
        <h1 className="text-white text-2xl mb-5">Sign In</h1>
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full p-3 mb-4 bg-gray-700 rounded text-white placeholder-gray-400 outline-none"
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full p-3 mb-4 bg-gray-700 rounded text-white placeholder-gray-400 outline-none"
        />
        <button
          onClick={handleSignIn}
          className="w-full p-3 bg-indigo-600 hover:bg-indigo-500 rounded text-white"
        >
          {loading ? "Signing in..." : "Sign In"}
        </button>
        {error && <p className="text-red-500 mt-2">{error.message}</p>}
      </div>
    </div>
  );
}
