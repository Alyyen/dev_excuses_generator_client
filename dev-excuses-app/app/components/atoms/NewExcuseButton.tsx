"use client";
import createNewExcuse from "@/app/utils/createNewExcuse";
import { Tag } from "@/app/utils/enums/tag.enum";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import Modal from "../organisms/Modal";

const NewExcuseButton: React.FC = () => {
  const router = useRouter();
  const [isModalOpen, setModalOpen] = useState(false);
  const [selectedTag, setSelectedTag] = useState<Tag>(Tag.OTHER);
  const [httpCode, setHttpCode] = useState<string>("");
  const [excuseMessage, setExcuseMessage] = useState<string>("");
  const [errorOnHttpCode, setErrorOnHttpCode] = useState<string>("");
  const [errorOnMessage, setErrorOnMessage] = useState<string>("");

  const handleOpenModal = () => setModalOpen(true);
  const handleCloseModal = () => setModalOpen(false);

  const handleCreateExcuse = async () => {
    let hasError = false;

    // HTTP code validation
    if (!httpCode || !/^\d+$/.test(httpCode)) {
      hasError = true;
      setErrorOnHttpCode("Please enter a valid HTTP code");
    } else {
      setErrorOnHttpCode("");
    }

    // Check if message is empty
    if (!excuseMessage) {
      hasError = true;
      setErrorOnMessage("Message cannot be empty");
    } else {
      setErrorOnMessage("");
    }

    // Create
    const newExcuseAdded = await createNewExcuse(
      parseInt(httpCode, 10),
      excuseMessage,
      selectedTag
    );

    // Validation
    if (
      newExcuseAdded === "An excuse with this message already exists." ||
      newExcuseAdded === "Message cannot be empty."
    ) {
      // errors on message
      hasError = true;
      setErrorOnMessage(newExcuseAdded);
    } else if (typeof newExcuseAdded === "string") {
      // errors on http code
      hasError = true;
      setErrorOnHttpCode(newExcuseAdded);
    }

    // If no error, close the modal and redirect to the new excuse
    if (!hasError) {
      handleCloseModal();
      setHttpCode("");
      setExcuseMessage("");
      router.push(`/${newExcuseAdded}`);
    }
  };

  const handleHttpCodeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    if (/^\d*$/.test(value)) {
      setHttpCode(value); // Only update if the value is numeric or empty
      setErrorOnHttpCode(""); // Clear error if valid
    } else {
      setErrorOnHttpCode("Only numbers are allowed");
    }
  };

  return (
    <>
      <button
        className="group relative flex items-center justify-center overflow-hidden bg-blue-500 text-white rounded-full w-9 h-9 transition-all duration-300 hover:w-40"
        onClick={handleOpenModal}
      >
        <div className="group relative flex items-center bg-blue-500 text-white rounded-full w-9 h-9 overflow-hidden transition-all duration-300 hover:w-40">
          <span className="absolute left-3 transform text-xl font-bold transition-all duration-300 translate-x-0">
            +
          </span>
          <span className="absolute left-9 opacity-0 whitespace-nowrap transition-all duration-300 group-hover:opacity-100">
            Add an excuse
          </span>
        </div>
      </button>

      <Modal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        title="Add a new excuse"
      >
        <form
          onSubmit={(e) => {
            e.preventDefault();
            handleCreateExcuse();
          }}
        >
          <label className="block text-sm text-gray-500 mb-1">
            Http code <span className="text-red-700 font-semibold">*</span>
          </label>
          <input
            type="text"
            placeholder="Enter HTTP code"
            value={httpCode}
            onChange={handleHttpCodeChange}
            required
            className="w-full px-4 py-2 border border-gray-300 text-gray-600 mb-3 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition duration-200"
          />
          {errorOnHttpCode && (
            <p className="text-red-500 text-sm mb-3">{errorOnHttpCode}</p>
          )}
          <label className="block text-sm text-gray-500 mb-1">
            Message <span className="text-red-700 font-semibold">*</span>
          </label>
          <input
            type="text"
            placeholder="I don't know what happened."
            value={excuseMessage}
            onChange={(e) => setExcuseMessage(e.target.value)}
            required
            className="w-full px-4 py-2 border border-gray-300 text-gray-600 mb-3 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition duration-200"
          />
          {errorOnMessage && (
            <p className="text-red-500 text-sm mb-3">{errorOnMessage}</p>
          )}
          <label className="block text-sm text-gray-500 mb-1">Tag</label>
          <select
            name="tag"
            id="tag"
            value={selectedTag}
            onChange={(e) => setSelectedTag(e.target.value as Tag)}
            className="w-full px-4 py-2 border border-gray-300 text-gray-600 mb-3 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition duration-200"
          >
            {Object.values(Tag).map((tag) => (
              <option key={tag} value={tag}>
                {tag}
              </option>
            ))}
          </select>
          <div className="flex justify-center">
            <button
              type="submit"
              className="bg-blue-500 text-white px-6 py-2 w-full rounded-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-200"
            >
              Create
            </button>
          </div>
        </form>
      </Modal>
    </>
  );
};

export default NewExcuseButton;
