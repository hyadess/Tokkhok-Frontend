import { React, useState, useRef, useEffect } from "react";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import "../css/Home.css";
import Navbar from "../components/Navbar";
import home_image from "../resources/images/code-tutor.png";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faPaperPlane,
  faBars,
  faPlus,
  faSquarePlus,
  faHouse,
} from "@fortawesome/free-solid-svg-icons";
import axios from "axios";
import ToolList from "../components/ToolList";
import SuggestionList from "../components/lists/SuggestionList";
import QuizList from "../components/lists/QuizList";
import LectureList from "../components/lists/LectureList";
import ConvoList from "../components/lists/ConvoList";
import CreateConvo from "../components/overlays/CreateConvo";
import GetSuggestion from "../components/overlays/GetSuggestion";

const Home = () => {
  const [isOverlayVisible, setOverlayVisible] = useState(false);
  const toggleOverlay = () => {
    setOverlayVisible(!isOverlayVisible);
  };

  /// get my suggestions
  const { userId } = useAuth();
  const navigate = useNavigate();

  //get suggestions as soon as the page loads

  const [suggestions, setSuggestions] = useState([]);
  const [lectures, setLectures] = useState([]);
  const [quizes, setQuizes] = useState([]);
  const [convos, setConvos] = useState([]);
  const mySuggestions = async () => {
    try {
      const response = await axios.get(
        `http://127.0.0.1:8002/suggestion/${userId}/get_all`
      );
      console.log(response);
      setSuggestions(response.data);
    } catch (error) {
      console.error(
        "Error fetching suggestions:",
        error.response ? error.response.data : error.message
      );
    }
  };
  const myLectures = async () => {
    try {
      const response = await axios.get(
        `http://127.0.0.1:8002/lecture/${userId}/get_all`
      );
      console.log(response);
      setLectures(response.data);
    } catch (error) {
      console.error(
        "Error fetching lectures:",
        error.response ? error.response.data : error.message
      );
    }
  };
  const myQuizes = async () => {
    try {
      const response = await axios.get(
        `http://127.0.0.1:8002/quiz/${userId}/get_all`
      );
      console.log(response);
      setQuizes(response.data);
    } catch (error) {
      console.error(
        "Error fetching lectures:",
        error.response ? error.response.data : error.message
      );
    }
  };

  const myConvos = async () => {
    try {
      const response = await axios.get(
        `http://127.0.0.1:8002/conversation/${userId}/get_normal`
      );
      console.log(response);
      setConvos(response.data);
    } catch (error) {
      console.error(
        "Error fetching convos:",
        error.response ? error.response.data : error.message
      );
    }
  };

  useEffect(() => {
    if (!userId) {
      navigate("/");
    }
  }, []);

  useEffect(() => {
    mySuggestions();
    myLectures();
    myQuizes();
    myConvos();
  }, []);

  return (
    <div>
      <Navbar />
      <div className="home-center">
        {/* <div className='home-starter'>
                    <div className='home-starter-text'>
                        <div className='heading'> WELCOME TO CODE TUTOR </div>
                        <div className='subheading'> LEARN WITH US </div>
                        <div onClick={toggleOverlay}>
                            <button className='home-starter-button' > ASK TUTOR <FontAwesomeIcon icon={faPlus} size='1.4x' /></button>
                        </div>
                    </div>
                    <div className='home-starter-image'>
                        <img src={home_image} alt='home-image' />
                    </div>


                </div> */}

        <ToolList />
        <SuggestionList isAll={false} suggestions={suggestions} />
        <LectureList isAll={false} lectures={lectures} />
        <QuizList isAll={false} quizes={quizes} />
        <ConvoList isAll={false} convos={convos} />

        {/* <CreateConvo isOverlayVisible={isOverlayVisible} toggleOverlay={toggleOverlay} /> */}
        <GetSuggestion
          isOverlayVisible={isOverlayVisible}
          toggleOverlay={toggleOverlay}
        />
      </div>
    </div>
  );
};

export default Home;
