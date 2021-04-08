import React, { useState } from 'react';
import _ from "lodash";
import { InputGroup, FormControl, Button, Form } from 'react-bootstrap';

import './news-letter.scss';
import { Register } from "../../services/login";

const NewsLetterForm = (props) => {
  const { accessedFrom = '', inputStyle = {} } = props;
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState({
    text: '',
    type: ''
  });


  const onRegister = async (e) => {
    e.stopPropagation();
    e.preventDefault();
    try {
      setMessage({
        text: '',
      });
      await Register({ email });
      setEmail('');
      setMessage({
        text: 'Successfully Registered',
        type: 'success'
      });
      setTimeout(() => setMessage({ text: '', type: '' }), 3000);
    }
    catch (error) {
      let errorMessage = error.message;
      if (errorMessage.includes('"email" must be a valid email')) {
        errorMessage = 'Invalid email. Please enter proper email address.';
      }
      setMessage({
        text: errorMessage,
        type: 'error'
      });
    }
  };

  return (
    <Form className="news-letter-form" onSubmit={onRegister}>
      <InputGroup>
        <FormControl
          type="email"
          placeholder="youremail@hospital.org"
          aria-label="youremail@hospital.org"
          className="border-0 shadow-none"
          style={inputStyle}
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          isValid={message.type === 'success'}
          isInvalid={message.type === 'error'}
        />
        <InputGroup.Append>
          <Button
            variant="success"
            type="submit"
            className="text-uppercase"
            disabled={!email}
          >
            Sign Up
          </Button>
        </InputGroup.Append>
      </InputGroup>
      {
        message.text &&
        <div className="news-letter-message-container">
          <span className={message.type === 'success' ? 'text-white' : 'text-danger'}>
            {message.text || ''}
          </span>
        </div>
      }
    </Form>
  )
};

export default NewsLetterForm;
