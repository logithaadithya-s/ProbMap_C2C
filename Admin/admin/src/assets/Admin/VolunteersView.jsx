import React from "react";
import ApprovedVolunteers from "./ApprovedVolunteers";

function VolunteersView({ BACKEND_URL, showToast }) {
  return (
    <div className="pending-content approved-volunteers">
      <div className="section-header">
        <h2>
          <i className="fa-solid fa-people-carry-box"></i> Approved Volunteers
        </h2>
      </div>
      <ApprovedVolunteers BACKEND_URL={BACKEND_URL} showToast={showToast} />
    </div>
  );
}

export default VolunteersView;