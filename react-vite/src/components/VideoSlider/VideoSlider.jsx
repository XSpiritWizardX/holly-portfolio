import  { useRef } from 'react';
import './VideoSlider.css';

const VideoSlider = ({ videos }) => {
  const sliderRef = useRef(null);

  const scroll = (direction) => {
    const scrollAmount = 500;
    sliderRef.current.scrollBy({
      left: direction === 'left' ? -scrollAmount : scrollAmount,
      behavior: 'smooth',
    });
  };

  return (
    <div className="video-slider-wrapper">
      <h2 className="slider-title">Featured Music</h2>
      <div className="slider-container">
        <button className="slider-arrow left" onClick={() => scroll('left')}>&larr;</button>
        <div className="video-slider" ref={sliderRef}>
          {videos.map((video, index) => (
            <div className="video-container" key={index}>
              <iframe
                width="100%"
                height="315"
                src={video.src}
                title={video.title}
                frameBorder="0"
                allowFullScreen
              ></iframe>

            </div>
          ))}
        </div>
        <button className="slider-arrow right" onClick={() => scroll('right')}>&rarr;</button>
      </div>
    </div>
  );
};

export default VideoSlider;
