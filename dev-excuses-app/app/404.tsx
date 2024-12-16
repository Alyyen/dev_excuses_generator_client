"use client";

export default function Error() {
  return (
    <div className="flex-1 flex flex-col">
      <h1 className="text-4xl font-bold">404</h1>
      <p className="text-lg">Page not found</p>
      <img
        src="/undraw_page_not_found_404.svg"
        alt="Page not found"
        className="w-1/2 h-1/2"
      />
    </div>
  );
}
