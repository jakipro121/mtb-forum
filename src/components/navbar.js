"use client";

import Link from "next/link";
import styles from "@/css/navbar.module.css";
import Image from "next/image";
import { signIn, useSession } from "next-auth/react";

export default function Navbar() {
  const { data, status } = useSession();
  return (
    <nav className={styles.nav}>
      <div className={`${styles.logo} ${styles.left}`}>
        <Link href={"/"}>
          <Image src={"/disk-brake.png"} width={20} height={20} alt="logo" />
          <p>BiciklizamHR</p>
        </Link>
      </div>
      <div className={styles.right}>
        <Link href={"/forum"} className={styles.link}>
          Forum
        </Link>
        <Link href={"/about"} className={styles.link}>
          About
        </Link>
      </div>
      {status === "authenticated" && (
        <a href="/profile">
          <p className="inline-block">{data.user.name}</p>
          <Image
            src={data.user.image}
            width={35}
            height={35}
            alt="User image"
            className={styles.userimg}
          ></Image>
        </a>
      )}
      {status != "authenticated" && (
        <div>
          <button onClick={() => signIn()} className="align-middle">Sign in</button>
        </div>
      )}
    </nav>
  );
}
