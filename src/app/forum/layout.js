"use client";

import styles from "@/css/forum.module.css";
import Link from "next/link";

export default function Home({children}) {
  function sendPost() {
    if (typeof window !== "undefined") {
      let postText = document.getElementById("postText").value;
      console.log(postText);
    }
  }
  return (
    <div className="container mx-auto flex p-10">
      {/*----sidebar----*/}
      <div className={styles.sidebar}>
        <p>Kategorije</p>
        <Link href={"forum/category/mtb"}>MTB</Link>
        <div className={styles.dropdown}>
          <Link href={"/forum/category/mtb/dh"}>Downhill</Link>
          <Link href={"/forum/category/mtb/enduro"}>Enduro</Link>
          <Link href={"/forum/category/mtb/xc"}>XC</Link>
          <Link href={"/forum/category/mtb/trail"}>Trail</Link>
          <Link href={"/forum/category/mtb/staze"}>Staze</Link>
        </div>
        <Link href={"forum/category/road"}>Road</Link>
        <div className={styles.dropdown}>
          <Link href={"forum/category/road/gravel"}>Gravel</Link>
          <Link href={"forum/category/road/brevet"}>Brevet</Link>
          <Link href={"forum/category/road/endurance"}>Endurance</Link>
          <Link href={"forum/category/road/commute"}>Commute</Link>
          <Link href={"forum/category/road/staze"}>Staze</Link>
        </div>
      </div>
      {children}
    </div>
  );
}
