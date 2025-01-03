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
import "../../css/Toast.css";

//------------------------

const PdfList = (props) => {
  // inside props, i have list title, list of pdfs, isAll
  //useAuth for user id
  //const { userId } = useAuth();
  const navigate = useNavigate();

  const [pdfs, setPdfs] = useState([]);
  const dummypdfs = [
    {
      id: 1,
      title: " pdf title 1",
      summary: "pdf summary 1",
      isMine: true,
      isPublic: true,
      isHighlighted: false,
      url: "url1",
    },
    {
      id: 2,
      title: " pdf title 2",
      summary: "pdf summary 2",
      isMine: false,
      isPublic: false,
      isHighlighted: true,
      url: "url2",
    },
    {
      id: 3,
      title: " pdf title 3",
      summary: "pdf summary 3",
      isMine: false,
      isPublic: true,
      isHighlighted: false,
      url: "url3",
    },
  ];

  //
  //const [selected, setSelected] = useState("all");

  useEffect(() => {
    console.log("convos:", props.pdfs);
    setPdfs(props.pdfs);
    setPdfs(dummypdfs);
  }, [props.pdfs]);

  const makeHighlighted = async (i) => {
    console.log(`${i} th convo is made important`);

    // const response = await axios.put(
    //   `http://127.0.0.1:8002/conversation/${i}/highlight`
    // );
    //console.log(response.data);
    //const updatedConvo = response.data;

    // if (updatedConvo === null) {
    //   return;
    // } else {
    //   if (updatedConvo.isHighlighted == true) {
    //       showtoast('success', 'Conversation is highlighted');
    //   }
    //   else {
    //       showtoast('success', 'Conversation is unhighlighted');
    //   }
    // }

    //placeholder
    let updatedPdf = pdfs.find((pdf) => pdf.id === i);
    updatedPdf.isHighlighted = !updatedPdf.isHighlighted;

    const updatedPdfs = pdfs.map((pdf) => {
      if (pdf.id === updatedPdf.id) {
        return updatedPdf;
      }
      return pdf;
    });
    setPdfs(updatedPdfs);
  };

  const togglePublic = async (i) => {
    console.log(`${i} th convo is made public`);

    // const response = await axios.put(
    //   `http://
    //
    //

    //placeholder
    let updatedPdf = pdfs.find((pdf) => pdf.id === i);
    // make public if mine
    if (updatedPdf.isMine) {
      updatedPdf.isPublic = !updatedPdf.isPublic;
    }

    const updatedPdfs = pdfs.map((pdf) => {
      if (pdf.id === updatedPdf.id) {
        return updatedPdf;
      }
      return pdf;
    });
    setPdfs(updatedPdfs);
  };

  const visitPdf = (i) => {
    const link = pdfs.find((pdf) => pdf.id === i).url;
    window.open(link, "_blank");
  };

  // const allPressed = () => {
  //   console.log(props.isAll);
  //   navigate("/allconvo");
  // };

  return (
    <div className="whole-thing-container">
      <ToastContainer />

      <div className="suggestion-list-title-container">
        <div className="flex">
          <div className="suggestion-list-title">{props.title}</div>
          {/* {props.isAll === false ? (
            <div className="suggestion-see-all" onClick={() => allPressed()}>
              See All
            </div>
          ) : (
            <></>
          )} */}
        </div>

        {/* <div className="suggestion-title-buttons">
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
        </div> */}
      </div>

      <div className="suggestion-list-container">
        {pdfs &&
          pdfs.map(
            (pdf, index) => (
              // (selected === "all" ||
              //   (selected === "highlighted" && convo.isHighlighted == true)) &&
              // (props.isAll === true || (props.isAll === false && index < 7)) ? (

              <div className="suggestion-container">
                <div className="suggestion-text-container">
                  <div
                    className="suggestion-name"
                    onClick={() => visitPdf(pdf.id)}
                  >
                    {pdf.title}
                  </div>

                  {/* <div className='suggestion-horizontal-line'>
                            </div> */}
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
                        pdf.isHighlighted == true ? "imp" : ""
                      }`}
                      onClick={() => makeHighlighted(pdf.id)}
                    >
                      <FontAwesomeIcon icon={faStar} size="1x" />
                    </div>

                    <div
                      className="suggestion-button"
                      onClick={() => togglePublic(pdf.id)}
                    >
                      <FontAwesomeIcon icon={faFire} size="1x" />
                    </div>
                    <div
                      className="suggestion-button"
                      onClick={() => visitPdf(pdf.id)}
                    >
                      <FontAwesomeIcon icon={faEdit} size="1x" />
                    </div>
                  </div>
                </div>
              </div>
            )

            // ) : (
            //   <></>
            // )
          )}
      </div>

      <div className="end-horizontal-line"></div>
    </div>
  );
};

export default PdfList;
