"use client";

import { useSearchParams, usePathname } from "next/navigation";
import styles from "@/css/modal.module.css";
import { useRouter } from "next/navigation";

export default function RemovePostModal(props) {
  console.log(props)
  const type = props.type;
  const pathname = usePathname();
  const router = useRouter();
  function deletePost() {
    const data = JSON.stringify({
      type,
    })
    let res = fetch(
      `http://${process.env.NEXT_PUBLIC_VERCEL_URL}/api/post/${props.postId}`,
      {
        method: "DELETE",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
        body: data,
      }
    ).then((res)=>{
      res.json().then((data)=>{
        console.log(data);
        if(data.success){
          router.push(`http://${process.env.NEXT_PUBLIC_VERCEL_URL}/forum`);
        }
      })
    });
  }
  function closeModal() {
    router.replace(pathname);
  }
  const searchParams = useSearchParams();
  const remove = searchParams.get("remove");
  if (remove) {
    return (
      <div className={`${styles.modal}`}>
        <p>Želiš li doista izbrisati ovaj post?</p>
        <button onClick={deletePost} className={styles.button}>
          Izbriši
        </button>
        <button onClick={closeModal} className={styles.button}>
          Odustani
        </button>
      </div>
    );
  }
}
