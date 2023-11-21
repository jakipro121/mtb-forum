
import styles from "@/css/forum.module.css";

import Post from "@/components/post";
import Comments from "@/components/comments";
import CreateComment from "@/components/CreateComment";
import Modal from "@/components/removePost";

async function getPost(id) {
  const res = await fetch(
    `http://${process.env.NEXT_PUBLIC_VERCEL_URL}/api/post/${id}`,
    {
      method: "GET",
      next: { revalidate: 5, tags: ["getPosts"] },
    }
  );

  if (!res.ok) {
    // This will activate the closest `error.js` Error Boundary
    throw new Error("Failed to fetch data");
  }

  const data = await res.json();
  return data.post;
}

export default async function PostID({ params }) {
  let post = await getPost(params.ID);

  if (post) {
    return (
      <div className={styles.main}>
        <Modal></Modal>
        <Post key={post.id} post={post} />
        <CreateComment id={post.id}></CreateComment>
        <Comments postId={params.ID}></Comments>
      </div>
    );
  } else if (!success) {
    return <p>Error: not found</p>;
  } else {
    return <p>Loading...</p>;
  }
}
