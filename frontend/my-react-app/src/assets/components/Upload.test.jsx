import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import Upload from "./Upload";

jest.mock("react-webcam", () => ({
  __esModule: true,
  default: ({ ref, ...props }) => (
    <video ref={ref} data-testid="webcam" {...props} />
  ),
}));

jest.mock("react-leaflet", () => ({
  MapContainer: ({ children }) => <div data-testid="map-container">{children}</div>,
  TileLayer: () => null,
  Marker: ({ children }) => <div data-testid="marker">{children}</div>,
  Popup: ({ children }) => <div data-testid="popup">{children}</div>,
  useMapEvents: () => null,
}));

jest.mock("leaflet", () => ({
  Icon: {
    Default: {
      prototype: { _getIconUrl: {} },
      mergeOptions: jest.fn(),
    },
  },
}));

global.fetch = jest.fn();

describe("Upload Component", () => {
  beforeEach(() => {
    jest.clearAllMocks();
    localStorage.clear();
  });

  const renderWithRouter = (component) => {
    return render(<BrowserRouter>{component}</BrowserRouter>);
  };

  it("renders description field", () => {
    renderWithRouter(<Upload />);
    expect(screen.getByPlaceholderText("Describe the problem...")).toBeInTheDocument();
  });

  it("shows file upload button", () => {
    renderWithRouter(<Upload />);
    expect(screen.getByText("📁 Upload Image")).toBeInTheDocument();
  });

  it("shows camera button", () => {
    renderWithRouter(<Upload />);
    expect(screen.getByText("Open Camera")).toBeInTheDocument();
  });

  it("shows location buttons", () => {
    renderWithRouter(<Upload />);
    expect(screen.getByText("📍 Use My Current Location")).toBeInTheDocument();
    expect(screen.getByText("🗺 Select on Map")).toBeInTheDocument();
  });

  it("opens camera modal when camera button clicked", () => {
    renderWithRouter(<Upload />);
    fireEvent.click(screen.getByText("Open Camera"));
    expect(screen.getByTestId("webcam")).toBeInTheDocument();
  });

  it("shows submit button", () => {
    renderWithRouter(<Upload />);
    expect(screen.getByText("✅ Submit")).toBeInTheDocument();
  });

  it("shows reset button", () => {
    renderWithRouter(<Upload />);
    expect(screen.getByText("🔄 Reset")).toBeInTheDocument();
  });
});