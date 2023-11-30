"use server";

import Comment from "./Comment";

async function getComments(id) {
  const res = await fetch(
    `http://${process.env.NEXT_PUBLIC_VERCEL_URL}/api/post/${id}`,
    {
      method: "GET",
      next: { revalidate: 5, tags: ["getComments"] },
    }
  );

  if (!res.ok) {
    // This will activate the closest `error.js` Error Boundary
    throw new Error("Failed to fetch data");
  }
  try {
    const data = await res.json();
    return data.comments;
  } catch (e) {
    const data = false;
    return data;
  }
}

export default async function Comments({ children, postId }) {
  const comments = await getComments(postId);

  if (comments) {
    return (
      <div>
        {comments.map((comment) => {
          return <Comment key={comment.id} post={comment}></Comment>;
        })}
      </div>
    );
  }
}
