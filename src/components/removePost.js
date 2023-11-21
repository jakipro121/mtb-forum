"use client";

import { useSearchParams } from "next/navigation";

export default function Modal() {
  const searchParams = useSearchParams();
  const remove = searchParams.get("remove");
  console.log(remove);
  if (remove) {
    return (
      <div className="absolute top-auto bottom-auto bg-black">
        <p>Izbriši this?????</p>
      </div>
    );
  }
}
