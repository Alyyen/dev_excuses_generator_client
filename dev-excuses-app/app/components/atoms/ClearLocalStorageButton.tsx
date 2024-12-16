"use client";

import React from "react";

const ClearLocalStorageButton: React.FC = () => {
  const ClearLocalStorageButton = () => {
    localStorage.clear();
    window.location.reload();
  };

  return (
    <button
      type="button"
      onClick={() => ClearLocalStorageButton()}
      className={`px-4 py-2 text-white rounded font-mono text-sm bg-transparent hover:bg-transparent hover:font-bold`}
    >
      Clear local storage
    </button>
  );
};

export default ClearLocalStorageButton;
