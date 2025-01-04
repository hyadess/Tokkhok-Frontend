// src/components/Profile.js
import React, { useState, useEffect } from "react";
import axios from "axios";
import PdfList from "../components/cardLists/PdfList"; // Import PdfList component
import "../css/Profile.css";
import NotesList from "./Notes/NotesList";
import AnalyticsDashboard from "./analysis";
import { Analytics } from "@mui/icons-material";
const Profile = () => {
  const [selectedMenu, setSelectedMenu] = useState("myPdfs");
  const [data, setData] = useState([]);

  // Menu titles for PdfList
  const menuTitles = {
    myPdfs: "My PDFs",
    AllowedPublicPdfs: "Allowed Public PDFs",
    Analytics: "Analytics",
    // myEditors: "My Editors",
    // sharedEditors: "Shared Editors",
  };

  // Fetch data from backend based on the selected menu
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`/api/${selectedMenu}`); // Replace with your API endpoint
        setData(response.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetchData();
  }, [selectedMenu]);

  return (
    <div className="container-diff">
      {/* Sidebar */}
      <div className="left">
        <ul className="menu-list">
          {Object.keys(menuTitles).map((menu) => (
            <li
              key={menu}
              className={selectedMenu === menu ? "active" : ""}
              onClick={() => setSelectedMenu(menu)}
            >
              {menuTitles[menu]}
            </li>
          ))}
        </ul>
      </div>

      {/* Middle Pane */}
      <div className="middle">
        {/* if selected menu is myPdfs or AllowedPublicPdfs, render PdfList component */}
        {selectedMenu === "myPdfs" || selectedMenu === "AllowedPublicPdfs" ? (
          <PdfList data={data} />
        ) : (
          <AnalyticsDashboard />
        )}
        
      </div>
    </div>
  );
};

export default Profile;
