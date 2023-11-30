"use client";

import { useSearchParams } from "next/navigation";

export default function Modal() {
  const searchParams = useSearchParams();
  const remove = searchParams.get("remove");
  if (remove) {
    return (
      <div className="absolute top-auto bottom-auto bg-black">
        <p>Želiš li doista izbrisati ovaj post?</p>
      </div>
    );
  }
}
