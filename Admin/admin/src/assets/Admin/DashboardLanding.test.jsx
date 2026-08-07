import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import DashboardLanding from "./DashboardLanding";

jest.mock("./Chart", () => () => <div data-testid="chart">Chart</div>);

describe("DashboardLanding", () => {
  const mockAdminProfile = {
    fullName: "Admin User",
    role: "Admin",
    city: "Test City",
  };

  const mockHandleNavClick = jest.fn();

  it("renders welcome message", () => {
    render(<DashboardLanding adminProfile={mockAdminProfile} handleNavClick={mockHandleNavClick} />);
    expect(screen.getByText(/Welcome back/i)).toBeInTheDocument();
  });

  it("shows quick action cards", () => {
    render(<DashboardLanding adminProfile={mockAdminProfile} handleNavClick={mockHandleNavClick} />);
    expect(screen.getByText("Pending Issues")).toBeInTheDocument();
    expect(screen.getByText("Volunteer Requests")).toBeInTheDocument();
    expect(screen.getByText("Claims")).toBeInTheDocument();
    expect(screen.getByText("Map View")).toBeInTheDocument();
  });

  it("renders chart component", () => {
    render(<DashboardLanding adminProfile={mockAdminProfile} handleNavClick={mockHandleNavClick} />);
    expect(screen.getByTestId("chart")).toBeInTheDocument();
  });

  it("calls handleNavClick when View Issues clicked", () => {
    render(<DashboardLanding adminProfile={mockAdminProfile} handleNavClick={mockHandleNavClick} />);
    fireEvent.click(screen.getByText("View Issues"));
    expect(mockHandleNavClick).toHaveBeenCalledWith("issues");
  });
});