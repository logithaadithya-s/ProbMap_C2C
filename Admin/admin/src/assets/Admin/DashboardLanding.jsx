import React from "react";
import MyChart from "./Chart";

function DashboardLanding({ adminProfile, handleNavClick }) {
  return (
    <div className="dashboard-content">
      <div className="dashboard-landing">
        <div className="admin-hero">
          <div>
            <h2>
              Welcome back {adminProfile ? `, ${adminProfile.fullName}` : ""}
            </h2>
            <p>Manage issues, volunteers and claims efficiently.</p>
          </div>
          <div>
            <button className="btn-view" onClick={() => handleNavClick("issues")}>
              View Issues
            </button>
          </div>
        </div>
        <div className="admin-quick-actions">
          <div className="admin-action">
            <h4>Pending Issues</h4>
            <p>Review and acknowledge new reports.</p>
            <button className="btn" onClick={() => handleNavClick("pending")}>
              Go
            </button>
          </div>
          <div className="admin-action">
            <h4>Volunteer Requests</h4>
            <p>Approve or reject volunteer applications.</p>
            <button className="btn" onClick={() => handleNavClick("volunteerRequests")}>
              Go
            </button>
          </div>
          <div className="admin-action">
            <h4>Claims</h4>
            <p>Review resolution claims with proofs.</p>
            <button className="btn" onClick={() => handleNavClick("claims")}>
              Go
            </button>
          </div>
          <div className="admin-action">
            <h4>Map View</h4>
            <p>Visualize issues on an interactive map.</p>
            <button className="btn" onClick={() => handleNavClick("map")}>
              Open Map
            </button>
          </div>
        </div>
      </div>
      <MyChart />
    </div>
  );
}

export default DashboardLanding;