"use client";

import Profile from "@/components/profile";
import { useSession, signIn, signOut } from "next-auth/react";

export default function Home() {
  const { data, status } = useSession();
  if (status === "loading")
    return (
      <>
        <p>loading...</p>
      </>
    );
  else if (status === "unauthenticated")
    return (
      <>
        <button onClick={() => signIn()}>Sign In</button>
      </>
    );
  else if (status === "authenticated")
    return (
      <Profile></Profile>
    );
}
