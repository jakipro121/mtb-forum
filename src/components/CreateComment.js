"use client";

import { useState } from "react";
import { useRouter, usePathname } from "next/navigation";

export default function CreateComment({ id }) {
  const router = useRouter();
  const pathname = usePathname();
  const [inputText, setInputText] = useState();
  const sendComment = () => {
    if (typeof window !== "undefined") {
      const comment = inputText;
      let data = { comment: comment };
      data = JSON.stringify(data);
      const host = window.location.origin;
      const res = fetch(`${host}/api/post/${id}`, {
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

            router.refresh();
          }
        });
      });
    }
  };
  return (
    <>
      <input
        type="text"
        id="postText"
        placeholder="Comment..."
        onChange={(e) => {
          setInputText(e.target.value);
        }}
      />
      <button onClick={sendComment}>Send</button>
    </>
  );
}
