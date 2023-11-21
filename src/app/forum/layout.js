"use client";

import styles from "@/css/forum.module.css";

export default function Home({ children }) {
  return (
    <div className="container mx-auto flex p-10">
      {/*----sidebar----*/}
      <div className={styles.sidebar}>
        <p>Kategorije</p>
        <a href={"forum/category/mtb"}>MTB</a>
        <div className={styles.dropdown}>
          <a href={"/forum/category/mtb/dh"}>Downhill</a>
          <a href={"/forum/category/mtb/enduro"}>Enduro</a>
          <a href={"/forum/category/mtb/xc"}>XC</a>
          <a href={"/forum/category/mtb/trail"}>Trail</a>
          <a href={"/forum/category/mtb/staze"}>Staze</a>
        </div>
        <a href={"forum/category/road"}>Road</a>
        <div className={styles.dropdown}>
          <a href={"forum/category/road/gravel"}>Gravel</a>
          <a href={"forum/category/road/brevet"}>Brevet</a>
          <a href={"forum/category/road/endurance"}>Endurance</a>
          <a href={"forum/category/road/commute"}>Commute</a>
          <a href={"forum/category/road/staze"}>Staze</a>
        </div>
      </div>
      {children}
    </div>
  );
}
