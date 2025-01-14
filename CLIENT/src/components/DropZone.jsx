import React from "react";
import { useDropzone } from "react-dropzone";

const DropZone = ({ onDrop, fileErrors, isDragActive }) => {
  const { getRootProps, getInputProps } = useDropzone({
    accept: {
      "image/*": [".jpeg", ".png", ".jpg"],
      "video/*": [".mp4", ".avi", ".mov"],
    },
    maxSize: 5 * 1024 * 1024,
    onDrop,
    validator: (file) => {
      if (file.size > 5 * 1024 * 1024) {
        return { code: "file-too-large", message: "Each file must be less than 5MB." };
      }
      return null;
    },
  });

  return (
    <div
      className="DragnDrop"
      style={{
        border: `2px dashed ${isDragActive ? "#8FB0CE" : fileErrors.length > 0 ? "red" : "white"}`,
        backgroundColor: isDragActive
          ? "#8FB0CE"
          : fileErrors.length > 0
          ? "red"
          : "rgba(0, 0, 0, 0.1)",
      }}
      {...getRootProps()}
    >
      <input {...getInputProps()} />
      <p>
        {isDragActive
          ? "Drop the files here..."
          : "Drag and drop images or videos here, or click to select files."}
      </p>
    </div>
  );
};

export default DropZone;
