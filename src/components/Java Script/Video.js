import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../CSS/Video.css';

export default function Video() {
  const [loading, setLoading] = useState(true); // Initial loading state
  const [videos, setVideos] = useState([]);

  useEffect(() => {
    axios
      .get('https://gate-backend.onrender.com/youtube-links')
      .then((response) => {
        console.log('YouTube links:', response.data);
        setVideos(response.data);
      })
      .catch((error) => {
        console.error('Error fetching YouTube links:', error);
      })
      .finally(() => {
        // Set loading to false when data fetching is complete (whether successful or not)
        setLoading(false);
      });
  }, []);

  // Render the header outside of the loop
  const header = <h1>Gate Preparation Videos</h1>;

  return (
    <div className="container1">
      {loading ? (
        // Display the spinning loading spinner while data is being fetched
        <div className="loading-spinner"></div>
      ) : (
        // Display the content when data is ready
        <div>
          {header}
          <div className="video-list">
            {videos.map((video, index) => (
              <div key={index} className="video-item">
                <iframe
                  src={video.YoutubeLink}
                  title={video.title}
                  className="video-responsive"
                ></iframe>
                <h3>{video.title}</h3>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
