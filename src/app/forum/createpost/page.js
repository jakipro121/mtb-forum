"use client";

import { useState } from "react";
import styles from "@/css/forum.module.css";
import poststyles from "@/css/createpost.module.css";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

export default function Home() {
  const [visible, setVisible] = useState(false);

  const { push } = useRouter();
  const { status } = useSession();

  if (status === "loading") {
    return <p>Loading...</p>;
  }

  if (status === "unauthenticated") {
    return <p>You must be signed in to create posts</p>;
  }

  function sendPost() {
    if (typeof window !== "undefined") {
      let kategorijeElements = document.querySelectorAll("#kategorije li input");
      let kategorije = [];
      kategorijeElements.forEach(element => {
        if(element.checked){
          kategorije.push(element.name);
        }
      });

      const postText = document.getElementById("postText").value;
      const title = document.getElementById("title").value;
      const data = JSON.stringify({
        postText,
        title,
        kategorije
      });
      console.log(data);
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
        <div
          className={(visible ? styles.visible : "") + " " + styles.kategorije}
        >
          <span
            className={styles.anchor}
            onClick={() => {
              setVisible((current) => !current);
            }}
            onBlur={() => {
              setVisible(false);
            }}
          >
            Izaberi kategorije
          </span>
          <ul className={`${styles.items}`} id="kategorije">
            <li>
              <input type="checkbox" value="mtb" name="mtb" id="mtb" />
              <label htmlFor="mtb">MTB</label>
            </li>
            <li>
              <input type="checkbox" value="dh" name="dh" id="dh" />
              <label htmlFor="dh">DH</label>
            </li>
            <li>
              <input type="checkbox" value="enduro" name="enduro" id="enduro" />
              <label htmlFor="enduro">Enduro</label>
            </li>
            <li>
              <input type="checkbox" value="xc" name="xc" id="xc" />
              <label htmlFor="xc">XC</label>
            </li>
            <li>
              <input type="checkbox" value="trail" name="trail" id="trail" />
              <label htmlFor="trail">Trail</label>
            </li>
            <li>
              <input type="checkbox" value="road" name="road" id="road" />
              <label htmlFor="road">cesta</label>
            </li>
            <li>
              <input type="checkbox" value="staze" name="staze" id="staze" />
              <label htmlFor="staze">Staze</label>
            </li>
            <li>
              <input type="checkbox" value="marketplace" name="marketplace" id="marketplace" />
              <label htmlFor="marketplace">oglasnik</label>
            </li>
          </ul>
        </div>
        <button onClick={() => sendPost()}>Send</button>
      </div>
    </main>
  );
}
