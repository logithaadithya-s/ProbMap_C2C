import React from "react";

function ClaimsView({ 
  claims, 
  volLoading, 
  reviewClaim,
}) {
  if (volLoading) return <p>Loading...</p>;

  if (claims.length === 0) return <p>No submitted claims.</p>;

  return (
    <div className="pending-content">
      <h2>Volunteer Claims</h2>
      <div className="issues-list">
        {claims.map((c) => (
          <div key={c._id} className="issue-card">
            <div style={{ display: "flex", justifyContent: "space-between" }}>
              <div>
                <strong>{c.title}</strong>
                <div style={{ fontSize: 12 }}>{c.district}</div>
                <div style={{ fontSize: 12 }}>
                  Submitted:{" "}
                  {new Date(c.volunteerClaim?.submittedAt).toLocaleString()}
                </div>
              </div>
              <div>
                <button
                  className="btn-ack"
                  onClick={() => reviewClaim(c._id, "approve")}
                >
                  Approve
                </button>
                <button
                  className="btn-reject"
                  onClick={() => reviewClaim(c._id, "reject")}
                  style={{ marginLeft: 8 }}
                >
                  Reject
                </button>
              </div>
            </div>
            {c.volunteerClaim?.proofImageUrl && (
              <img
                src={c.volunteerClaim.proofImageUrl}
                alt="proof"
                style={{ maxWidth: 220, borderRadius: 8, marginTop: 8 }}
              />
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

export default ClaimsView;