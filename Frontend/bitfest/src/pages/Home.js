import { React, useState, useRef, useEffect } from "react";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import "../css/Home.css";
import Navbar from "../components/navbar/Navbar";
import home_image from "../resources/images/code-tutor.png";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faPaperPlane,
  faBars,
  faPlus,
  faSquarePlus,
  faHouse,
  faSearch,
} from "@fortawesome/free-solid-svg-icons";
import axios from "axios";
import CreateConvo from "../components/overlays/CreateConvo";
import ConvoLineList from "../components/sideLine/sideline";
import UserTrain from "../components/overlays/UserTrain";

import ToolList from "../components/ToolList";
// import ConvoList from "../components/lists/ConvoList";

const Home = () => {
  const [publicPdfs, setPublicPdfs] = useState([]);
  const [filteredPdfs, setFilteredPdfs] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");

  const [isOverlayVisible, setOverlayVisible] = useState(false);
  const toggleOverlay = () => {
    setOverlayVisible(!isOverlayVisible);
  };

  /// get my suggestions
  const { userId, token } = useAuth();
  const navigate = useNavigate();

  //get suggestions as soon as the page loads

  const [convos, setConvos] = useState([]);

  const retrievePublicPdfs = async () => {
    try {
      const response = await axios.get(
        `https://buet-genesis.onrender.com/api/v1/files/public`,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );
      console.log("pdf_files", response);
      setPublicPdfs(response.data);
    } catch (error) {
      console.error(
        "Error fetching public pdfs:",
        error.response ? error.response.data : error.message
      );
    }
  };

  const handleSearch = (e) => {
    setSearchQuery(e.target.value);
    let pdfs = publicPdfs.filter((pdf) =>
      pdf.title.toLowerCase().includes(e.target.value.toLowerCase())
    );
    setFilteredPdfs(pdfs);
  };

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

  useEffect(() => {
    if (!userId) {
      navigate("/");
    } else {
      retrievePublicPdfs();
    }
  }, []);

  useEffect(() => {
    //myConvos();
  }, []);

  return (
    <div>
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
        {/* implement the searchbar */}
        <div className="flex justify-center">
          {/* <FontAwesomeIcon icon={faSearch} size="0.4x" /> */}
          <div className="pdf-search">
            <input
              type="text"
              className="pdf-search-bar"
              placeholder="Search pdfs..."
              value={searchQuery}
              onChange={handleSearch}
            />
          </div>
        </div>

        <div className="pdf-list">
          {filteredPdfs.map((pdf) => (
            <div key={pdf.id} className="pdf-item">
              <div className="pdf-item-title">{pdf.file_title}</div>
              <div className="pdf-item-link">
                <a href={pdf.file_url} target="_blank" rel="noreferrer">
                  View PDF
                </a>
              </div>
            </div>
          ))}
        </div>

        {/* <ConvoList isAll={false} convos={convos} /> */}

        {/* <CreateConvo isOverlayVisible={isOverlayVisible} toggleOverlay={toggleOverlay} /> */}
      </div>
    </div>
  );
};

export default Home;
