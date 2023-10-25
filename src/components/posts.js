"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Post from "./post";
import pstyle from "@/css/post.module.css";

export default function Posts() {
  const [posts, setPosts] = useState(null);

  useEffect(() => {
    const host = window.location.origin;
    fetch(`${host}/api/post/`, {
      method: "GET",
      cache: "no-store",
    })
      .then((res) => res.json())
      .then((data) => {
        setPosts(data);
      });
  }, []);
  console.log(posts);
  return (
    <div key={"nesto"}>
      {posts && posts.map((post) => (
        <Post key={post.id}>
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
          <p className={pstyle.time}>
            {new Date(post.date).toLocaleString("hr", {
              year: "numeric",
              month: "numeric",
              day: "numeric",
              hour: "numeric",
              minute: "2-digit",
            })}
          </p>
          <p>{post.text}</p>
        </Post>
      ))}
    </div>
  );
}
