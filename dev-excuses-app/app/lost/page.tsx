"use client";

import Button from "../components/atoms/Button";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function Lost() {
  const router = useRouter();

  // After 5 secondes, redirect to "/"
  useEffect(() => {
    const timer = setTimeout(() => {
      router.push("/");
    }, 5000);
    return () => clearTimeout(timer);
  }, [router]);

  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <main className="flex flex-col items-center space-y-8">
        <div className="w-full flex flex-col items-center relative">
          <iframe
            src="https://giphy.com/embed/dsny94L0irr8byJ9OM"
            className="w-[360px] h-[200px]"
            allowFullScreen
          ></iframe>
        </div>

        <Button
          text="Back to home"
          className="h-12 bg-blue-500 hover:bg-blue-700 text-white px-6 rounded"
          onClick={() => router.push("/")}
        />
      </main>
    </div>
  );
}
