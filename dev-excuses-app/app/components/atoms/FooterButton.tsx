"use client";
import { useRouter } from "next/navigation";
import React from "react";

type ButtonProps = {
  text: string;
  url: string;
  className?: string;
};

const FooterButton: React.FC<ButtonProps> = ({ text, url, className = "" }) => {
  const router = useRouter();
  return (
    <button
      type="button"
      onClick={() => router.push(url)}
      className={`px-4 py-2 text-white rounded ${className}`}
    >
      {text}
    </button>
  );
};

export default FooterButton;
