import { React, useState, useEffect } from "react";
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
import ConvoList from "../components/cardLists/ConvoList";

const Home = () => {
  const [publicPdfs, setPublicPdfs] = useState([]);
  const [filteredPdfs, setFilteredPdfs] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");

  const [isOverlayVisible, setOverlayVisible] = useState(false);
  const toggleOverlay = () => {
    setOverlayVisible(!isOverlayVisible);
  };

  const { userId, token } = useAuth();
  const navigate = useNavigate();

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
      setFilteredPdfs(response.data); // Initialize filtered PDFs
    } catch (error) {
      console.error(
        "Error fetching public pdfs:",
        error.response ? error.response.data : error.message
      );
    }
  };

  const handleSearch = (e) => {
    setSearchQuery(e.target.value);
    const query = e.target.value.toLowerCase();

    // Use Unicode-aware filtering for both Bangla and English
    const pdfs = publicPdfs.filter((pdf) => {
      const title = pdf.file_title ? pdf.file_title.toLowerCase() : "";
      return title.includes(query);
    });

    setFilteredPdfs(pdfs);
  };

  useEffect(() => {
    if (!userId) {
      navigate("/");
    } else {
      retrievePublicPdfs();
    }
  }, []);

  return (
    <div>
      <div className="home-center">
        <ToolList />
        {/* Search Bar */}
        <div className="flex justify-center">
          <div className="pdf-search">
            <input
              type="text"
              className="pdf-search-bar"
              placeholder="Search PDFs (Bangla)..."
              value={searchQuery}
              onChange={handleSearch}
            />
          </div>
        </div>

        {/* Filtered PDF List */}
        <div className="pdf-list">
          {filteredPdfs.map((pdf) => (
            <div key={pdf.id} className="pdf-item">
              <div className="pdf-item-title">{pdf.title}</div>
              <div className="pdf-item-link">
                <a href={pdf.file_url} target="_blank" rel="noreferrer">
                  View PDF
                </a>
              </div>
            </div>
          ))}
        </div>
        <div className="tool-list-title">PREVIOUS CONVERSATIONS</div>
        <ConvoList />
      </div>
    </div>
  );
};

export default Home;
