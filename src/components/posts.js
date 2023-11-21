"use server";

import Post from "./post";

async function getPosts() {
  const res = await fetch(
    `http://${process.env.NEXT_PUBLIC_VERCEL_URL}/api/post/`,
    {
      method: "GET",
      next: { revalidate: 5, tags: ["getPosts"] },
    }
  );
  if (!res.ok) {
    // This will activate the closest `error.js` Error Boundary
    throw new Error("Failed to fetch data");
  }
  return res.json();
}

export default async function Posts() {
  //const [posts, setPosts] = useState(null);
  var posts = await getPosts();
  return (
    <div key={"nesto"}>
      {posts && posts.map((post) => <Post key={post.id} post={post} />)}
    </div>
  );
}
