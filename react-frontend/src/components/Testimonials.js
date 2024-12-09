import React from 'react';
import Slider from 'react-slick';
import '../assets/css/testimonials.css';
import profile3 from '../assets/images/profile3.png';
import profile2 from '../assets/images/profile2.png';
import profile4 from '../assets/images/profile4.png';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

function Testimonials() {
  const settings = {
    dots: true,
    infinite: true,
    speed: 1000,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 5000,
    arrows: true,
  };

  return (
    <div id="testimonials-section">
      <h2>What Our Users Are Saying</h2>
      <Slider {...settings}>
        <div className="testimonial-card">
          <img src={profile3} alt="User 3" className="testimonial-image" />
          <div className="testimonial-content">
            <p>"This platform helped me take my bars to the next level!"</p>
            <p className="user-name">- champagnepapi</p>
          </div>
        </div>
        <div className="testimonial-card">
          <img src={profile2} alt="User 2" className="testimonial-image" />
          <div className="testimonial-content">
            <p>"Not many people know that this platform is where I got my acting skills."</p>
            <p className="user-name">- The Rock</p>
          </div>
        </div>
        <div className="testimonial-card">
          <img src={profile4} alt="User 1" className="testimonial-image" />
          <div className="testimonial-content">
            <p>"This platform has changed the way I learn new skills off the pitch!"</p>
            <p className="user-name">- L. Messi</p>
          </div>
        </div>
      </Slider>
    </div>
  );
}

export default Testimonials;
