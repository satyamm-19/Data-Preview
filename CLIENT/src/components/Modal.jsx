import React from 'react';

function Modal({ isOpen, onClose, userData }) {
  if (!isOpen) return null; // Don't render modal if it's not open

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <h2>Preview Your Data</h2>
        <p><strong>Name:</strong> {userData.name}</p>
        <p><strong>Phone Number:</strong> {userData.phone}</p>
        {userData.image && <img src={userData.image} alt="Image Preview" style={{ maxWidth: '200px' }} />}
        <div>
          <button onClick={onClose}>Close</button>
        </div>
      </div>
    </div>
  );
}

export default Modal;
