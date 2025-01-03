import { React, useState, useRef, useEffect } from "react";
import { useAuth } from "../../context/AuthContext";
import { useAsyncError, useNavigate, useParams } from "react-router-dom";
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
  faGlobe,
  faStar,
  faTag,
} from "@fortawesome/free-solid-svg-icons";
import "./List.css";
import axios from "axios";

//for toast
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./../../css/Toast.css";

//------------------------

const ConvoList = (props) => {
  //useAuth for user id
  const { userId } = useAuth();
  const navigate = useNavigate();

  // as props, we will get isAll ( for short list) and a convo list
  const [convos, setConvos] = useState([]);

  //     {
  //         "id": 1,
  //         "placeholder": "the huge text problem that",
  //         "link": "visit_here",
  //         "source": "codeforces",
  //         "state": 1,
  //     },
  //     {
  //         "id": 2,
  //         "placeholder": "problem 2",
  //         "link": "visit_here",
  //         "source": "codeforces",
  //         "state": 2,
  //     },
  //     {
  //         "id": 3,
  //         "placeholder": "problem 3",
  //         "link": "visit_here",
  //         "source": "Leetcode",
  //         "state": 3,
  //     },
  //     {
  //         "id": 4,
  //         "placeholder": "problem 4",
  //         "link": "visit_here",
  //         "source": "codeforces",
  //         "state": 4,
  //     },
  //     {
  //         "id": 5,
  //         "placeholder": "problem 5",
  //         "link": "visit_here",
  //         "source": "codeforces",
  //         "state": 4,
  //     },
  //     {
  //         "id": 6,
  //         "placeholder": "problem 6",
  //         "link": "visit_here",
  //         "source": "codeforces",
  //         "state": 4,
  //     },
  //     {
  //         "id": 7,
  //         "placeholder": "problem 7",
  //         "link": "visit_here",
  //         "source": "codeforces",
  //         "state": 4,
  //     },
  //     {
  //         "id": 8,
  //         "placeholder": "problem 8",
  //         "link": "visit_here",
  //         "source": "codeforces",
  //         "state": 4,
  //     },
  //     {
  //         "id": 9,
  //         "placeholder": "problem 9",
  //         "link": "visit_here",
  //         "source": "codeforces",
  //         "state": 4,
  //     },

  // ]

  //
  const [selected, setSelected] = useState("all");

  // load suggestions every time when the props.suggestions changes
  useEffect(() => {
    console.log("convos:", props.convos);
    setConvos(props.convos);
  }, [props.convos]);

  const makeImportant = async (i) => {
    console.log(`${i} th convo is made important`);
    const response = await axios.put(
      `http://127.0.0.1:8002/conversation/${i}/highlight`
    );
    console.log(response.data);
    // now we are getting the updated suggestion from the data, update the suggestions where the id matches
    const updatedConvo = response.data;

    if (updatedConvo === null) {
      return;
    } else {
      // if (updatedConvo.isHighlighted == true) {
      //     showtoast('success', 'Conversation is highlighted');
      // }
      // else {
      //     showtoast('success', 'Conversation is unhighlighted');
      // }
    }

    const updatedConvos = convos.map((convo) => {
      if (convo.id === updatedConvo.id) {
        return updatedConvo;
      }
      return convo;
    });
    setConvos(updatedConvos);
  };

  const visit = (i) => {
    // navigate to conversation page
    navigate(`/conversation/${i}`);
  };

  const deleteConvo = async (i) => {
    console.log(`${i} th convo is deleted`);
    const response = await axios.delete(
      `http://127.0.0.1:8002/conversation/${i}/delete`
    );
    console.log(response.data);
    // now we are getting the updated suggestion from the data, delete the suggestion where the id matches

    const updatedConvos = convos.filter((convo) => convo.id !== i);
    setConvos(updatedConvos);
    const message = response.data.message;
    // if (message === "Conversation deleted successfully") {
    //     showtoast('success', 'conversation is deleted');
    // }
  };

  const allPressed = () => {
    console.log(props.isAll);
    navigate("/allconvo");
  };

  return (
    <div className="whole-thing-container">
      <ToastContainer />

      <div className="suggestion-list-title-container">
        <div className="flex">
          <div className="suggestion-list-title">PAST CONVERSATIONS</div>
          {props.isAll === false ? (
            <div className="suggestion-see-all" onClick={() => allPressed()}>
              See All
            </div>
          ) : (
            <></>
          )}
        </div>

        <div className="suggestion-title-buttons">
          <div
            className={`suggestion-title-button ${
              selected == "all" ? "selected" : ""
            }`}
            onClick={() => setSelected("all")}
          >
            {" "}
            All
          </div>

          <div
            className={`suggestion-title-button ${
              selected == "highlighted" ? "selected" : ""
            }`}
            onClick={() => setSelected("highlighted")}
          >
            {" "}
            starred
          </div>
        </div>
      </div>

      <div className="suggestion-list-container">
        {convos &&
          convos.map((convo, index) =>
            (selected === "all" ||
              (selected === "highlighted" && convo.isHighlighted == true)) &&
            (props.isAll === true || (props.isAll === false && index < 7)) ? (
              <div className="suggestion-container">
                <div className="suggestion-text-container">
                  <div
                    className="suggestion-name"
                    onClick={() => visit(convo.id)}
                  >
                    {convo.name}
                  </div>

                  {/* <div className='suggestion-horizontal-line'>
                            </div> */}

                  <div className="suggestion-tag">
                    <div className="tag-icon">
                      <FontAwesomeIcon icon={faTag} size="1x" />
                    </div>

                    <div className="suggestion-tag-text">
                      {convo.isFree ? "Free" : "Paid"}
                    </div>
                    <div className="suggestion-tag-text">
                      {convo.isAdvanced ? "Advanced" : "Beginner"}
                    </div>
                  </div>
                </div>
                <div className="suggestion-lower-part">
                  {/* <div className='visition'>
                                        <div className={`visition-text ${suggestion.state > 2 ? 'visited' : ''}`}>
                                            {suggestion.state > 2 ? 'visited' : 'not visited'}
                                        </div>
                                    </div> */}

                  <div className="suggestion-buttons">
                    <div
                      className={`suggestion-button ${
                        convo.isHighlighted == true ? "imp" : ""
                      }`}
                      onClick={() => makeImportant(convo.id)}
                    >
                      <FontAwesomeIcon icon={faStar} size="1x" />
                    </div>
                    <div
                      className="suggestion-button"
                      onClick={() => visit(convo.id)}
                    >
                      <FontAwesomeIcon icon={faEdit} size="1x" />
                    </div>
                    <div
                      className="suggestion-button"
                      onClick={() => deleteConvo(convo.id)}
                    >
                      <FontAwesomeIcon icon={faFire} size="1x" />
                    </div>
                  </div>
                </div>
              </div>
            ) : (
              <></>
            )
          )}
      </div>

      <div className="end-horizontal-line"></div>
    </div>
  );
};

export default ConvoList;
