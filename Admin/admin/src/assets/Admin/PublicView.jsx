import React from "react";

function PublicView({ users, showFullLeaderboard, setShowFullLeaderboard }) {
  const sortedUsers = [...users].sort(
    (a, b) => (b.numIssueRaised || 0) - (a.numIssueRaised || 0)
  );

  const displayedUsers = showFullLeaderboard
    ? sortedUsers
    : sortedUsers.slice(0, 5);

  const getInitials = (name) => {
    if (!name) return "U";
    return name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase()
      .slice(0, 2);
  };

  return (
    <div className="public-content">
      <div className="content-header">
        <h2>Public Engagement</h2>
        <p>Manage user rewards, contributions, and community engagement</p>
      </div>

      <div className="engagement-stats">
        <div className="stat-card">
          <div className="stat-icon">
            <i className="fa-solid fa-users"></i>
          </div>
          <div className="stat-content">
            <h3>{users.length}</h3>
            <p>Total Users</p>
          </div>
        </div>
        <div className="stat-card">
          <div className="stat-icon">
            <i className="fa-solid fa-trophy"></i>
          </div>
          <div className="stat-content">
            <h3>{sortedUsers.length > 0 ? sortedUsers[0].numIssueRaised : 0}</h3>
            <p>Top Contributor</p>
          </div>
        </div>
        <div className="stat-card">
          <div className="stat-icon">
            <i className="fa-solid fa-chart-line"></i>
          </div>
          <div className="stat-content">
            <h3>
              {users.reduce(
                (sum, user) => sum + (user.numIssueRaised || 0),
                0
              )}
            </h3>
            <p>Total Issues Raised</p>
          </div>
        </div>
        <div className="stat-card">
          <div className="stat-icon">
            <i className="fa-solid fa-star"></i>
          </div>
          <div className="stat-content">
            <h3>
              {Math.round(
                (users.reduce(
                  (sum, user) => sum + (user.numIssueRaised || 0),
                  0
                ) /
                  Math.max(users.length, 1)) *
                  10
              ) / 10}
            </h3>
            <p>Avg Issues/User</p>
          </div>
        </div>
      </div>

      <div className="rewards-section">
        <div className="section-header">
          <h3 className="section-title">
            <i className="fa-solid fa-trophy"></i> Top Contributors
          </h3>
          <div className="section-actions">
            <button className="btn-refresh" onClick={() => window.location.reload()}>
              <i className="fa-solid fa-refresh"></i> Refresh
            </button>
          </div>
        </div>

        <div className="contributors-grid">
          {displayedUsers.length > 0 ? (
            displayedUsers.map((u, i) => (
              <div key={i} className={`contributor-card rank-${i + 1}`}>
                <div className="rank-badge">
                  {i === 0 && <i className="fa-solid fa-crown"></i>}
                  {i === 1 && <i className="fa-solid fa-medal"></i>}
                  {i === 2 && <i className="fa-solid fa-award"></i>}
                  {i > 2 && <span className="rank-number">#{i + 1}</span>}
                </div>
                <div className="contributor-avatar">
                  <span className="avatar-initials">{getInitials(u.fullName)}</span>
                </div>
                <div className="contributor-info">
                  <h4>{u.fullName || "Unknown User"}</h4>
                  <p className="email">{u.email}</p>
                  <div className="points-section">
                    <span className="points-badge">
                      <i className="fa-solid fa-star"></i>
                      {u.numIssueRaised || 0} pts
                    </span>
                    <div className="progress-bar">
                      <div
                        className="progress-fill"
                        style={{
                          width: `${Math.min(
                            ((u.numIssueRaised || 0) /
                              Math.max(sortedUsers[0]?.numIssueRaised || 1, 1)) *
                              100,
                            100
                          )}%`,
                        }}
                      ></div>
                    </div>
                  </div>
                  <div className="contributor-stats">
                    <span className="stat-item">
                      <i className="fa-solid fa-calendar"></i>
                      Joined:{" "}
                      {u.createdAt
                        ? new Date(u.createdAt).toLocaleDateString()
                        : "Unknown"}
                    </span>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <div className="no-contributors">
              <i className="fa-solid fa-users-slash"></i>
              <p>No contributors yet.</p>
              <small>Users will appear here once they start reporting issues.</small>
            </div>
          )}
        </div>
      </div>

      <div className="community-insights">
        <h3 className="section-title">
          <i className="fa-solid fa-chart-pie"></i> Community Insights
        </h3>
        <div className="insights-grid">
          <div className="insight-card">
            <h4>Most Active Users</h4>
            <div className="active-users">
              {sortedUsers.slice(0, 3).map((user, index) => (
                <div key={index} className="active-user">
                  <span className="user-rank">#{index + 1}</span>
                  <span className="user-name">{user.fullName || "Unknown"}</span>
                  <span className="user-points">{user.numIssueRaised || 0} pts</span>
                </div>
              ))}
            </div>
          </div>

          <div className="insight-card">
            <h4>Engagement Level</h4>
            <div className="engagement-level">
              {users.filter((u) => (u.numIssueRaised || 0) > 5).length > 0 ? (
                <>
                  <div className="level-high">
                    <i className="fa-solid fa-fire"></i>
                    <span>
                      High:{" "}
                      {users.filter((u) => (u.numIssueRaised || 0) > 5).length}{" "}
                      users
                    </span>
                  </div>
                  <div className="level-medium">
                    <i className="fa-solid fa-bolt"></i>
                    <span>
                      Medium:{" "}
                      {users.filter(
                        (u) =>
                          (u.numIssueRaised || 0) > 0 &&
                          (u.numIssueRaised || 0) <= 5
                      ).length}{" "}
                      users
                    </span>
                  </div>
                  <div className="level-low">
                    <i className="fa-solid fa-leaf"></i>
                    <span>
                      Low:{" "}
                      {users.filter((u) => (u.numIssueRaised || 0) === 0).length}{" "}
                      users
                    </span>
                  </div>
                </>
              ) : (
                <p>No engagement data available yet.</p>
              )}
            </div>
          </div>
        </div>
      </div>

      {sortedUsers.length > 5 && (
        <div className="leaderboard-footer">
          <button
            className="btn-view-all"
            onClick={() => setShowFullLeaderboard((prev) => !prev)}
          >
            <i className="fa-solid fa-users"></i>
            {showFullLeaderboard ? "Show Less" : "View Full Leaderboard"}
          </button>
        </div>
      )}
    </div>
  );
}

export default PublicView;