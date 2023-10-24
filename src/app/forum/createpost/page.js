"use client";

import styles from "@/css/forum.module.css";
import poststyles from "@/css/createpost.module.css";
import { useSession, getSession } from "next-auth/react"

export default function Home() {

  const { data: session, status } = useSession()

  if (status === "loading") {
    return <p>Loading...</p>
  }

  if (status === "unauthenticated") {
    return <p>Access Denied</p>
  }

  function sendPost() {
    if (typeof window !== "undefined") {
      const postText = document.getElementById("postText").value;
      const title = document.getElementById("title").value;
      console.log({ postText, title });
      const data = JSON.stringify({
        postText,
        title,
      });
      const res = fetch(
        `http://${process.env.NEXT_PUBLIC_VERCEL_URL}/api/post/`,
        {
          method: "POST",
          cache: "no-store",
          credentials: "include",
          headers: {
            "Content-Type": "application/json",
          },
          body: data,
        }
      ).then((response) => {
        response.json().then((res) => {
          console.log(res);
          if (res.success === "true") {
            console.log("Uspjeh");
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
