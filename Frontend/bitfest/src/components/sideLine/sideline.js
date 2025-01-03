import { React, useState, useRef, useEffect } from "react";
import { useAuth } from "../../context/AuthContext";
import { useNavigate, useParams } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faPaperPlane,
  faBars,
  faPlus,
  faSquarePlus,
  faHouse,
  faChalkboard,
  faSubscript,
  faQuestion,
  faTrademark,
  faDumpster,
  faFire,
  faList,
  faEdit,
} from "@fortawesome/free-solid-svg-icons";
import "./LineList.css";
import axios from "axios";

//for toast

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "../../css/Toast.css";

//------------------------

const ConvoLineList = ({ current }) => {

  
  const [convos, setConvos] = useState([]);
  const { userId,token } = useAuth();
  //navigate
  const navigate = useNavigate();

  const myConvos = async () => {
    try {
      const response = await axios.get(
        `https://buet-genesis.onrender.com/api/v1/chats/users/${userId}`,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
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


  const showToast = (type, text) => {
    toast(text, {
      type: { type }, // or 'success', 'error', 'warning', 'info'
      position: "top-right", // or 'top-left', 'bottom-left', 'bottom-right', 'top-center', 'bottom-center'
      autoClose: 2000, // milliseconds
      hideProgressBar: false,
      className: "toast-container",
      bodyClassName: "toast-body",
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    });
  };

  const openConvo = (index) => {
    //navigate to the convo
    navigate(`/conversation/${index}`);
    //toast
    showToast("success", "conversation is opened");
  
  };
  const deleteConvo = async (i) => {
    console.log(`${i} th convo is deleted`);
    const response = await axios.delete(
      `https://buet-genesis.onrender.com/api/v1/chats/${i}`,
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      }
    );

    console.log(response.data);
    // now we are getting the updated suggestion from the data, delete the suggestion where the id matches

    const updatedConvos = convos.filter((convo) => convo.id !== i);
    setConvos(updatedConvos);
    const message = response.data.message;
    if (message === "Conversation deleted successfully") {
      showToast("success", "conversation is deleted");
    }
  };

  useEffect(() => {
    myConvos();
  }, []);

  return (
    <>
      <ToastContainer />
      <div className="convo-list-container">
        {convos.length === 0 ? (
          <div></div>
        ) : (
          convos.map((convo, index) =>
            index > 5 || convo.id == current ? (
              <div></div>
            ) : (
              <div className="convo-list-convo">
                <div className="convo-list-text">{convo.chat_name}</div>

                <div className="convo-list-button-container">
                  <div
                    className="convo-list-button"
                    onClick={() => deleteConvo(convo.id)}
                  >
                    <FontAwesomeIcon icon={faFire} size="1x" />
                  </div>
                  <div
                    className="convo-list-button"
                    onClick={() => openConvo(convo.id)}
                  >
                    <FontAwesomeIcon icon={faEdit} size="1x" />
                  </div>
                </div>
              </div>
            )
          )
        )}
      </div>
    </>
  );
};

export default ConvoLineList;
