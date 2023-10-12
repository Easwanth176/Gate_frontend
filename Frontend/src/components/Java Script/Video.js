import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../CSS/Video.css';

export default function Video() {
  const [videos, setVideos] = useState([]);

  useEffect(() => {
    axios
      .get('http://localhost:5000/youtube-links')
      .then((response) => {
        console.log('YouTube links:', response.data);
        setVideos(response.data);
      })
      .catch((error) => {
        console.error('Error fetching YouTube links:', error);
      });
  }, []);

  // Render the header outside of the loop
  const header = (
    <h1>Gate Preparation Videos</h1>
  );

  return (
    <div className="container1">
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
  );
}
