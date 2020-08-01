import React from 'react'
import Carousel from 'react-bootstrap/Carousel'

function LandingCarousel(){
  return(
    <Carousel>
      <Carousel.Item>
        <img
          className="d-block w-100"
          src="https://mdbootstrap.com/img/Photos/Slides/img%20(15).jpg"
          alt="First slide"
        />
        <Carousel.Caption>
          <h1>Global Recruitment Internship Program</h1>
          <p>A World of Entrepreneurship at Your Fingertips</p>
        </Carousel.Caption>
      </Carousel.Item>
      <Carousel.Item>
        <img
          className="d-block w-100"
          src="https://mdbootstrap.com/img/Photos/Slides/img%20(16).jpg"
          alt="Third slide"
        />

        <Carousel.Caption>
          <h1>Global Recruitment Internship Program</h1>
          <p>A World of Entrepreneurship at Your Fingertips</p>
        </Carousel.Caption>
      </Carousel.Item>
      <Carousel.Item>
        <img
          className="d-block w-100"
          src="https://mdbootstrap.com/img/Photos/Slides/img%20(17).jpg"
          alt="Third slide"
        />

        <Carousel.Caption>
          <h1>Global Recruitment Internship Program</h1>
          <p>A World of Entrepreneurship at Your Fingertips</p>
        </Carousel.Caption>
      </Carousel.Item>
    </Carousel>
  );
}

export default LandingCarousel
