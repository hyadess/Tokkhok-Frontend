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


// import ToolList from "../components/ToolList";
// import ConvoList from "../components/lists/ConvoList";


const Home = () => {
  const [isOverlayVisible, setOverlayVisible] = useState(false);
  const toggleOverlay = () => {
    setOverlayVisible(!isOverlayVisible);
  };

  /// get my suggestions
  // const { userId } = useAuth();
  const navigate = useNavigate();

  //get suggestions as soon as the page loads

  const [convos, setConvos] = useState([]);

  // const myConvos = async () => {
  //   try {
  //     const response = await axios.get(
  //       `http://127.0.0.1:8002/conversation/${userId}/get_normal`
  //     );
  //     console.log(response);
  //     setConvos(response.data);
  //   } catch (error) {
  //     console.error(
  //       "Error fetching convos:",
  //       error.response ? error.response.data : error.message
  //     );
  //   }
  // };



  // useEffect(() => {
  //   if (!userId) {
  //     navigate("/");
  //   }
  // }, []);

  // useEffect(() => {
  //   myConvos();
  // }, []);

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

        {/* <ToolList />
        <ConvoList isAll={false} convos={convos} /> */}

        {/* <CreateConvo isOverlayVisible={isOverlayVisible} toggleOverlay={toggleOverlay} /> */}

      </div>
    </div>
  );
};

export default Home;
