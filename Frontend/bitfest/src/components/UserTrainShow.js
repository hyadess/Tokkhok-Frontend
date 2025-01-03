import { React, useState, useRef, useEffect } from "react";
import { useAuth } from "../context/AuthContext";
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
} from "@fortawesome/free-solid-svg-icons";
import axios from "axios";
import { Button } from "flowbite-react";

const UserTrainShow = (props) => {
  // as props, I have id, banglish, bangla, isApproved


  return (
    <div className="w-1/4 usertrain-div">
      <div className="usertrain-text">{props.userTrain.bangla}</div>
      {/* horizontal line */}
      <hr />
      <div className="usertrain-text">{props.userTrain.banglish}</div>
      {props.userTrain.is_approved == false ? (
        <Button className="usertrain-button" onClick={()=>props.updateUserTrain(props.userTrain,true)}>Approve</Button>
      ) : (
        <></>
      )}
    </div>
  );
};


export default UserTrainShow;