import React, { useState, useEffect } from "react";
import axios from "axios";
import poster from "../assets/homePoster.jpg";
import videoSrc from "../assets/video3.mp4";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Carousel } from "react-responsive-carousel";
import { Link } from "react-router-dom";
import Footer from "./Footer";

const Home = () => {
  const [showScrollButton, setShowScrollButton] = useState(false);

  const handleScroll = () => {
    if (window.scrollY > 100) {
      setShowScrollButton(true);
    } else {
      setShowScrollButton(false);
    }
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <>
      <div style={{ marginLeft: "5px" }}>
        <Carousel
          showThumbs={true}
          showStatus={false}
          infiniteLoop
          // emulateTouch
          // autoPlay
          useKeyboardArrows
          transitionTime={1000}
          // axis="vertical"
          // selectedItem={1}
          width="1370px"
        >
          <div className="slide-holder" >
            <img
              alt=""
              src="https://images.pexels.com/photos/1954524/pexels-photo-1954524.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
             />
          </div>
          <div className="slide-holder">
            <img
              alt=""
              src="https://images.pexels.com/photos/116078/pexels-photo-116078.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
            />
          </div>
          <div className="slide-holder">
            <img
              alt=""
              src="https://img.freepik.com/free-photo/physical-activity-stats-around-person_23-2150163373.jpg?t=st=1716357137~exp=1716360737~hmac=305e45ab6a17649103c122d72f5692863d9475b5392fdbc06eca3711084274cb&w=1060"
            />
          </div>
          <div className="slide-holder">
            <img
              alt=""
              src="https://img.freepik.com/free-photo/wellness-health-lifestyle-workout-graphic-word_53876-13880.jpg?t=st=1716357071~exp=1716360671~hmac=71f4ddc2ddcca03453295b3465484c93480d3a4c307f61b35dc38b58bcfa77bd&w=1060"
            />
          </div>
          <div className="slide-holder">
            <img
              alt=""
              src="https://images.pexels.com/photos/1954524/pexels-photo-1954524.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
            />
          </div>
          <div className="slide-holder">
            <img
              alt=""
              src="https://images.pexels.com/photos/3253501/pexels-photo-3253501.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
            />
          </div>
        </Carousel>
      </div>

      <div class="main-1">
        <marquee class="marq" bgcolor="#2663ff" direction="right" loop="10">
          <div class="geek1">
            <ul className="submenu">
              <li>
                <Link to="/chest">Chest</Link>
              </li>
              <li>
                <Link to="/Shoulder">Shoulder</Link>
              </li>
              <li>
                <Link to="/leg">Legs</Link>
              </li>
              <li>
                <Link to="/back">Back</Link>
              </li>
              <li>
                <Link to="/biceps">Biceps</Link>
              </li>
              <li>
                <Link to="/triceps">Triceps</Link>
              </li>
              <li>
                <Link to="/fullBody">Full Body</Link>
              </li>
              {/* <li><Link to="/waterIntake">Water Intake</Link></li> */}
            </ul>
          </div>
        </marquee>
      </div>

      <div className="video-container">
        <img src={poster} alt="" />
        <div className="video-text">
          <h1 className="white-text">A BETTER WAY TO TRACK YOUR FITNESS</h1>
        </div>
      </div>

      <div className="fitnessq">
        <img src={require("../assets/fq2.jpeg")} alt="fitnessquo" />
      </div>
      <div className="quotation">
        <img src={require("../assets/quotation.png")} alt="quotation" />
      </div>

      <div className="fithead">
        <h2 className="siq"> STRENGTH IN WORDS</h2>
      </div>
      <FitnessQuote />
      {showScrollButton && (
        <button className="scroll-to-top" onClick={scrollToTop}>
          <img
            src={require("../assets/sb2.png")}
            alt="image4"
            className="button-image"
          />
        </button>
      )}
    </>
  );
};

const FitnessQuote = () => {
  const [quoteData, setQuoteData] = useState({ quote: "", author: "" });
  const [error, setError] = useState(null);

  useEffect(() => {
    const category = "fitness";
    axios
      .get(`https://api.api-ninjas.com/v1/quotes?category=${category}`, {
        headers: { "X-Api-Key": "Sd9g5wifRzcJRsAIFAdgXw==xOiWi1sqERGAUeIO" },
      })
      .then((response) => {
        const data = response.data;
        const randomIndex = Math.floor(Math.random() * data.length);
        setQuoteData({
          quote: data[randomIndex].quote,
          author: data[randomIndex].author,
        });
        console.log(data);
      })
      .catch((error) => {
        console.error("Error fetching quote:", error);
        setError("Failed to fetch quote. Please try again later.");
      });
  }, []);
  return (
    <>
    <div className="fitness-quote">
      {quoteData.quote ? (
        <p className="fq">
          {quoteData.quote} <p className="authour">- {quoteData.author}</p>
        </p>
      ) : (
        <p className="loading">{error || "Loading..."}</p>
      )}
    </div>
    <Footer/>
    </>
  );
};

export default Home;
