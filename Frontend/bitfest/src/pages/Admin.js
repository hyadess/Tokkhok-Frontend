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
import UserTrainShow from "../components/UserTrainShow";
// import ConvoList from "../components/lists/ConvoList";

const Admin = () => {
  const { userId, token } = useAuth();
  const navigate = useNavigate();

  const [allUserTrains, setAllUserTrains] = useState([]);
  const [approvedUserTrains, setApprovedUserTrains] = useState([]);
  const [rejectedUserTrains, setRejectedUserTrains] = useState([]);

  const getAllUserTrains = async () => {
    try {
      const response = await axios.get(
        "https://buet-genesis.onrender.com/api/v1/usertrain/",
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );
      console.log("user_trains", response);
      setAllUserTrains(response.data);
    } catch (error) {
      console.error(
        "Error fetching user trains:",
        error.response ? error.response.data : error.message
      );
    }
  };

  const getApprovedUserTrains = async () => {
    try {
      const response = await axios.get(
        `https://buet-genesis.onrender.com/api/v1/usertrain/approved`,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );
      console.log("user_trains", response);
      setApprovedUserTrains(response.data);
    } catch (error) {
      console.error(
        "Error fetching user trains:",
        error.response ? error.response.data : error.message
      );
    }
  };

  const getRejectedUserTrains = async () => {
    try {
      const response = await axios.get(
        `https://buet-genesis.onrender.com/api/v1/usertrain/unapproved`,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );
      console.log("user_trains", response);
      setRejectedUserTrains(response.data);
    } catch (error) {
      console.error(
        "Error fetching user trains:",
        error.response ? error.response.data : error.message
      );
    }
  };

  const updateUserTrain = async (prevUserTrain,isApproved) => {
    try {
      const response = await axios.put(
        `https://buet-genesis.onrender.com/api/v1/usertrain/${prevUserTrain.id}`,
        {
          banglish: prevUserTrain.banglish,
          bangla: prevUserTrain.bangla,
          is_approved: isApproved,
        },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );
      console.log("user_train updated", response);
      getAllUserTrains();
      getApprovedUserTrains();
      getRejectedUserTrains();
    } catch (error) {
      console.error(
        "Error updating user train:",
        error.response ? error.response.data : error.message
      );
    }
  }

  useEffect(() => {
    if (!userId) {
      navigate("/");
    } else {
      getAllUserTrains();
      getApprovedUserTrains();
      getRejectedUserTrains();
    }
  }, []);

  return (
    <div>
      <div className="home-center">
        <div className="tool-list-title">ALL TRAINING PAIRS</div>

        <div className="flex justify-center ">
          {/* all userTrains  as an array of div*/}
          {allUserTrains.map((userTrain, index) => (
            <UserTrainShow key={index} userTrain={userTrain} updateUserTrain={updateUserTrain}/>
          ))}
        </div>
        <div className="tool-list-title">APPROVED TRAINING PAIRS</div>

        <div className="flex justify-center ">
          {/* approved userTrains  as an array of div*/}
          {approvedUserTrains.map((userTrain, index) => (
            <UserTrainShow key={index} userTrain={userTrain} updateUserTrain={updateUserTrain}/>
          ))}
        </div>
        <div className="tool-list-title">UNAPPROVED TRAINING PAIRS</div>
        <div className="flex justify-center ">
          {/* rejected userTrains  as an array of div*/}
          {rejectedUserTrains.map((userTrain, index) => (
            <UserTrainShow key={index} userTrain={userTrain} updateUserTrain={updateUserTrain}/>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Admin;
