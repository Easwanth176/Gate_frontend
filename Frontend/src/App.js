import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import Body from './components/Java Script/Body';
import Entry from './components/Java Script/Entry';
import Topics from './components/Java Script/Topics';
import Form from './components/Java Script/Form';
import Video from './components/Java Script/Video';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <header className="App">
          <Entry />
        </header>
        <Routes>
          <Route path="/" element={<Body />} />
          <Route path="/body" element={<Body />} />
          <Route path="/form" element={<Form />} />
          <Route path="/topics/:topicName" element={<Topics />} />
          <Route path="/video" element={<Video />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
