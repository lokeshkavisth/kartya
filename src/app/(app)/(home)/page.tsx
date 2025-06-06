"use client";

import { useTRPC } from "@/trpc/client";
import { useQuery } from "@tanstack/react-query";

export default function Home() {
  const trpc = useTRPC();

  const { data } = useQuery(trpc.auth.session.queryOptions());

  return (
    <section>
      <h1>Home</h1>
      <div>{JSON.stringify(data?.user, null, 2)}</div>
    </section>
  );
}
