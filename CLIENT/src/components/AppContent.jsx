
import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import InputField from "./InputField";
import DropZone from "./DropZone";
import AcceptedFilesList from "./AcceptedFilesList";
import RejectedFilesList from "./RejectedFilesList";
import Preview from "./Preview";  // Optionally import Preview component if needed inline

function AppContent() {
  const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm();
  const [acceptedFiles, setAcceptedFiles] = useState([]);
  const [fileErrors, setFileErrors] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [preview, setPreview] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    if (acceptedFiles.length > 0) {
      const objectUrl = URL.createObjectURL(acceptedFiles[0]);
      setPreview(objectUrl);
      return () => URL.revokeObjectURL(objectUrl);
    }
  }, [acceptedFiles]);

  const onDrop = (acceptedFiles, rejectedFiles) => {
    setAcceptedFiles((prev) => [...prev, ...acceptedFiles]);
    setFileErrors(rejectedFiles);
  };

  const onSubmit = async (data) => {
    setIsLoading(true);
    setError(null);

    const formData = new FormData();
    formData.append('name', data.name);
    formData.append('phoneNumber', data.numb);

    if (acceptedFiles.length > 0) {
      formData.append('image', acceptedFiles[0]);
    }

    try {
      const response = await axios.post(
        "http://localhost:5000/api/submit", 
        formData,
        { headers: { 'Content-Type': 'multipart/form-data' } }
      );
      console.log("Data sent to the backend successfully!", response.data);
      navigate("/success");  // Redirect to success page after submission
    } catch (err) {
      setError(err.response?.data?.message || 'Something went wrong');
      console.error("Error sending data to the backend:", err);
    } finally {
      setIsLoading(false);
    }
  };

  const removeFile = (index) => setAcceptedFiles((files) => files.filter((_, i) => i !== index));
  const clearErrors = () => setFileErrors([]);

  const goToPreview = () => {
    const userData = {
      name: document.querySelector('input[name="name"]').value,
      phone: document.querySelector('input[name="numb"]').value,
      image: preview || ""
    };
    localStorage.setItem("userData", JSON.stringify(userData));
    navigate("/preview");  // Navigate to preview page
  };

  return (
    <div className="app-content">
      {error && (
        <div className="error-banner">
          {error}
          <button onClick={() => setError(null)}>✕</button>
        </div>
      )}

      <form onSubmit={handleSubmit(onSubmit)}>
        <InputField
          label="Name:"
          type="text"
          register={register}
          error={errors.name}
          validation={{
            name: "name",
            options: {
              required: "Name is required",
              pattern: { value: /^[A-Za-z\s]+$/, message: "Name is not valid" },
              minLength: { value: 3, message: "Minimum length is 3" },
              maxLength: { value: 30, message: "Maximum length is 30" }
            },
          }}
        />

        <InputField
          label="Phone Number:"
          type="text"
          register={register}
          error={errors.numb}
          validation={{
            name: "numb",
            options: {
              required: "Phone number is required",
              pattern: { value: /^[0-9]+$/, message: "Number is not valid" },
              minLength: { value: 10, message: "Number must be 10-11 digits" },
              maxLength: { value: 11, message: "Number must be 10-11 digits" }
            },
          }}
        />

        <DropZone onDrop={onDrop} fileErrors={fileErrors} />

        {preview && (
          <div className="image-preview">
            <h4>Image Preview:</h4>
            <img src={preview} alt="Upload preview" style={{ maxWidth: '200px' }} />
          </div>
        )}

        <AcceptedFilesList files={acceptedFiles} removeFile={removeFile} />
        <RejectedFilesList fileErrors={fileErrors} clearErrors={clearErrors} />
        <button type="button" onClick={() => setPreview(null)}>Clear Preview</button>

        <button type="button" onClick={goToPreview}>Preview</button> {/* Navigate to Preview Page */}

        <button
          type="submit"
          disabled={isLoading || isSubmitting}
          className="submit-button"
        >
          {isLoading ? "Submitting..." : "Submit"}
        </button>
      </form>
    </div>
  );
}

export default AppContent;
