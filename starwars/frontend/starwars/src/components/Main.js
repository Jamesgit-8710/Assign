import React from "react";
import "../styles/main.css";
import { Carousel } from "antd";
import Button from "../components/Button";
import ashoka from '../assets/ashoka.jpeg';

const Main = () => {
  const carouselImage = [
    "https://lumiere-a.akamaihd.net/v1/images/sw-outlaws-sdcc-2023-sw2-hero-desktop_5612e467.jpeg?region=0,0,1600,686",
    "https://lumiere-a.akamaihd.net/v1/images/sdcc-2023-ahsoka-props-sashsingle-hero-desktop_ef762575.jpeg?region=0,0,2048,878",
    "https://lumiere-a.akamaihd.net/v1/images/sdcc-2023-hasbro-sashsingle-hero-desktop_9ca64590.jpeg?region=0,0,2048,878",
    "https://lumiere-a.akamaihd.net/v1/images/sdcc-2023-publishing-sashsingle-hero-desktop_13297631.jpeg?region=0,0,2048,878",
    "https://lumiere-a.akamaihd.net/v1/images/ahsoka-trailer-0711-hero-static-desktop_1b32c6e4.jpeg?region=0,0,2048,878",
    "https://lumiere-a.akamaihd.net/v1/images/ahsoka-featurette-0710-hero-desktop_5ab03520.jpeg?region=0,0,2048,878",
  ];

  //   const contentStyle = {
  //     height: "610px",
  //     // color: "#fff",
  //     // lineHeight: "160px",
  //     // textAlign: "center",
  //     // background: "#364d79",
  //     backgroundImage: `url(${imageCarousel[0]})`,
  //   };

  return (
    <div className="main">
      <h5 className="tagline">
        ALL OF YOUR STAR WARS FAVORITES NOW STREAMING ON DISNEY+
      </h5>
      <Carousel autoplay>
        <div>
          <div
            style={{ backgroundImage: `url(${carouselImage[0]})` }}
            className="carouselItem"
          >
            <div
              className="item"
              style={{ float: "right", textAlign: "right" }}
            >
              <div className="content">
                <h1 className="title">
                  SDCC 2023: INSIDE STAR WARS OUTLAWS
                </h1>
                <p className="description">
                  Watch a new behind-the-scenes video and read an exclusive
                  interview with Julian Gerighty, creative director of the
                  upcoming open-world game.
                </p>
                <div
                  style={{ display: "flex", float: "right" }}
                  className="buttons"
                >
                  <Button
                    bgColor={"rgb(255, 224, 46)"}
                    color={"black"}
                    text={"WATCH NOW"}
                  />
                  &#8195;
                  <Button
                    bgColor={"black"}
                    color={"white"}
                    text={"READ INTERVIEW"}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
        <div>
          <div
            style={{ backgroundImage: `url(${carouselImage[1]})` }}
            className="carouselItem"
          >
            <div className="item" style={{ float: "left", textAlign: "left" }}>
              <div className="content">
                <h1 className="title">
                  SDCC 2023: SEE ASHOKA PROPS AND COSTUMES FROM THE LUCASFILM
                  PAVILION
                </h1>
                <p className="description">
                  Check out photos of stunning artifacts from the upcoming
                  Disney+ series.
                </p>
                <div
                  style={{ display: "flex", float: "left" }}
                  className="buttons"
                >
                  <Button
                    bgColor={"rgb(255, 224, 46)"}
                    color={"black"}
                    text={"READ MORE"}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
        <div>
          <div
            style={{ backgroundImage: `url(${carouselImage[2]})` }}
            className="carouselItem"
          >
            <div className="item" style={{ float: "left", textAlign: "left" }}>
              <div className="content">
                <h1 className="title">
                  SDCC 2023: INSIDE STAR WARS OUTLAWS
                </h1>
                <p className="description">
                  Watch a new behind-the-scenes video and read an exclusive
                  interview with Julian Gerighty, creative director of the
                  upcoming open-world game.
                </p>
                <div
                  style={{ display: "flex", float: "left" }}
                  className="buttons"
                >
                  <Button
                    bgColor={"rgb(255, 224, 46)"}
                    color={"black"}
                    text={"READ MORE"}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
        <div>
          <div
            style={{ backgroundImage: `url(${carouselImage[3]})` }}
            className="carouselItem"
          >
            <div className="item" style={{ float: "left", textAlign: "left" }}>
              <div className="content">
                <h1 className="title">
                  SDCC 2023: INSIDE STAR WARS OUTLAWS
                </h1>
                <p className="description">
                  Watch a new behind-the-scenes video and read an exclusive
                  interview with Julian Gerighty, creative director of the
                  upcoming open-world game.
                </p>
                <div
                  style={{ display: "flex", float: "left" }}
                  className="buttons"
                >
                  <Button
                    bgColor={"rgb(255, 224, 46)"}
                    color={"black"}
                    text={"READ MORE"}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
        <div>
          <div
            style={{ backgroundImage: `url(${carouselImage[4]})` }}
            className="carouselItem"
          >
            <div className="item" style={{ float: "left", textAlign: "left" }}>
              <div className="content">
                <h1 className="styledTitle">
                ASHOKA
                </h1>
                <p className="description">
                  Watch a new behind-the-scenes video and read an exclusive
                  interview with Julian Gerighty, creative director of the
                  upcoming open-world game.
                </p>
                <div
                  style={{ display: "flex", float: "left" }}
                  className="buttons"
                >
                  <Button
                    bgColor={"rgb(255, 224, 46)"}
                    color={"black"}
                    text={"READ MORE"}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
        <div>
          <div
            style={{ backgroundImage: `url(${carouselImage[5]})` }}
            className="carouselItem"
          >
            <div className="item" style={{ float: "left", textAlign: "left" }}>
              <div className="content">
                <h1 className="styledTitle">
                  WARS
                </h1>
                <p className="description">
                  Watch a new behind-the-scenes video and read an exclusive
                  interview with Julian Gerighty, creative director of the
                  upcoming open-world game.
                </p>
                <div
                  style={{ display: "flex", float: "left" }}
                  className="buttons"
                >
                  <Button
                    bgColor={"rgb(255, 224, 46)"}
                    color={"black"}
                    text={"READ MORE"}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </Carousel>
      <div className="Carousel2">
        <img src={ashoka} className="mainImage" alt="mainImage"/>
      </div>
    </div>
  );
};

export default Main;
