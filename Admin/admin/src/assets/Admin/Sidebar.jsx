import React from "react";

function Sidebar({
  adminProfile,
  activeView,
  showProfileDropdown,
  toggleProfileDropdown,
  handleNavClick,
  handleLogout,
  sidebarOpen,
  toggleSidebar,
  isMobile,
  getInitials,
}) {
  const navItems = [
    { id: "dashboard", icon: "fa-chart-line", label: "Dashboard" },
    { id: "issues", icon: "fa-file-lines", label: "Issues" },
    { id: "pending", icon: "fa-box", label: "Pending" },
    { id: "rejected", icon: "fa-box", label: "Rejected Issue" },
    { id: "volunteerRequests", icon: "fa-user-plus", label: "Volunteer Requests" },
    { id: "volunteers", icon: "fa-people-carry-box", label: "Volunteers" },
    { id: "claims", icon: "fa-clipboard-check", label: "Claims" },
    { id: "public", icon: "fa-user", label: "Public" },
    { id: "reports", icon: "fa-flag", label: "Reports" },
    { id: "map", icon: "fa-map", label: "Map View" },
  ];

  return (
    <aside
      className={`sidebar ${sidebarOpen ? "open" : "closed"} ${isMobile ? "mobile" : ""}`}
    >
      <div className="company">ProbMap</div>

      {adminProfile && (
        <div className="admin-profile-section">
          <div className="profile-avatar" onClick={toggleProfileDropdown}>
            <span className="avatar-initials">
              {getInitials(adminProfile.fullName)}
            </span>
          </div>
          <div className="profile-info">
            <div className="profile-name">{adminProfile.fullName}</div>
            <div className="profile-role">{adminProfile.role}</div>
            <div className="profile-city">{adminProfile.city}</div>
          </div>

          {showProfileDropdown && (
            <div className="profile-dropdown">
              <div className="dropdown-info">
                <div className="info-item">
                  <span className="info-label">Email:</span>
                  <span className="info-value">{adminProfile.email}</span>
                </div>
                <div className="info-item">
                  <span className="info-label">City:</span>
                  <span className="info-value">{adminProfile.city}</span>
                </div>
                <div className="info-item">
                  <span className="info-label">Role:</span>
                  <span className="info-value">{adminProfile.role}</span>
                </div>
                <div className="info-item">
                  <span className="info-label">Joined:</span>
                  <span className="info-value">
                    {new Date(adminProfile.createdAt).toLocaleDateString()}
                  </span>
                </div>
              </div>
            </div>
          )}
        </div>
      )}
      <nav>
        <ul>
          {navItems.map((item) => (
            <li key={item.id}>
              <a
                className={`nav-link ${activeView === item.id ? "active" : ""}`}
                href="#"
                onClick={() => handleNavClick(item.id)}
              >
                <i className={`fa-solid ${item.icon}`}></i>
                <span>{item.label}</span>
              </a>
            </li>
          ))}
        </ul>

        <div className="bottom-links">
          <a className="nav-link" href="#" onClick={handleLogout}>
            <i className="fa-solid fa-arrow-right-from-bracket"></i>
            <span>Sign out</span>
          </a>
        </div>
      </nav>
    </aside>
  );
}

export default Sidebar;