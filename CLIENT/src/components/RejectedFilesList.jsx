import React from "react";

const RejectedFilesList = ({ fileErrors, clearErrors }) => (
  <div style={{ margin: "10px 0" }}>
    <h4 style={{ color: "red" }}>Rejected Files:</h4>
    <ul style={{ listStyle: "none", padding: 0 }}>
      {fileErrors.map((error, index) => (
        <li
          key={index}
          style={{
            padding: "5px",
            backgroundColor: "#fff5f5",
            marginBottom: "5px",
            borderRadius: "4px",
            color: "red",
          }}
        >
          <div>{error.file.name}</div>
          <div style={{ fontSize: "0.8em" }}>
            {error.errors.map((e) => e.message).join(", ")}
          </div>
        </li>
      ))}
    </ul>
    <button
      type="button"
      onClick={clearErrors}
      className="btn"
      style={{ color: "red" }}
    >
      Clear errors
    </button>
  </div>
);

export default RejectedFilesList;
