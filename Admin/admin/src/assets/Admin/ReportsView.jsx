import React, { useState } from "react";

function ReportsView({ 
  reportFilters, 
  setReportFilters,
  reportData, 
  reportLoading,
  generateReport,
  exportReportCSV 
}) {
  return (
    <div className="reports-content">
      <div className="content-header">
        <h2>Reports & Analytics</h2>
        <p>Generate comprehensive reports and view detailed analytics</p>
      </div>

      <div className="report-generation-section">
        <h3>
          <i className="fa-solid fa-chart-line"></i> Generate New Report
        </h3>

        <div className="report-filters">
          <div className="filter-row">
            <div className="filter-group">
              <label>Time Period</label>
              <select
                value={reportFilters.timePeriod}
                onChange={(e) =>
                  setReportFilters({ ...reportFilters, timePeriod: e.target.value })
                }
              >
                <option value="7days">Last 7 days</option>
                <option value="30days">Last 30 days</option>
                <option value="3months">Last 3 months</option>
                <option value="1year">Last year</option>
                <option value="custom">Custom range</option>
              </select>
            </div>

            <div className="filter-group">
              <label>Category</label>
              <select
                value={reportFilters.category}
                onChange={(e) =>
                  setReportFilters({ ...reportFilters, category: e.target.value })
                }
              >
                <option value="">All Categories</option>
                <option value="Pothole">Pothole</option>
                <option value="Street Light">Street Light</option>
                <option value="Garbage">Garbage</option>
                <option value="Water">Water</option>
                <option value="Other">Other</option>
              </select>
            </div>

            <div className="filter-group">
              <label>Status</label>
              <select
                value={reportFilters.status}
                onChange={(e) =>
                  setReportFilters({ ...reportFilters, status: e.target.value })
                }
              >
                <option value="">All Status</option>
                <option value="pending">Pending</option>
                <option value="acknowledged">Acknowledged</option>
                <option value="resolved">Resolved</option>
                <option value="rejected">Rejected</option>
              </select>
            </div>

            <div className="filter-group">
              <label>District</label>
              <select
                value={reportFilters.district}
                onChange={(e) =>
                  setReportFilters({ ...reportFilters, district: e.target.value })
                }
              >
                <option value="">All Districts</option>
                <option value="Vellore">Vellore</option>
                <option value="Chennai">Chennai</option>
                <option value="Coimbatore">Coimbatore</option>
                <option value="Madurai">Madurai</option>
              </select>
            </div>
          </div>

          <div className="report-actions">
            <button
              className="btn-generate-report"
              onClick={generateReport}
              disabled={reportLoading}
            >
              <i className="fa-solid fa-file-export"></i>
              {reportLoading ? "Generating..." : "Generate Report"}
            </button>

            <button
              className="btn-export-csv"
              onClick={exportReportCSV}
              disabled={reportLoading}
            >
              <i className="fa-solid fa-download"></i> Export CSV
            </button>
          </div>
        </div>
      </div>

      {reportData && (
        <div className="report-results">
          <div className="report-summary">
            <h3>
              <i className="fa-solid fa-chart-bar"></i> Report Summary
            </h3>

            <div className="summary-stats">
              <div className="summary-card">
                <div className="summary-icon total">
                  <i className="fa-solid fa-list"></i>
                </div>
                <div className="summary-content">
                  <h4>{reportData.statistics.total}</h4>
                  <p>Total Issues</p>
                </div>
              </div>

              <div className="summary-card">
                <div className="summary-icon pending">
                  <i className="fa-solid fa-clock"></i>
                </div>
                <div className="summary-content">
                  <h4>{reportData.statistics.pending}</h4>
                  <p>Pending</p>
                </div>
              </div>

              <div className="summary-card">
                <div className="summary-icon resolved">
                  <i className="fa-solid fa-check-circle"></i>
                </div>
                <div className="summary-content">
                  <h4>{reportData.statistics.resolved}</h4>
                  <p>Resolved</p>
                </div>
              </div>

              <div className="summary-card">
                <div className="summary-icon rate">
                  <i className="fa-solid fa-percentage"></i>
                </div>
                <div className="summary-content">
                  <h4>{reportData.statistics.resolutionRate}%</h4>
                  <p>Resolution Rate</p>
                </div>
              </div>
            </div>

            <div className="breakdown-charts">
              <div className="chart-section">
                <h4>Category Breakdown</h4>
                <div className="category-breakdown">
                  {Object.entries(reportData.breakdowns.category).map(
                    ([category, count]) => (
                      <div key={category} className="breakdown-item">
                        <span className="category-name">{category}</span>
                        <div className="breakdown-bar">
                          <div
                            className="breakdown-fill"
                            style={{
                              width: `${
                                (count / reportData.statistics.total) * 100
                              }%`,
                            }}
                          ></div>
                        </div>
                        <span className="category-count">{count}</span>
                      </div>
                    )
                  )}
                </div>
              </div>

              <div className="chart-section">
                <h4>District Breakdown</h4>
                <div className="district-breakdown">
                  {Object.entries(reportData.breakdowns.district).map(
                    ([district, count]) => (
                      <div key={district} className="breakdown-item">
                        <span className="district-name">{district}</span>
                        <div className="breakdown-bar">
                          <div
                            className="breakdown-fill"
                            style={{
                              width: `${
                                (count / reportData.statistics.total) * 100
                              }%`,
                            }}
                          ></div>
                        </div>
                        <span className="district-count">{count}</span>
                      </div>
                    )
                  )}
                </div>
              </div>
            </div>

            <div className="response-time-analysis">
              <h4>Response Time Analysis</h4>
              <div className="response-stats">
                <div className="response-card">
                  <i className="fa-solid fa-clock"></i>
                  <span>Average Response Time</span>
                  <strong>{reportData.analysis.averageResponseTime} hours</strong>
                </div>
                <div className="response-card">
                  <i className="fa-solid fa-chart-line"></i>
                  <span>Issues Analyzed</span>
                  <strong>
                    {reportData.analysis.responseTime.length} issues
                  </strong>
                </div>
              </div>
            </div>

            <div className="top-contributors">
              <h4>Top Contributors</h4>
              <div className="contributors-list">
                {reportData.contributors
                  .slice(0, 5)
                  .map((contributor, index) => (
                    <div key={contributor.userId} className="contributor-item">
                      <div className="contributor-rank">#{index + 1}</div>
                      <div className="contributor-info">
                        <span className="contributor-name">
                          {contributor.fullName}
                        </span>
                        <span className="contributor-email">
                          {contributor.email}
                        </span>
                      </div>
                      <div className="contributor-issues">
                        <span className="issue-count">{contributor.issueCount}</span>
                        <span className="issue-label">issues</span>
                      </div>
                    </div>
                  ))}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default ReportsView;