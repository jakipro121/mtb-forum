"use server";

import Post from "./post";

async function getPosts(category) {
  console.log(category);
  var url = `/`;
  if (category) {
    url = `/category/${category}`;
  }
  const res = await fetch(
    `http://${process.env.NEXT_PUBLIC_VERCEL_URL}/api/post${url}`,
    {
      method: "GET",
      next: { revalidate: 5, tags: ["getPosts"] },
    }
  );
  if (!res.ok) {
    // This will activate the closest `error.js` Error Boundary
    throw new Error("Failed to fetch data");
  }
  try {
    let a = await res.json();
    console.log(a);
    return a
  } catch (e) {
    return false;
  }
}

export default async function Posts({ category }) {
  //const [posts, setPosts] = useState(null);
  var posts = await getPosts(category);
  return (
    <div key={"nesto"}>
      {posts && posts.map((post) => <Post key={post.id} post={post} />)}
    </div>
  );
}
