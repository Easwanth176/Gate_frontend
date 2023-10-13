import React, { useState } from 'react';
import '../CSS/Video.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSpinner } from '@fortawesome/free-solid-svg-icons';

export default function Video() {
  const [videoUrl, setVideoUrl] = useState('');
  const [videoSummary, setVideoSummary] = useState('Your content will be provided here.');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleVideoUrlChange = (e) => {
    setVideoUrl(e.target.value);

    // Clear the error when the user changes the URL
    if (error) {
      setError('');
    }
  };

  const isValidURL = (url) => {
    // Regular expression to validate URL (basic validation)
    const pattern = /^(https?|ftp):\/\/[^\s/$.?#].[^\s]*$/i;
    return pattern.test(url);
  };

  const handleSubmit = async () => {
    if (!isValidURL(videoUrl)) {
      setError('Please enter a valid URL');
      return;
    }

    setVideoSummary('');
    setLoading(true);

    // Simulate an API request delay
    await new Promise((resolve) => setTimeout(resolve, 3000));

    setLoading(false);
    setVideoSummary('Unable to process the data');
  };

  return (
    <div className="container">
      <h1>Video Summarization</h1>
      <div className="search-container">
        <input
          type="text"
          placeholder="Enter video URL"
          value={videoUrl}
          onChange={handleVideoUrlChange}
        />
        <button onClick={handleSubmit}>Submit</button>
        {error && <p className="error-message">{error}</p>}
      </div>
      <div className={`summary-container ${loading ? 'loading' : ''}`}>
        {loading && <FontAwesomeIcon icon={faSpinner} spin size="5x" />}
        {!loading && <p>{videoSummary}</p>}
      </div>
    </div>
  );
}
