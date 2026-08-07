import React from "react";

function VolunteerRequestsView({ 
  volunteerRequests, 
  volLoading, 
  fetchVolunteerRequests,
  updateVolunteerStatus,
  updateVolunteerStatusWithReason,
}) {
  if (volLoading) return <p>Loading...</p>;

  if (volunteerRequests.length === 0) {
    return (
      <div className="empty-state">
        <i className="fa-regular fa-circle-check"></i>
        <p>No pending requests.</p>
      </div>
    );
  }

  return (
    <div className="pending-content volunteer-requests">
      <div className="section-header">
        <h2>
          <i className="fa-solid fa-user-plus"></i> Volunteer Requests
        </h2>
        <div className="section-actions">
          <button className="btn-refresh" onClick={fetchVolunteerRequests}>
            <i className="fa-solid fa-rotate"></i> Refresh
          </button>
        </div>
      </div>
      <div className="issues-list">
        {volunteerRequests.map((u) => (
          <div key={u._id} className="issue-card volunteer-card">
            <div className="volunteer-head">
              <div>
                <strong>{u.fullName}</strong>
                <div className="muted">{u.email}</div>
                <div className="muted">District: {u.volunteerDistrict}</div>
              </div>
              <div className="request-actions">
                <button
                  className="btn btn-approve"
                  onClick={() => updateVolunteerStatus(u._id, "approve")}
                >
                  <i className="fa-solid fa-check"></i> Approve
                </button>
                <button
                  className="btn btn-reject-outline"
                  onClick={() => {
                    const reason = prompt("Reason for rejection?") || "";
                    updateVolunteerStatusWithReason(u._id, "reject", reason);
                  }}
                >
                  <i className="fa-solid fa-xmark"></i> Reject
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default VolunteerRequestsView;