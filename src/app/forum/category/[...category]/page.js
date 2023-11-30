import styles from "@/css/forum.module.css";
import Link from "next/link";
import Posts from "@/components/posts";
import { Suspense } from "react";
import Reload from "@/components/Reload";

//export const dynamic = "force-dynamic";

export default async function MTB({params}) {
  console.log(params);
  console.log(params.category.length);
  let category = params.category[params.category.length - 1]
  console.log(category);
  return (
    <main className={`${styles.main}`}>
      <Reload/>
      <div>
        <Link href="/forum/createpost">
          <input type="text" id="postText" placeholder="Post Something..." />
        </Link>
      </div>
      <Suspense fallback={<p>Loading...</p>}>
        <Posts category={category}/>
      </Suspense>
    </main>
  );
}
