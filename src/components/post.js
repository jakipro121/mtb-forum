"use client";

import style from "@/css/post.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrashCan } from "@fortawesome/free-solid-svg-icons";
import { useSession } from "next-auth/react";
import Link from "next/link";
import Image from "next/image";

export default function Post({ children, post }) {
  const { data } = useSession();
  return (
    <Link className={style.card} href={`/forum/post/${post.id}`}>
      <div>
        <Image
          src={post.image}
          width={100}
          height={100}
          alt="profile picture"
        />
        <h6>{post.name}</h6>
      </div>
      <h2>{post.title}</h2>
      <p className={style.time}>
        {new Date(post.date).toLocaleString("hr", {
          year: "numeric",
          month: "numeric",
          day: "numeric",
          hour: "numeric",
          minute: "2-digit",
        })}
      </p>
      <p>{post.text}</p>
      {(data != null) ? (
        data.user.uid === String(post.uid) && (
          <Link href={`/forum/post/${post.id}?remove=true`}>
            <FontAwesomeIcon icon={faTrashCan} />
          </Link>
        )
      ) : (
        <></>
      )}
    </Link>
  );
}
