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
      `${process.env.NEXT_PUBLIC_PROTOCOL}://${process.env.NEXT_PUBLIC_VERCEL_URL}/api/post/${props.postId}`,
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
          router.push(`${process.env.NEXT_PUBLIC_PROTOCOL}://${process.env.NEXT_PUBLIC_VERCEL_URL}/forum`);
        }
      })
    });
  }
  function closeModal() {
    if(props.type == "comments"){
    props.setDel(false);
    }
    router.replace(pathname);
  }
  const searchParams = useSearchParams();
  let remove = searchParams.get("remove");
  console.log({remove});
  remove = remove || props.remove;
  console.log(`remove: ${remove}`);
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
