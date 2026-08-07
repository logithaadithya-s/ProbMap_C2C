import React, { useState } from "react";
import Img from "../photo/dog.jpg";

function IssueCard({ issue, onUpdateStatus, onShowOnMap }) {
  const [showMessageBox, setShowMessageBox] = useState(false);
  const [selectedStatus, setSelectedStatus] = useState("");
  const [message, setMessage] = useState("");
  const [localStatus, setLocalStatus] = useState(issue.status || "pending");

  let userInfo = issue.userInfo;
  if (!userInfo && window && window.users && Array.isArray(window.users)) {
    userInfo = window.users.find((u) => u._id === issue.userId);
  }

  const statusColors = {
    pending: "#ff9800",
    acknowledged: "#2196f3",
    resolved: "#4caf50",
    rejected: "#f44336",
  };
  const statusLabel = localStatus.charAt(0).toUpperCase() + localStatus.slice(1);

  const getInitials = (name) =>
    name
      ? name.split(" ").map((n) => n[0]).join("").toUpperCase()
      : "U";

  const showAdminResponse =
    ["rejected", "acknowledged", "resolved"].includes(localStatus) &&
    issue.adminResponse &&
    issue.adminResponse.message;

  const handleButtonClick = (status) => {
    setSelectedStatus(status.toLowerCase());
    setShowMessageBox(true);
  };

  const handleSubmit = () => {
    if (!selectedStatus) return;
    setLocalStatus(selectedStatus);
    onUpdateStatus(issue._id, selectedStatus, message);
    setShowMessageBox(false);
    setMessage("");
    setSelectedStatus("");
  };

  const statusClass = localStatus.toLowerCase();

  const formatDateTime = (dateString) => {
    if (!dateString) return { date: "Unknown", time: "" };
    const date = new Date(dateString);
    return {
      date: date.toLocaleDateString(),
      time: date.toLocaleTimeString(),
    };
  };

  const reportDateTime = formatDateTime(issue.createdAt);

  return (
    <div className={`issue-card ${statusClass} enhanced-card-ui horizontal-card`}>
      <div
        className="status-badge"
        style={{ background: statusColors[statusClass] || "#888" }}
      >
        {statusLabel}
      </div>

      <div className="horizontal-card-content">
        <div className="card-image-section">
          <img
            src={issue.imageUrl || Img}
            alt={issue.description}
            className="issue-thumb"
          />
        </div>

        <div className="card-details-section">
          <div className="user-info-row">
            <div className="user-avatar">
              <span>{getInitials(userInfo?.fullName || "Unknown User")}</span>
            </div>
            <div className="user-details">
              <div className="user-name">
                {userInfo?.fullName || "Unknown User"}
              </div>
              <div className="user-email">{userInfo?.email || issue.userId}</div>
              {userInfo?.phone && (
                <div className="user-phone">
                  <i className="fa-solid fa-phone"></i> {userInfo.phone}
                </div>
              )}
              {userInfo?.joinedDate && (
                <div className="user-joined">
                  <i className="fa-solid fa-calendar-plus"></i>
                  Joined: {new Date(userInfo.joinedDate).toLocaleDateString()}
                </div>
              )}
            </div>
          </div>

          <div className="issue-title-section">
            <h3 className="issue-title">{issue.title}</h3>
            <p className="issue-desc">{issue.description}</p>
          </div>

          <div className="date-time-info">
            <div className="date-time-row">
              <i className="fa-solid fa-calendar-alt"></i>
              <span className="report-date">
                Reported: {reportDateTime.date}
              </span>
              <i className="fa-solid fa-clock"></i>
              <span className="report-time">{reportDateTime.time}</span>
            </div>
          </div>

          <div className="address-info">
            <i className="fa-solid fa-map-marker-alt"></i>
            <span className="issue-address">
              {issue.location?.district || issue.district || "Unknown Location"}
            </span>
          </div>

          {issue.cost_estimate !== undefined && issue.cost_estimate !== null && (
            <div className="cost-estimate">
              <i
                className="fa-solid fa-coins"
                style={{ color: "#FFD700" }}
              ></i>
              <span className="cost-label">Estimated Cost:</span>
              <span className="cost-value">
                ₹{issue.cost_estimate.toLocaleString?.() ?? issue.cost_estimate}
              </span>
            </div>
          )}

          {showAdminResponse && (
            <div className="admin-response">
              <i className="fa-solid fa-shield-halved"></i>
              <div className="admin-response-content">
                <span className="admin-response-label">Admin Response:</span>
                <span className="admin-response-msg">
                  {issue.adminResponse.message}
                </span>
                <span className="admin-response-date">
                  {issue.adminResponse.respondedAt
                    ? new Date(issue.adminResponse.respondedAt).toLocaleString()
                    : ""}
                </span>
              </div>
            </div>
          )}

          <div className="issue-actions">
            <button
              className="btn-show-map"
              onClick={() => onShowOnMap && onShowOnMap(issue)}
            >
              <i className="fa-solid fa-map"></i> Show on Map
            </button>
            {localStatus !== "rejected" && (
              <>
                <button
                  className="btn-ack"
                  onClick={() => handleButtonClick("Acknowledged")}
                >
                  Acknowledge
                </button>
                <button
                  className="btn-reject"
                  onClick={() => handleButtonClick("Rejected")}
                >
                  Reject
                </button>
                <button
                  className="btn-resolve"
                  onClick={() => handleButtonClick("Resolved")}
                >
                  Resolve
                </button>
              </>
            )}
          </div>
        </div>
      </div>
      {showMessageBox && (
        <div className="message-box">
          <textarea
            placeholder="Enter a message..."
            value={message}
            onChange={(e) => setMessage(e.target.value)}
          />
          <button className="btn-submit" onClick={handleSubmit}>
            Submit
          </button>
          <button className="btn-cancel" onClick={() => setShowMessageBox(false)}>
            Cancel
          </button>
        </div>
      )}
    </div>
  );
}

export default IssueCard;