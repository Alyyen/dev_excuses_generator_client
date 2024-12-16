"use client";

import Button from "./components/atoms/Button";
import Loading from "./components/atoms/Loading";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import fetchRandomExcuse from "./utils/fetchRandomExcuse";

export default function Home() {
  const [excuse, setExcuse] = useState<number>();
  const [loading, setLoading] = useState<boolean>(false);
  const router = useRouter();

  const handleClick = async () => {
    setLoading(true);

    const nextHttpCode = await fetchRandomExcuse();
    setExcuse(nextHttpCode);

    setLoading(false);
  };

  // If there's a change of the state : redirect to the new page
  useEffect(() => {
    if (excuse) {
      router.push(`/${excuse}`);
    }
  }, [excuse]);

  return (
    <div className="flex-1 flex flex-col">
      <main className="flex-1 p-6 flex justify-center overflow-y-auto">
        <div className="flex flex-col items-center space-y-12">
          <div className="flex flex-col items-center justify-center h-full">
            <h2 className="text-center text-lg font-semibold mb-4">
              Need inspiration to justify yourself?
            </h2>
            {loading && <Loading />}
            <Button
              text="Generate an excuse"
              className="h-12 bg-blue-500 hover:bg-blue-700"
              onClick={() => handleClick()}
            />
          </div>
        </div>
      </main>
    </div>
  );
}
