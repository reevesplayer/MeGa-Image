import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './App.css';

function App() {
  const [query, setQuery] = useState('');
  const [images, setImages] = useState([]);

  const handleInputChange = (event) => {
    setQuery(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    searchImages();
  };

  const searchImages = async () => {
    try {
      const response = await axios.get(
        `https://www.googleapis.com/customsearch/v1?key=AIzaSyCPi7lXBQ43goL5WJRiP_UpUKxpX9hxpYw&cx=96bdf025f79b4425a&q=${query}&searchType=image`
      );
      setImages(response.data.items);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    const setImageSize = () => {
      const imgElements = document.getElementsByClassName('search-image');
      for (let i = 0; i < imgElements.length; i++) {
        const imgElement = imgElements[i];
        imgElement.style.height = '200px';
      }
    };

    setImageSize();
  }, [images]);

  return (
    <div className="App">
      <h1>MeGa Image</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={query}
          onChange={handleInputChange}
          placeholder="Search MeGa Image"
        />
        <button type="submit">Search</button>
      </form>
      <div className="image-container">
        {images.map((image) => (
          <div key={image.link} className="image-wrapper">
            <img
              className="search-image"
              src={image.link}
              alt={image.title}
            />
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;
