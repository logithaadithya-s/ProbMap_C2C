import { jest, describe, it, expect, beforeEach } from "@jest/globals";
import express from "express";
import request from "supertest";

const mockAnalyzeWithGemini = jest.fn();
const mockAnalyzeForNSFW = jest.fn();

jest.unstable_mockModule("../services/geminiService.js", () => ({
  analyzeImageWithGemini: mockAnalyzeWithGemini,
  analyzeImageForNSFW: mockAnalyzeForNSFW,
}));

const { analyzeImage } = await import("../controllers/analyzeController.js");
const upload = (await import("../middlewares/upload.js")).default;

const app = express();
app.use(express.json());
app.post("/analyze", upload.single("image"), analyzeImage);

describe("Analyze Controller", () => {
  beforeEach(() => {
    mockAnalyzeWithGemini.mockReset();
    mockAnalyzeForNSFW.mockReset();
  });

  it("returns analysis for valid image", async () => {
    mockAnalyzeWithGemini.mockResolvedValue({
      category: "Pothole",
      importance: "High",
      cost_estimate: "500-1000",
      confidence: 0.85,
      is_public_property: true,
    });
    mockAnalyzeForNSFW.mockResolvedValue(false);

    const res = await request(app)
      .post("/analyze")
      .attach("image", Buffer.from("fake-image-data"), "test.jpg");

    expect(res.status).toBe(200);
    expect(res.body.category).toBe("Pothole");
    expect(res.body.is_public_property).toBe(true);
  });

  it("blocks NSFW content", async () => {
    mockAnalyzeForNSFW.mockResolvedValue(true);
    mockAnalyzeWithGemini.mockResolvedValue({});

    const res = await request(app)
      .post("/analyze")
      .attach("image", Buffer.from("fake-image-data"), "test.jpg");

    expect(res.status).toBe(400);
    expect(res.body.analysis_blocked).toBe(true);
  });
});