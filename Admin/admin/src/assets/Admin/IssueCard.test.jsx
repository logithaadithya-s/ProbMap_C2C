import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import IssueCard from "./IssueCard";

const mockIssue = {
  _id: "test-1",
  title: "Pothole on Main St",
  description: "Large pothole causing damage",
  category: "Pothole",
  status: "pending",
  importance: "High",
  district: "Downtown",
  cost_estimate: "5000",
  location: { district: "Downtown" },
  createdAt: "2024-01-15T10:30:00Z",
  imageUrl: "https://example.com/pothole.jpg",
  userId: "user-1",
  userInfo: {
    fullName: "John Doe",
    email: "john@example.com",
    phone: "123-456-7890",
    joinedDate: "2023-06-01T00:00:00Z",
  },
  adminResponse: null,
};

const mockOnUpdateStatus = jest.fn();
const mockOnShowOnMap = jest.fn();

describe("IssueCard", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("renders issue title and description", () => {
    render(<IssueCard issue={mockIssue} onUpdateStatus={mockOnUpdateStatus} onShowOnMap={mockOnShowOnMap} />);
    expect(screen.getByText("Pothole on Main St")).toBeInTheDocument();
    expect(screen.getByText("Large pothole causing damage")).toBeInTheDocument();
  });

  it("shows status badge", () => {
    render(<IssueCard issue={mockIssue} onUpdateStatus={mockOnUpdateStatus} onShowOnMap={mockOnShowOnMap} />);
    expect(screen.getByText("Pending")).toBeInTheDocument();
  });

  it("shows cost estimate", () => {
    render(<IssueCard issue={mockIssue} onUpdateStatus={mockOnUpdateStatus} onShowOnMap={mockOnShowOnMap} />);
    expect(screen.getByText("Estimated Cost:")).toBeInTheDocument();
    expect(screen.getByText(/5000/)).toBeInTheDocument();
  });

  it("shows user info", () => {
    render(<IssueCard issue={mockIssue} onUpdateStatus={mockOnUpdateStatus} onShowOnMap={mockOnShowOnMap} />);
    expect(screen.getByText("John Doe")).toBeInTheDocument();
    expect(screen.getByText("john@example.com")).toBeInTheDocument();
  });

  it("shows action buttons for pending status", () => {
    render(<IssueCard issue={mockIssue} onUpdateStatus={mockOnUpdateStatus} onShowOnMap={mockOnShowOnMap} />);
    expect(screen.getByText("Acknowledge")).toBeInTheDocument();
    expect(screen.getByText("Reject")).toBeInTheDocument();
    expect(screen.getByText("Resolve")).toBeInTheDocument();
  });

  it("calls onShowOnMap when Show on Map clicked", () => {
    render(<IssueCard issue={mockIssue} onUpdateStatus={mockOnUpdateStatus} onShowOnMap={mockOnShowOnMap} />);
    fireEvent.click(screen.getByText("Show on Map"));
    expect(mockOnShowOnMap).toHaveBeenCalledWith(mockIssue);
  });

  it("opens message box when action button clicked", () => {
    render(<IssueCard issue={mockIssue} onUpdateStatus={mockOnUpdateStatus} onShowOnMap={mockOnShowOnMap} />);
    fireEvent.click(screen.getByText("Acknowledge"));
    expect(screen.getByPlaceholderText("Enter a message...")).toBeInTheDocument();
  });

  it("shows admin response when present", () => {
    const issueWithResponse = {
      ...mockIssue,
      status: "rejected",
      adminResponse: {
        message: "Not a public property issue",
        respondedAt: "2024-01-16T10:00:00Z",
      },
    };
    render(<IssueCard issue={issueWithResponse} onUpdateStatus={mockOnUpdateStatus} onShowOnMap={mockOnShowOnMap} />);
    expect(screen.getByText("Admin Response:")).toBeInTheDocument();
    expect(screen.getByText("Not a public property issue")).toBeInTheDocument();
  });
});