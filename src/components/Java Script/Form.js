import React, { useState } from 'react';
import { Form, Button } from 'react-bootstrap';
import '../CSS/Form.css';
import axios from 'axios';

export default function FormComponent() {
  const [formData, setFormData] = useState({
    Type: 'Probability',
    Topic: '',
    Description: '', // Added Description field
    YoutubeLink: '',
    Pdf: null,
  });

  const [formErrors, setFormErrors] = useState({
    Topic: '',
    Description: '', // Added Description field error
    YoutubeLink: '',
    Pdf: '',
  });

  const validateForm = () => {
    let isValid = true;
    const newErrors = {
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

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setFormData({ ...formData, Pdf: file });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (validateForm()) {
      const formDataToSend = new FormData();
      formDataToSend.append('Type', formData.Type);
      formDataToSend.append('Topic', formData.Topic);
      formDataToSend.append('Description', formData.Description); // Added Description
      formDataToSend.append('YoutubeLink', formData.YoutubeLink);
      formDataToSend.append('Pdf', formData.Pdf);

      try {
        const response = await axios.post(
          'https://gate-backend.onrender.com/submitForm',
          formDataToSend,
          {
            headers: {
              'Content-Type': 'multipart/form-data',
            },
          }
        );

        if (response.status === 201) {
          console.log('Form data submitted successfully');
          setFormData({
            Type: 'Probability',
            Topic: '',
            Description: '', // Clear the Description field
            YoutubeLink: '',
            Pdf: null,
          });
          setFormErrors({
            Topic: '',
            Description: '', // Clear the Description field error
            YoutubeLink: '',
            Pdf: '',
          });
        } else {
          console.error('Error submitting form data');
        }
      } catch (error) {
        console.error('Error:', error);
      }
    }
  };

  return (
    <Form onSubmit={handleSubmit}>
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
          <option value="Artificial Intelligence">Artificial Intelligencee</option>
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
        {formErrors.YoutubeLink && (
          <span className="error">{formErrors.YoutubeLink}</span>
        )}
      </Form.Group>
      <Form.Group controlId="exampleForm.ControlInput4">
        <Form.Label>Upload PDF</Form.Label>
        <Form.Control
          type="file"
          name="Pdf"
          onChange={handleFileChange}
          required
        />
        {formErrors.Pdf && <span className="error">{formErrors.Pdf}</span>}
      </Form.Group>
      <Button variant="primary" type="submit">
        Submit
      </Button>
    </Form>
  );
}
