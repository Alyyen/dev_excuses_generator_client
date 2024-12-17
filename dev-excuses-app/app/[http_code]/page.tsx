"use client";

import Button from "../components/atoms/Button";
import Loading from "../components/atoms/Loading";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import fetchRandomExcuse from "../utils/fetchRandomExcuse";
import { ExcuseType } from "../utils/types/excuse.type";
import fetchCurrentExcuse from "../utils/fetchCurrentExcuse";
import ErrorPage from "../404";

export default function Excuse() {
  const [currentExcuse, setCurrentExcuse] = useState<
    ExcuseType | string | null
  >();
  const [newExcuse, setNewExcuse] = useState<number | string | null>(null);
  const [error, setError] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(true);
  const router = useRouter();
  const pathname = usePathname();
  const currentHttpCode = pathname.replace("/", "");

  // Fetch the current excuse
  useEffect(() => {
    const getExcuse = async () => {
      if (currentHttpCode === null) return;
      const excuseFound = await fetchCurrentExcuse(currentHttpCode);

      // If the excuse is not found, set the current excuse to 404 and display error message
      if (typeof excuseFound === "string") {
        setError(true);
        setErrorMessage(excuseFound);
      }

      // Set the current excuse
      setCurrentExcuse(excuseFound);

      // Add delay to simulate loading
      setTimeout(() => {
        setLoading(false);
      }, 1500);
    };

    getExcuse();
  }, [currentHttpCode]);

  const handleClick = async () => {
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
    <div className="flex-1 flex flex-col">
      <main className="flex-1 p-6 flex justify-center items-center">
        <div className="flex flex-col items-center space-y-12">
          <div className="flex flex-col items-center justify-center">
            {loading ? (
              <Loading />
            ) : error ? (
              <ErrorPage message={errorMessage} />
            ) : currentExcuse && typeof currentExcuse != "string" ? (
              <>
                <h2 className="text-center text-lg font-semibold mb-4">
                  {currentExcuse.message}
                </h2>
                <span className="text-xs text-slate-400 italic mb-4 font-semibold">
                  #{currentExcuse.tag}
                </span>
                <Button
                  text="Generate an excuse"
                  className="h-12 bg-blue-500 hover:bg-blue-700 text-white px-6 rounded"
                  onClick={handleClick}
                />
              </>
            ) : (
              <></>
            )}
          </div>
        </div>
      </main>
    </div>
  );
}
