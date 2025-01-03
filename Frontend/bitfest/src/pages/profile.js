import axios from "axios";
import { useEffect, useState } from "react";
import { useAuth } from "../context/AuthContext";
import Chart from "react-apexcharts";
import Navbar from "../components/Navbar";
import { useNavigate } from "react-router-dom";
const Profile = () => {
  const navigate = useNavigate();

  const { userId } = useAuth();
  const [user, setUser] = useState({});

  const [suggestions, setSuggestions] = useState();
  const [suggestTitle, setSuggestTitle] = useState([]);
  const [suggestTime, setSuggestTime] = useState([]);

  const [quizes, setQuizes] = useState();
  const [quizId, setQuizId] = useState([]);
  const [quizPercentage, setQuizPercentage] = useState([]);
  const [quiz, setQuiz] = useState();
  const [quizCount, setQuizCount] = useState([]);
  const [quizTime, setQuizTime] = useState([]);

  const [convo, setConvo] = useState();
  const [convoCount, setConvoCount] = useState([]);
  const [convoTime, setConvoTime] = useState([]);
  const [freeConvo, setFreeConvo] = useState(0);
  const [advanceConvo, setAdvanceConvo] = useState(0);

  const [lecture, setLecture] = useState();
  const [lecCount, setLecCount] = useState([]);
  const [lecTime, setLecTime] = useState([]);

  const [totalQuiz, setTotalQuiz] = useState(0);
  const [totalConvo, setTOtalConvo] = useState(0);
  const [totalLecture, setTotalLecture] = useState(0);
  const [totalSuggestion, setTotalSuggestion] = useState(0);

  const myProfile = async () => {
    try {
      const response = await axios.get(
        `http://127.0.0.1:8002/profile/${userId}`
      );
      console.log(response.data);

      setUser(response.data.user);
      setQuizes(response.data.quizzes);
      setQuiz(response.data.quiz);
      setSuggestions(response.data.suggestions);
      setConvo(response.data.convo.count);
      setLecture(response.data.lecture);

      setFreeConvo(response.data.convo.isFree);
      setAdvanceConvo(response.data.convo.isAdvance);
    } catch (error) {
      console.error(
        "Error fetching convos:",
        error.response ? error.response.data : error.message
      );
    }
  };

  useEffect(() => {
    myProfile();
  }, []);

  const [scrollPosition, setScrollPosition] = useState(0);
  useEffect(() => {
    window.scrollTo(0, scrollPosition);
  }, [scrollPosition]);

  const [selectedOption, setSelectedOption] = useState("Quiz");
  const handleSelectChange = (e) => {
    e.preventDefault();
    setScrollPosition(window.scrollY);
    setSelectedOption(e.target.value);
  };
  useEffect(() => {
    if (!userId) {
      navigate("/");
    }
  }, []);

  useEffect(() => {
    if (quizes) {
      let quizId = quizes.map((quiz) => quiz.updated_at);
      setQuizId(quizId);

      let quizPercent = quizes.map((quiz) =>
        ((quiz.score / quiz.total_questions) * 100).toFixed(2)
      );
      setQuizPercentage(quizPercent);
    }
    if (suggestions) {
      let suggestionPlaceholder = suggestions.map((suggest) => suggest.count);
      setSuggestTitle(suggestionPlaceholder);

      let suggestionDate = suggestions.map((suggest) => suggest.date);
      setSuggestTime(suggestionDate);

      const totalSuggestion = suggestions.reduce(
        (acc, item) => acc + item.count,
        0
      );
      setTotalSuggestion(totalSuggestion);
    }
    if (convo) {
      let convoPlaceholder = convo.map((suggest) => suggest.count);
      setConvoCount(convoPlaceholder);

      let convoDate = convo.map((suggest) => suggest.date);
      setConvoTime(convoDate);

      const totalConvo = convo.reduce((acc, item) => acc + item.count, 0);
      setTOtalConvo(totalConvo);
    }
    if (lecture) {
      let convoPlaceholder = lecture.map((suggest) => suggest.count);
      setLecCount(convoPlaceholder);

      let convoDate = lecture.map((suggest) => suggest.date);
      setLecTime(convoDate);

      const totalLecture = lecture.reduce((acc, item) => acc + item.count, 0);
      setTotalLecture(totalLecture);
    }
    if (quiz) {
      let convoPlaceholder = quiz.map((suggest) => suggest.count);
      setQuizCount(convoPlaceholder);

      let convoDate = quiz.map((suggest) => suggest.date);
      setQuizTime(convoDate);

      const totalQuiz = quiz.reduce((acc, item) => acc + item.count, 0);
      setTotalQuiz(totalQuiz);
    }
  }, [quizes, suggestions, convo, quiz]);

  const info = {
    options: {
      chart: {
        id: "basic-bar",
        toolbar: {
          show: false,
          tools: {
            download: false, // This removes the download button
          },
        },
      },
      xaxis: {
        type: "datetime",
        categories: quizId,
      },
      legend: {
        position: "top",
        horizontalAlign: "left",
      },
      title: {
        text: "Attempted Quiz mark in %",
        align: "left",
        offsetX: 14,
      },
      fill: {
        type: "gradient",
        gradient: {
          shadeIntensity: 1,
          inverseColors: false,
          opacityFrom: 0.45,
          opacityTo: 0.05,
          stops: [20, 100, 100, 100],
        },
      },
      yaxis: {
        labels: {
          style: {
            colors: "#8e8da4",
          },
          offsetX: 0,
          formatter: function (val) {
            return val.toFixed(2);
          },
        },
        axisBorder: {
          show: false,
        },
        axisTicks: {
          show: false,
        },
        min: 0,
        max: 100,
      },
    },
    series: [
      {
        name: "Percentage",
        data: quizPercentage,
      },
    ],
  };
  const quizInfo = {
    options: {
      chart: {
        id: "basic-bar",
        toolbar: {
          show: false,
          tools: {
            download: false, // This removes the download button
          },
        },
      },
      xaxis: {
        type: "datetime",
        categories: quizTime,
      },
      legend: {
        position: "top",
        horizontalAlign: "left",
      },
      title: {
        text: "Quiz Request per Day",
        align: "left",
        offsetX: 14,
      },
      fill: {
        type: "gradient",
        gradient: {
          shadeIntensity: 1,
          inverseColors: false,
          opacityFrom: 0.45,
          opacityTo: 0.05,
          stops: [20, 100, 100, 100],
        },
      },
      yaxis: {
        labels: {
          style: {
            colors: "#8e8da4",
          },
          offsetX: 0,
          formatter: function (val) {
            return val.toFixed(2);
          },
        },
        axisBorder: {
          show: false,
        },
        axisTicks: {
          show: false,
        },
        min: 0,
      },
    },
    series: [
      {
        name: "Count",
        data: quizCount,
      },
    ],
  };
  const suggestInfo = {
    options: {
      chart: {
        id: "basic-bar",
        toolbar: {
          show: false,
          tools: {
            download: false, // This removes the download button
          },
        },
      },
      xaxis: {
        type: "datetime",
        categories: suggestTime,
      },
      legend: {
        position: "top",
        horizontalAlign: "left",
      },
      title: {
        text: "Suggestion request per day",
        align: "left",
        offsetX: 14,
      },
      fill: {
        type: "gradient",
        gradient: {
          shadeIntensity: 1,
          inverseColors: false,
          opacityFrom: 0.45,
          opacityTo: 0.05,
          stops: [20, 100, 100, 100],
        },
      },
      yaxis: {
        labels: {
          style: {
            colors: "#8e8da4",
          },
          offsetX: 0,
          formatter: function (val) {
            return val.toFixed(2);
          },
        },
        axisBorder: {
          show: false,
        },
        axisTicks: {
          show: false,
        },
        min: 0,
      },
    },
    series: [
      {
        name: "Count",
        data: suggestTitle,
      },
    ],
  };
  const convoInfo = {
    options: {
      chart: {
        id: "basic-bar",
        toolbar: {
          show: false,
          tools: {
            download: false, // This removes the download button
          },
        },
      },
      xaxis: {
        type: "datetime",
        categories: convoTime,
      },
      legend: {
        position: "top",
        horizontalAlign: "left",
      },
      title: {
        text: "Convo request per day",
        align: "left",
        offsetX: 14,
      },

      fill: {
        type: "gradient",
        gradient: {
          shadeIntensity: 1,
          inverseColors: false,
          opacityFrom: 0.45,
          opacityTo: 0.05,
          stops: [20, 100, 100, 100],
        },
      },
      yaxis: {
        labels: {
          style: {
            colors: "#8e8da4",
          },
          offsetX: 0,
          formatter: function (val) {
            return val.toFixed(2);
          },
        },
        axisBorder: {
          show: false,
        },
        axisTicks: {
          show: false,
        },
        min: 0,
      },
    },
    series: [
      {
        name: "Count",
        data: convoCount,
      },
    ],
  };
  const lecInfo = {
    options: {
      chart: {
        id: "basic-bar",
        toolbar: {
          show: false,
          tools: {
            download: false, // This removes the download button
          },
        },
      },
      xaxis: {
        type: "datetime",
        categories: lecTime,
      },
      legend: {
        position: "top",
        horizontalAlign: "left",
      },
      title: {
        text: "Lecture request per day",
        align: "left",
        offsetX: 14,
      },

      fill: {
        type: "gradient",
        gradient: {
          shadeIntensity: 1,
          inverseColors: false,
          opacityFrom: 0.45,
          opacityTo: 0.05,
          stops: [20, 100, 100, 100],
        },
      },
      yaxis: {
        labels: {
          style: {
            colors: "#8e8da4",
          },
          offsetX: 0,
          formatter: function (val) {
            return val.toFixed(2);
          },
        },
        axisBorder: {
          show: false,
        },
        axisTicks: {
          show: false,
        },
        min: 0,
      },
    },
    series: [
      {
        name: "Count",
        data: lecCount,
      },
    ],
  };

  const horizontalBar = {
    series: [
      {
        name: "Total",
        data: [
          totalQuiz,
          totalSuggestion,
          freeConvo,
          advanceConvo,
          totalLecture,
        ],
      },
    ],
    options: {
      chart: {
        type: "bar",
        height: 350,
        toolbar: {
          show: false,
          tools: {
            download: false, // This removes the download button
          },
        },
      },
      plotOptions: {
        bar: {
          horizontal: true,
        },
      },
      dataLabels: {
        enabled: true,
      },
      xaxis: {
        categories: [
          "Quiz",
          "Suggestion",
          "Free Convo",
          "Advance Convo",
          "Lecture",
        ],
      },
      colors: ["#1f77b4", "#ff7f0e", "#2ca02c", "#d62728", "#9467bd"], // Assign specific colors for each bar
    },
  };
  useEffect(() => {
    if (!userId) {
      navigate("/");
    }
  }, []);

  const circleStyle = {
    width: "200px",
    height: "200px",
    borderRadius: "50%",
    backgroundColor: "gray",
  };

  return (
    <>
      <Navbar />

      <div className="flex justify-center">
        <div className="w-[80%] md:w-[100%]">
          <div className="user border-red-100 m-6 w-[100%] flex justify-center">
            <div>
              <div style={circleStyle}></div>
              <p>{user.username}</p>
              <p>{user.email}</p>
            </div>

            <div>
              <Chart
                options={horizontalBar.options}
                series={horizontalBar.series}
                type="bar"
              />
            </div>
          </div>

          <div className="flex flex-wrap w-[100%] justify-center ">
            <div className="m-6 w-[100%] md:w-[80%] grid grid-cols-1 md:grid-cols-2 justify-items-center">
              <div className="md:w-[80%] w-[100%]">
                <Chart
                  options={info.options}
                  series={info.series}
                  type="area"
                  width="100%"
                />
              </div>

              <div className="md:w-[80%] w-[100%] ">
                <select value={selectedOption} onChange={handleSelectChange}>
                  <option value="Quiz">Quiz</option>
                  <option value="Suggestion">Suggestion</option>
                  <option value="Conversation">Conversation</option>
                  <option value="Lecture">Lecture</option>
                </select>

                {selectedOption == "Quiz" && (
                  <Chart
                    options={quizInfo.options}
                    series={quizInfo.series}
                    type="area"
                    width="100%"
                  />
                )}
                {selectedOption == "Suggestion" && (
                  <Chart
                    options={suggestInfo.options}
                    series={suggestInfo.series}
                    type="area"
                    width="100%"
                  />
                )}
                {selectedOption == "Conversation" && (
                  <Chart
                    options={convoInfo.options}
                    series={convoInfo.series}
                    type="area"
                    width="100%"
                  />
                )}
                {selectedOption == "Lecture" && (
                  <Chart
                    options={lecInfo.options}
                    series={lecInfo.series}
                    type="area"
                    width="100%"
                  />
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Profile;
