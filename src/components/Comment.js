"use client";

import style from "@/css/comment.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrashCan } from "@fortawesome/free-solid-svg-icons";
import { useSession } from "next-auth/react";
import { useState } from "react";
import RemovePostModal from "./removePost";

export default function Comment({ children, post }) {
  const [del, setDel] = useState(false);
  function deletePost() {
    setDel(true);
  }
  const { data, status } = useSession();
  return (
    <div className={`${style.card}`}>
      <div>
        <img src={post.image} width={100} height={100} alt="profile picture" />
        <h6>{post.name}</h6>
      </div>
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
      {data != null ? (
        data.user.uid === String(post.uid) && (
          <>
            <button onClick={deletePost}>
              <FontAwesomeIcon icon={faTrashCan} />
            </button>
            {del && (
              <RemovePostModal
                type="comments"
                postId={post.id}
                remove={true}
                setDel={setDel}
              ></RemovePostModal>
            )}
          </>
        )
      ) : (
        <></>
      )}
    </div>
  );
}
