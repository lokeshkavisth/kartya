import configPromise from "@payload-config";
import { CollectionSlug, getPayload } from "payload";

export default async function Home() {
  const payload = await getPayload({
    config: configPromise,
  });

  const data = await payload.find({
    collection: "categories" as CollectionSlug,
    where: {
      category: {
        exists: false,
      },
    },
  });
  console.log(data);

  return (
    <section>
      <h1>Home</h1>
      <pre>{JSON.stringify(data, null, 2)}</pre>
    </section>
  );
}
