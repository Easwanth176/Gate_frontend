import React, { useState, useCallback } from 'react';
import { Form, Button, Spinner } from 'react-bootstrap';
import { useDropzone } from 'react-dropzone';
import '../CSS/Form.css';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

export default function FormComponent() {
  const [formData, setFormData] = useState({
    Type: 'Probability',
    Topic: '',
    Description: '', // Added Description field
    YoutubeLink: '',
    Pdf: null,
  });

  const [formErrors, setFormErrors] = useState({
    Type: '',
    Topic: '',
    Description: '', // Added Description field error
    YoutubeLink: '',
    Pdf: '',
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');
  const [failureMessage, setFailureMessage] = useState('');

  const [redirectToBody, setRedirectToBody] = useState(false);

  const onDrop = useCallback((acceptedFiles) => {
    const file = acceptedFiles[0];
    setFormData({ ...formData, Pdf: file });
  }, [formData]);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop });

  const validateForm = () => {
    let isValid = true;
    const newErrors = {
      Type: '',
      Topic: '',
      Description: '', // Added Description field error
      YoutubeLink: '',
      Pdf: '',
    };

    if (!formData.Topic.trim()) {
      newErrors.Topic = 'Topic is required';
      isValid = false;
    }

    if (!formData.Description.trim()) {
      newErrors.Description = 'Description is required';
      isValid = false;
    }

    if (!formData.YoutubeLink.trim()) {
      newErrors.YoutubeLink = 'YouTube Link is required';
      isValid = false;
    }

    if (!formData.Pdf) {
      newErrors.Pdf = 'PDF File is required';
      isValid = false;
    }

    setFormErrors(newErrors);
    return isValid;
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (validateForm()) {
      setIsSubmitting(true);

      const formDataToSend = new FormData();
      formDataToSend.append('Type', formData.Type);
      formDataToSend.append('Topic', formData.Topic);
      formDataToSend.append('Description', formData.Description); // Added Description
      formDataToSend.append('YoutubeLink', formData.YoutubeLink);
      formDataToSend.append('Pdf', formData.Pdf);

      try {
        const response = await axios.post('https://gate-backend.onrender.com/submitForm', formDataToSend, {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        });

        if (response.status === 201) {
          setSuccessMessage('Form data submitted successfully');
          setFormData({
            Type: 'Probability',
            Topic: '',
            Description: '', // Clear the Description field
            YoutubeLink: '',
            Pdf: null,
          });
          setFormErrors({
            Type: '',
            Topic: '',
            Description: '', // Clear the Description field error
            YoutubeLink: '',
            Pdf: '',
          });
          setFailureMessage('');
          setIsSubmitting(false);
          setRedirectToBody(true);
        } else {
          setFailureMessage('Error submitting form data');
          setSuccessMessage('');
          setIsSubmitting(false);
        }
      } catch (error) {
        console.error('Error:', error);
        setFailureMessage('Error submitting form data');
        setSuccessMessage('');
        setIsSubmitting(false);
      }
    }
  };


  return (
    <Form onSubmit={handleSubmit} className="form-container">
      <h1>Add Topic</h1>
      <Form.Group controlId="exampleForm.ControlSelect1">
      <Form.Label>Type</Form.Label>
        <Form.Control
          as="select"
          name="Type"
          value={formData.Type}
          onChange={handleInputChange}
        >
          <option value="Probability">Probability</option>
          <option value="Linear Algebra">Linear Algebra</option>
          <option value="Calculus and Optimization">Calculus and Optimization</option>
          <option value="Data Structures and Algorithms">Data Structures and Algorithms</option>
          <option value="Database">Database</option>
          <option value="Machine Learning">Machine Learning</option>
          <option value="Artificial Intelligence">Artificial Intelligence</option>
        </Form.Control>
      </Form.Group>
      <Form.Group controlId="exampleForm.ControlInput1">
      <Form.Label>Topic</Form.Label>
        <Form.Control
          type="text"
          name="Topic"
          placeholder="Topic"
          value={formData.Topic}
          onChange={handleInputChange}
          required
        />
        {formErrors.Topic && <span className="error">{formErrors.Topic}</span>}
      </Form.Group>
      <Form.Group controlId="exampleForm.ControlInput2">
      <Form.Label>Description</Form.Label>
        <Form.Control
          type="text"
          name="Description"
          placeholder="Description"
          value={formData.Description}
          onChange={handleInputChange}
          required
        />
        {formErrors.Description && <span className="error">{formErrors.Description}</span>}
      </Form.Group>
      <Form.Group controlId="exampleForm.ControlInput3">
      <Form.Label>YouTube Link</Form.Label>
        <Form.Control
          type="text"
          name="YoutubeLink"
          placeholder="YouTube Link"
          value={formData.YoutubeLink}
          onChange={handleInputChange}
          required
        />
        {formErrors.YoutubeLink && <span className="error">{formErrors.YoutubeLink}</span>}
      </Form.Group>
      <div className="pdf-dropzone" {...getRootProps()}>
        <input {...getInputProps()} />
        {isDragActive ? (
          <p>Drop the PDF file here ...</p>
        ) : (
          <p>Drag 'n' drop a PDF file here, or click to select a file</p>
        )}
        {formData.Pdf && <p>Selected PDF: {formData.Pdf.name}</p>}
      </div>
      {formErrors.Pdf && <span className="error">{formErrors.Pdf}</span>}
      <Button variant="primary" type="submit">
        {isSubmitting ? (
          <Spinner animation="border" size="sm" role="status">
            <span className="sr-only">Loading...</span>
          </Spinner>
        ) : (
          'Submit'
        )}
      </Button>
      {successMessage && <div className="success-message">{successMessage}</div>}
      {failureMessage && <div className="failure-message">{failureMessage}</div>}
    </Form>
  );
}
