import { Pool } from "pg";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/pages/api/auth/[...nextauth]";
import { NextResponse } from "next/server";
import { revalidateTag } from "next/cache";
export const dynamic = "force-dynamic";

const config = {
  user: process.env.POSTGRES_USER,
  host: process.env.POSTGRES_HOST,
  database: process.env.POSTGRES_DATABASE,
  password: process.env.POSTGRES_PASSWORD,
  port: process.env.POSTGRES_PORT,
  ssl: true,
  keepAlive: true,
  keepAliveInitialDelayMillis: 10000,
};
const pool = new Pool(config);
//------------------------------------------
//GET
//------------------------------------------
export async function GET(req, { params }) {
  const postID = params.ID;
  const client = await pool.connect();

  let post = await client.query(
    `SELECT posts.title, posts.text, users.name, users.image, posts.date, posts.id, users.id AS uid FROM posts
    INNER JOIN users ON users.id = posts.user_id
    WHERE posts.id = $1
    ORDER BY posts.date DESC`,
    [postID]
  );
  post = post.rows[0];
  let comments = await client.query(
    `SELECT comments.text, users.name, users.image, comments.date, comments.id, users.id AS uid FROM comments
    INNER JOIN users ON users.id = comments.user_id
    WHERE comments.post_id = $1
    ORDER BY comments.date DESC`,
    [postID]
  );
  comments = comments.rows;
  let res = { post, comments, success: true };
  await client.release();
  if (res.post) {
    return Response.json(res);
  } else {
    return Response.json({ success: false });
  }
}
//------------------------------------------
//POST
//------------------------------------------
export async function POST(req, { params }) {
  revalidateTag("getComments");
  const session = await getServerSession(authOptions);
  if (!session) {
    return NextResponse.json({ success: "false" }, { status: 401 });
  }
  const uid = session.user.uid;

  const data = await req.json();
  if (!data.comment) {
    return Response.json({ success: "false" });
  }
  const client = await pool.connect();
  const comment = data.comment;
  const postId = params.ID;
  let res = await client.query(
    `
  INSERT INTO comments(user_id, post_id, text, date)
  VALUES($1, $2, $3, current_timestamp)
    `,
    [uid, postId, comment]
  );
  await client.release();
  return Response.json({ success: "true" });
}
//------------------------------------------
//DELETE
//------------------------------------------
export async function DELETE(req, { params }) {
  const session = await getServerSession(authOptions);
  if (!session) {
    return Response.json({ success: "false" }, { status: 401 });
  }
  
  const uid = session.user.uid;
  const postID = params.ID;
  const data = await req.json();
  console.log(data);
  const post = data.type;


  const client = await pool.connect();
  if(post === 'comments'){
    let res = await client.query(
      `
    DELETE FROM comments
    WHERE posts.user_id = $1 AND posts.id = $2
    `,
      [uid, postID]
    );
  }
  else if(post === 'posts'){
    let res = await client.query(
      `
    DELETE FROM posts
    WHERE posts.user_id = $1 AND posts.id = $2
    `,
      [uid, postID]
    );
  }
  else {
    return Response.json({ success: "false" }, { status: 400 });
  }
  revalidateTag("getComments");

  return Response.json({ success: "true" });
}
