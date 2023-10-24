import { Pool } from "pg";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/pages/api/auth/[...nextauth]";
import { getToken } from "next-auth/jwt";
import { NextResponse } from "next/server";

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

export async function POST(req) {
  const session = await getServerSession(authOptions);
  if (!session) {
    return NextResponse.json({ success: "false" }, { status: 401 });
  }
  console.log(session);
  const uid = session.user.uid;

  const data = await req.json();
  console.log(data);
  if (data.postText === "" || data.title === "") {
    return Response.json({ success: "false" });
  }
  const category = "";
  const client = await pool.connect();
  console.log(typeof uid)
  let res = await client.query(`
    INSERT INTO posts(title, text, user_id, date, category)
    VALUES($1, $2, $3, current_timestamp, $4)`, [data.title, data.postText, Number(uid), category]);
  await client.release();
  return Response.json({ success: "true" });
}

export async function GET(req) {
  const client = await pool.connect();
  let res = await client.query(
    `SELECT posts.title, posts.text, users.name, users.image, posts.date, posts.id FROM posts
    INNER JOIN users ON users.id = posts.user_id`
  );
  await client.release();
  res = res.rows;
  if (res) {
    return Response.json(res);
  } else {
    return Response.json({ success: false });
  }
}
