import { Pool } from "pg";
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

//------------------------------------------
//GET
//------------------------------------------
export async function GET(req, {params}) {
  const category = params.category;
  const client = await pool.connect();
  let res = await client.query(
    `SELECT posts.title, posts.text, users.name, users.image, posts.date, posts.id, users.id AS uid FROM posts
    INNER JOIN users ON users.id = posts.user_id
    WHERE posts.category ILIKE $1
    ORDER BY posts.date DESC`, [`%${category}%`]
  );
  await client.release();
  res = res.rows;
  
  if (res) {
    return Response.json(res);
  } else {
    return Response.json({ success: false });
  }
}