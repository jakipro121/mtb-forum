"use client";

import styles from "@/css/forum.module.css";
import poststyles from "@/css/createpost.module.css";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

export default function Home() {
  const { push, refresh } = useRouter();
  const { status } = useSession();

  if (status === "loading") {
    return <p>Loading...</p>;
  }

  if (status === "unauthenticated") {
    return <p>Access Denied</p>;
  }

  function sendPost() {
    if (typeof window !== "undefined") {
      const postText = document.getElementById("postText").value;
      const title = document.getElementById("title").value;
      const data = JSON.stringify({
        postText,
        title,
      });
      const host = window.location.origin;
      const res = fetch(`${host}/api/post/`, {
        method: "POST",
        cache: "no-store",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
        body: data,
      }).then((response) => {
        response.json().then((res) => {
          if (res.success === "true") {
            console.log("Uspjeh");
            push("/forum?reload=true");
          }
        });
      });
    }
  }
  return (
    <main className={`${styles.main}`}>
      <div>
        <input type="text" id="title" placeholder="Title" />
        <textarea
          type="text"
          id="postText"
          className={poststyles.postcontent}
          placeholder="Text"
        />
        <button onClick={() => sendPost()}>Send</button>
      </div>
    </main>
  );
}
