import React from "react";
import IssueCard from "./IssueCard";

function IssuesView({ 
  issues, 
  title, 
  onUpdateStatus, 
  onShowOnMap,
  emptyMessage = "No issues reported yet."
}) {
  return (
    <div className={`issues-content ${title.toLowerCase().replace(/\s+/g, '-')}-content`}>
      <h2>{title}</h2>
      <div className="issues-list">
        {issues && issues.length > 0 ? (
          issues.map((issue) => (
            <IssueCard
              key={issue._id}
              issue={issue}
              onUpdateStatus={onUpdateStatus}
              onShowOnMap={onShowOnMap}
            />
          ))
        ) : (
          <p>{emptyMessage}</p>
        )}
      </div>
    </div>
  );
}

export default IssuesView;