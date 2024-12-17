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
  const [httpCode, setHttpCode] = useState<number | string>("");
  const [excuseMessage, setExcuseMessage] = useState<string>("");

  const handleOpenModal = () => setModalOpen(true);
  const handleCloseModal = () => setModalOpen(false);

  const handleCreateExcuse = async () => {
    if (!httpCode || !excuseMessage) return;
    // TODO: error handling;

    // Create a new excuse
    const newExcuseAdded = await createNewExcuse(
      httpCode,
      excuseMessage,
      selectedTag
    );

    handleCloseModal();

    // reset the form
    setExcuseMessage("");
    setHttpCode("");

    router.push(`/${newExcuseAdded}`);
  };

  return (
    <>
      <button
        className="group relative flex items-center justify-center overflow-hidden bg-blue-500 text-white rounded-full w-9 h-9 transition-all duration-300 hover:w-40"
        onClick={handleOpenModal}
      >
        <div className="group relative flex items-center bg-blue-500 text-white rounded-full w-9 h-9 overflow-hidden transition-all duration-300 hover:w-40">
          {/* Icon */}
          <span className="absolute left-3 transform text-xl font-bold transition-all duration-300 translate-x-0">
            +
          </span>
          {/* Text (hidden initially) */}
          <span className="absolute left-9 opacity-0 whitespace-nowrap transition-all duration-300 group-hover:opacity-100">
            Add an excuse
          </span>
        </div>
      </button>

      {/* Modal Component */}
      <Modal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        title="Add a new excuse"
      >
        <form>
          <label className="block text-sm text-gray-500 mb-1">
            Http code <span className="text-red-700 font-semibold">*</span>
          </label>
          <input
            // champ texte qui n'accepte que des chiffres
            type="text"
            placeholder=""
            value={httpCode}
            onChange={(e) => setHttpCode(e.target.value)}
            required
            className="w-full px-4 py-2 border border-gray-300 text-gray-600 mb-3 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition duration-200"
          />
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
              type="button"
              onClick={handleCreateExcuse}
              className="bg-blue-500 text-white px-6 py-2 rounded-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-200"
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
