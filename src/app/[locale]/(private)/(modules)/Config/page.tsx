"use client"

import { useState } from "react";
import UploadImgModal from "./components/ImgUploadModal";


export default function Config() {
  const [isOpen, setIsOpen] = useState<boolean>(false)
  const [selectedFile, setSelectedFile] = useState<File | null>(null);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (!event.target.files) return;
    setSelectedFile(event.target.files[0]);
    setIsOpen(true);
  };

  const handleClose = () => {
    setIsOpen(false)
    setSelectedFile(null);
  }

  return (
    <div>
      <form>
        <input type="file" accept="image/*" onChange={handleFileChange} />
      </form>
      {selectedFile && (
        <UploadImgModal onClose={handleClose} open={isOpen} uploadImg={selectedFile} />
      )}
    </div>
  );
} 
