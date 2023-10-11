import styles from "@/app/css/forum.module.css";
import pstyle from "@/app/css/post.module.css";
import Post from "@/components/post";
import Link from "next/link";
import Image from "next/image";

export default function Home() {
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
      <main className={`${styles.main}`}>
        <div>
          <textarea type="text" />
          <button type="submit">Send</button>
        </div>
        
        <Post>
          <Image
            src={"/avatar.jpg"}
            width={100}
            height={100}
            alt="profile picture"
          />
          <h6>jakipro121</h6>
          <p className={pstyle.time}>30.9.2020.</p>
          <p>Pozdrav</p>
        </Post>
      </main>
    </div>
  );
}
