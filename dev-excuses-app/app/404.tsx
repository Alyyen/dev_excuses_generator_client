"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import Button from "./components/atoms/Button";
import fetchRandomExcuse from "./utils/fetchRandomExcuse";

interface ErrorPageProps {
  message?: string;
}

export default function ErrorPage({ message }: ErrorPageProps) {
  const router = useRouter();
  const [newExcuse, setNewExcuse] = useState<number | null>(null);
  const error: string = message || "404 - Page not found";

  const handleClearStorageAndGenerate = async () => {
    localStorage.clear();
    const nextHttpCode = await fetchRandomExcuse();
    setNewExcuse(nextHttpCode);
  };

  // Redirect to the new page when a new data is generated
  useEffect(() => {
    if (newExcuse) {
      router.push(`/${newExcuse}`);
    }
  }, [newExcuse, router]);

  return (
    <div className="flex-1 flex flex-col justify-center items-center space-y-12">
      <h1 className="text-xl font-bold">Error</h1>
      {message && <p className="text-lg font-medium">{error}</p>}
      <Image
        src="/undraw_page_not_found_404.svg"
        alt="Error"
        className="w-1/2 h-1/2"
        width={500}
        height={500}
      />
      <Button
        text="Clear the local storage and generate an excuse"
        className="h-12 bg-blue-500 hover:bg-blue-700 text-white px-6 rounded"
        onClick={handleClearStorageAndGenerate}
      />
    </div>
  );
}
