import styles from "@/css/forum.module.css";
import pstyle from "@/css/post.module.css";
import Post from "@/components/post";
import Link from "next/link";
import Image from "next/image";
import Posts from "@/components/posts";
import { Suspense } from "react";

export const dynamic = "force-dynamic";

export default async function Home() {
  return (
    <main className={`${styles.main}`}>
      <div>
        <Link href="/forum/createpost">
          <input type="text" id="postText" placeholder="Post Something..." />
        </Link>
      </div>

      <Post>
        <div>
          <Image
            src={"/avatar.jpg"}
            width={100}
            height={100}
            alt="profile picture"
          />
          <h6>username</h6>
        </div>

        <h2>title</h2>
        <p className={pstyle.time}>30.9.2020.</p>
        <p>text</p>
      </Post>
      <Suspense fallback={<p>Loading...</p>}>
        <Posts />
      </Suspense>
    </main>
  );
}
