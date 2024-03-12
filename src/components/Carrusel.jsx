"use client";
import { useState } from 'react';
import '../styles/Carrousel.css'; // Importa tu archivo CSS
const Carousel = () => {
    const [activeIndex, setActiveIndex] = useState(null);

    const handleImageClick = (index) => {
        setActiveIndex(activeIndex === index ? null : index);
    };

    return (
        <div className="container">
            {[1, 2, 3, 4, 5].map((index) => (
                <div
                    key={index}
                    className={`panel image${index} ${activeIndex === index ? 'active' : ''}`}
                    onClick={() => handleImageClick(index)}
                >
                    <h3>Image {index}</h3>
                </div>
            ))}
        </div>
    );
};
  

export default Carousel;
