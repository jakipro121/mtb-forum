"use client";

import styles from "@/css/forum.module.css"
import poststyles from "@/css/createpost.module.css";

export default function Home() {
  function sendPost() {
    if (typeof window !== "undefined") {
      let postText = document.getElementById("postText").value;
      console.log(postText);
    }
  }
  return (
    <main className={`${styles.main}`}>
      <div>
        <input type="text" id="title" placeholder="Title"/>
        <textarea type="text" id="postText" className={poststyles.postcontent} placeholder="Text"/>
        <button onClick={() => sendPost()}>Send</button>
      </div>
    </main>
  );
}
