import React from "react";

function ApprovedVolunteers({ BACKEND_URL, showToast }) {
  const [list, setList] = React.useState([]);
  const [loading, setLoading] = React.useState(false);

  const load = async () => {
    try {
      setLoading(true);
      const res = await fetch(`${BACKEND_URL}/volunteer/admin/volunteers`, {
        credentials: "include",
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Failed to load volunteers");
      setList(data);
    } catch (e) {
      console.error(e);
      showToast && showToast(e.message, "error");
    } finally {
      setLoading(false);
    }
  };

  React.useEffect(() => {
    load();
  }, []);

  const removeVolunteer = async (userId) => {
    const reason = prompt("Reason for removal?") || "";
    try {
      const res = await fetch(
        `${BACKEND_URL}/volunteer/admin/volunteers/${userId}`,
        {
          method: "DELETE",
          headers: { "Content-Type": "application/json" },
          credentials: "include",
          body: JSON.stringify({ reason }),
        }
      );
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Failed to remove volunteer");
      load();
      showToast && showToast("Volunteer removed", "success");
    } catch (e) {
      showToast && showToast(e.message, "error");
    }
  };

  if (loading) return <p>Loading...</p>;
  if (list.length === 0) return <p>No approved volunteers.</p>;

  return (
    <div className="issues-list">
      {list.map((v) => (
        <div key={v._id} className="issue-card volunteer-card">
          <div className="volunteer-head">
            <div>
              <strong>{v.fullName}</strong>
              <div className="muted">{v.email}</div>
              <div className="muted">District: {v.volunteerDistrict}</div>
              <span className="badge points">
                <i className="fa-solid fa-star"></i> {v.volunteerPoints} pts
              </span>
            </div>
            <div className="request-actions">
              <button
                className="btn btn-danger-outline"
                onClick={() => removeVolunteer(v._id)}
              >
                <i className="fa-solid fa-trash"></i> Remove
              </button>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

export default ApprovedVolunteers;