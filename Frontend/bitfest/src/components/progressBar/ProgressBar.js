import React from 'react';
import './ProgressBar.css'; // Import the CSS file for styling

const ProgressBar = ({ percentage }) => {
  return (
    <div className="progress-bar-container">
      <div
        className="progress-bar"
        style={{ width: `${percentage}%` }}
      >
        {/* <span className="progress-label">{percentage}%</span> */}
      </div>
    </div>
  );
};

export default ProgressBar;
