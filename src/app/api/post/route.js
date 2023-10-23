import { Client } from "pg";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/pages/api/auth/[...nextauth]";
import { getToken } from "next-auth/jwt";

const config = {
  user: process.env.POSTGRES_USER,
  host: process.env.POSTGRES_HOST,
  database: process.env.POSTGRES_DATABASE,
  password: process.env.POSTGRES_PASSWORD,
  port: process.env.POSTGRES_PORT,
  ssl: true,
};
const client = new Client(config);
await client.connect();

/*
export async function POST(req, res) {
  const session = await getServerSession(authOptions);
  const token = await getToken({ req });
  console.log(token);

  const data = await req.json();
  const userName = token.name;
  if (userName) {
    res = await client.query(`SELECT users.id FROM users WHERE name = $1`, [
      userName,
    ]);
  } else {
    return Response.json({ status: "No user" });
  }

  return Response.json(res.rows);
}
*/

export async function GET(req) {
  console.log("req");
  console.log(process.env.POSTGRES_HOST);
  let res = await client.query(
    `SELECT posts.title, posts.text, users.name, users.image, posts.date, posts.id FROM posts
    INNER JOIN users ON users.id = posts.user_id`
  );

  res = res.rows;
  if(res){
  return Response.json(res);
  }
  else{
    return Response.json({success: false});
  }
}
