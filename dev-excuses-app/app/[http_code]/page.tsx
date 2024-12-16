"use client";

import Button from "../components/atoms/Button";
import Loading from "../components/atoms/Loading";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import fetchRandomExcuse from "../utils/fetchRandomExcuse";
import { Excuse } from "../utils/excuse.type";
import fetchCurrentExcuse from "../utils/fetchCurrentExcuse";

export default function Excuse() {
  const [currentExcuse, setCurrentExcuse] = useState<Excuse | number | null>();
  const [newExcuse, setNewExcuse] = useState<number | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const router = useRouter();
  const pathname = usePathname();
  const currentHttpCode = pathname.replace("/", "");

  // Fetch the current excuse
  useEffect(() => {
    const getExcuse = async () => {
      if (currentHttpCode === null) return;

      setLoading(true);
      const excuseFound = await fetchCurrentExcuse(currentHttpCode);
      setCurrentExcuse(excuseFound);

      // Add delay to simulate loading
      setTimeout(() => {
        setLoading(false);
      }, 2000);
    };

    getExcuse();
  }, [currentHttpCode]);

  const handleClick = async () => {
    setLoading(true);

    const nextHttpCode = await fetchRandomExcuse();
    setNewExcuse(nextHttpCode);

    setLoading(false);
  };

  const handleClearStorageAndGenerate = () => {
    localStorage.clear();
    handleClick();
  };

  // Redirect to the new page when a new data is generated
  useEffect(() => {
    if (newExcuse) {
      router.push(`/${newExcuse}`);
    }
  }, [newExcuse]);

  return (
    <div className="flex-1 flex flex-col">
      <main className="flex-1 p-6 flex justify-center items-center">
        <div className="flex flex-col items-center space-y-12">
          <div className="flex flex-col items-center justify-center">
            {loading ? (
              <Loading />
            ) : (
              <>
                {currentExcuse && typeof currentExcuse != "number" ? (
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
                  <>
                    <img
                      src="/undraw_page_not_found_404.svg"
                      alt="No excuse found"
                      className="w-1/2 h-1/2 mb-8"
                    />
                    <Button
                      text="Clear the local storage and generate an excuse"
                      className="h-12 bg-blue-500 hover:bg-blue-700 text-white px-6 rounded"
                      onClick={handleClearStorageAndGenerate}
                      // TODO: if no excuse exists redirect to 404 page instead of showing this
                      // TODO: fix the refresh of the page when the button is clicked
                    />
                  </>
                )}
              </>
            )}
          </div>
        </div>
      </main>
    </div>
  );
}
