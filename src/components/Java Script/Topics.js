import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link, useParams } from 'react-router-dom';
import { Document, Page, pdfjs } from 'react-pdf';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faYoutube } from '@fortawesome/free-brands-svg-icons';
import 'react-pdf/dist/esm/Page/AnnotationLayer.css';
import '../CSS/Topics.css';

pdfjs.GlobalWorkerOptions.workerSrc = `https://cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.min.js`;

export default function Topics() {
  const [topics, setTopics] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [numPages, setNumPages] = useState(null);
  const [currentTopicPdf, setCurrentTopicPdf] = useState(null);
  const { topicName } = useParams();

  useEffect(() => {
    axios
      .get(`https://gate-backend.onrender.com/topics/${topicName}`)
      .then((response) => {
        setTopics(response.data);
        setLoading(false);
      })
      .catch((error) => {
        console.error('Error fetching topics:', error);
        setError('Failed to load data. Please try again later.');
        setLoading(false);
      });
  }, [topicName]);

  const handleCheckboxChange = (event, topic) => {
    const updatedTopics = [...topics];
    const updatedTopic = { ...topic };
    updatedTopic.isDone = event.target.checked;

    axios
      .put(`https://gate-backend.onrender.com/topics/${topic._id}`, { isDone: event.target.checked })
      .then((response) => {
        // Handle the response as needed
      })
      .catch((error) => {
        console.error('Error updating completion status:', error);
      });

    updatedTopics[topics.findIndex((t) => t._id === topic._id)] = updatedTopic;
    setTopics(updatedTopics);
  };

  const onDocumentLoadSuccess = ({ numPages }) => {
    setNumPages(numPages);
  };

  const openPdf = (pdfUrl) => {
    setCurrentTopicPdf(pdfUrl);
  };

  const downloadPdf = (pdfUrl) => {
    const link = document.createElement('a');
    link.href = pdfUrl;
    link.setAttribute('download', true);
    link.click();
  };

  return (
    <div className="container">
      <h1>
        Available Topics
        <Link to="/Form" className="btn btn-primary">
          Add Topic
        </Link>
      </h1>

      {loading ? (
        <div className="spinner-border" role="status">
          <span className="sr-only">Loading...</span>
        </div>
      ) : error ? (
        <div className="alert alert-danger">{error}</div>
      ) : (
        topics.map((topic) => (
          <div key={topic._id} className={`card ${topic.isDone ? 'completed' : ''}`}>
            <div className="card-body">
              <h5 className="card-title">{topic.Topic}</h5>
              
              <p className="card-text">{topic.Description}</p>
              <div className="form-check">
                <input
                  type="checkbox"
                  className="form-check-input"
                  checked={topic.isDone}
                  onChange={(event) => handleCheckboxChange(event, topic)}
                />
                <label className="form-check-label">Mark as Completed</label>
              </div>
              <button className="btn btn-secondary" onClick={() => openPdf(topic.Pdf)}>
                View PDF
              </button>
              <button className="btn btn-secondary" onClick={() => downloadPdf(topic.Pdf)}>
                Download PDF
              </button>
              <a href={topic.YoutubeLink} target="_blank" rel="noopener noreferrer">
                <FontAwesomeIcon icon={faYoutube} style={{ fontSize: '45px', color: 'red' }} />
              </a>
              {currentTopicPdf === topic.Pdf && (
                <Document file={topic.Pdf} onLoadSuccess={onDocumentLoadSuccess}>
                  {Array.from(new Array(numPages), (el, index) => (
                    <Page key={`page_${index + 1}`} pageNumber={index + 1} />
                  ))}
                </Document>
              )}
            </div>
          </div>
        ))
      )}
    </div>
  );
}
