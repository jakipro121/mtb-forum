

import styles from "@/css/forum.module.css";
import Link from "next/link";
import Posts from "@/components/posts";
import { Suspense } from "react";
import Reload from "@/components/Reload";

//export const dynamic = "force-dynamic";

export default async function Forum() {
  
  return (
    <main className={`${styles.main}`}>
      <Reload/>
      <div>
        <Link href="/forum/createpost">
          <input type="text" id="postText" placeholder="Post Something..." />
        </Link>
      </div>
      <Suspense fallback={<p>Loading...</p>}>
        <Posts />
      </Suspense>
    </main>
  );
}
