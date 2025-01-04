
import { Bar } from "react-chartjs-2";
import { React, useState, useRef, useEffect } from "react";
import { useAuth } from "../context/AuthContext";
import ReactMarkdown from "react-markdown";
import { useNavigate, useParams } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import axios from "axios";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

const AnalyticsDashboard = () => {
  const { userId } = useAuth();
  const [data, setData] = useState({});

  const getAnalyticsData = async () => {
    try {
      const response = await axios.get(
        `https://buet-genesis.onrender.com/api/v1/analysis/user/${userId}`
      );
      console.log(response.data);
      setData(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    getAnalyticsData();
  }, []);

  const labels = [
    "Files",
    "Chats",
    "Messages",
    "Audio Messages",
    "User Trains",
    "Approved User Trains",
    "Translations",
    "Words Translated",
  ];

  const chartData = {
    labels,
    datasets: [
      {
        label: "Analytics Data",
        data: [
          data.number_of_files,
          data.number_of_chats,
          data.number_of_messages,
          data.number_of_audio_messages,
          data.number_of_user_trains,
          data.number_of_approved_user_trains,
          data.number_of_translations,
          data.total_number_words_translated,
        ],
        backgroundColor: [
          "rgba(75, 192, 192, 0.6)",
          "rgba(54, 162, 235, 0.6)",
          "rgba(255, 206, 86, 0.6)",
          "rgba(153, 102, 255, 0.6)",
          "rgba(255, 99, 132, 0.6)",
          "rgba(255, 159, 64, 0.6)",
          "rgba(75, 192, 192, 0.6)",
          "rgba(54, 162, 235, 0.6)",
        ],
        borderColor: "rgba(75, 192, 192, 1)",
        borderWidth: 1,
      },
    ],
  };

  const chartOptions = {
    responsive: true,
    plugins: {
      legend: {
        position: "top",
      },
      title: {
        display: true,
        text: "Analytics Dashboard",
      },
    },
  };

  return (
    <div style={{ padding: "20px" }}>
      <h2>Analytics Dashboard</h2>
      <div style={{ width: "70%", margin: "0 auto" }}>
        <Bar data={chartData} options={chartOptions} />
      </div>

      <div style={{ marginTop: "30px" }}>
        <h3>Summary Table</h3>
        <table style={{ width: "100%", borderCollapse: "collapse" }}>
          <thead>
            <tr>
              <th style={{ border: "1px solid #ccc", padding: "8px" }}>
                Metric
              </th>
              <th style={{ border: "1px solid #ccc", padding: "8px" }}>
                Value
              </th>
            </tr>
          </thead>
          <tbody>
            {Object.entries(data).map(([key, value]) => (
              <tr key={key}>
                <td style={{ border: "1px solid #ccc", padding: "8px" }}>
                  {key
                    .replace(/_/g, " ")
                    .replace(/\b\w/g, (c) => c.toUpperCase())}
                </td>
                <td style={{ border: "1px solid #ccc", padding: "8px" }}>
                  {value}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AnalyticsDashboard;
