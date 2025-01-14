import React from "react";

const AcceptedFilesList = ({ files, removeFile }) => (
  <div style={{ margin: "10px 0" }}>
    <h4>Accepted Files:</h4>
    <ul style={{ listStyle: "none", padding: 0 }}>
      {files.map((file, index) => (
        <li
          key={index}
          style={{
            color: "#333",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            padding: "5px",
            backgroundColor: "#f0f9ff",
            marginBottom: "5px",
            borderRadius: "4px",
          }}
        >
          <span>{file.name}</span>
          <button
            className="btn"
            type="button"
            onClick={() => removeFile(index)}
            style={{ color: "red" }}
          >
            Remove
          </button>
        </li>
      ))}
    </ul>
  </div>
);

export default AcceptedFilesList;
