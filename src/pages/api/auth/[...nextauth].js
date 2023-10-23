import NextAuth from "next-auth";
import GithubProvider from "next-auth/providers/github";
import StravaProvider from "next-auth/providers/strava";
import GoogleProvider from "next-auth/providers/google";
import PostgresAdapter from "@auth/pg-adapter";
import { Pool } from "pg";

const config = {
  user: "postgres",
  host: "jfqdfeszwtevzwvrmuur.db.eu-central-1.nhost.run",
  database: "jfqdfeszwtevzwvrmuur",
  password: process.env.NHOST_PASS,
  port: 5432,
};

const pool = new Pool(config);

export const authOptions = {
  adapter: PostgresAdapter(pool),
  secret: process.env.NEXTAUTH_SECRET,
  // Configure one or more authentication providers
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    }),
    GithubProvider({
      clientId: process.env.GITHUB_ID,
      clientSecret: process.env.GITHUB_SECRET,
    }),
    StravaProvider({
      clientId: process.env.STRAVA_CLIENT_ID,
      clientSecret: process.env.STRAVA_CLIENT_SECRET,
    }),
    // ...add more providers here
  ],
};

export default NextAuth(authOptions);
