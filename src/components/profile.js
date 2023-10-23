import { useSession, signIn, signOut } from "next-auth/react";
import styles from "@/css/profile.module.css";

export default function Profile() {
  const { data, status } = useSession();
  return (
    <div className={styles.card}>
      <p>
        Username: <span>{data.user.name}</span>
      </p>
      <p>
        Email: <span>{data.user.email}</span>
      </p>
      <button onClick={() => signOut()}>Sign out</button>
    </div>
  );
}
