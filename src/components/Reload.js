"use client";

import { useSearchParams, useRouter, usePathname } from "next/navigation";

export default function Reload() {
  //if (typeof window !== "undefined") {
    const pathname = usePathname();
    const router = useRouter();
    const searchParams = useSearchParams();
    const reload = searchParams.get("reload");

    if (reload === "true") {
      router.replace(pathname + "?refresh=true");
    }

    const refresh = searchParams.get("refresh");
    if (refresh === "true") {
      router.replace(pathname);
    }
  //}
}
