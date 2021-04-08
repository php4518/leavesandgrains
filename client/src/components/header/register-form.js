import React from 'react';
import { Modal } from 'react-bootstrap';
import NewsLetterForm from "../news-letter/news-letter-form";

const RegisterForm = ({ show = false, handleClose }) => {
  return (
    <Modal show={show} onHide={handleClose} centered>
      {/* <Modal.Header className="border-0" closeButton /> */}
      <Modal.Body className="register-form">
        <div className="text-center">
          <div className="register-form--header">We’re here for you.</div>
          <p className="register-form--info">
            Enter your work email to get supply updates and important medical news.
          </p>
        </div>
        <NewsLetterForm accessedFrom="modal" inputStyle={{ backgroundColor: '#F1F5F8', borderRadius: '15px 0 0 15px', padding: 20 }} />
      </Modal.Body>
    </Modal>
  )
};

export default RegisterForm;
