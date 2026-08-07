import express from "express";
import request from "supertest";
import { analyzeImage } from "../controllers/analyzeController.js";
import upload from "../middlewares/upload.js";

const app = express();
app.use(express.json());
app.post("/analyze", upload.single("image"), analyzeImage);

jest.mock("../services/geminiService.js", () => ({
  analyzeImageWithGemini: jest.fn().mockResolvedValue({
    category: "Pothole",
    importance: "High",
    cost_estimate: "500-1000",
    confidence: 0.85,
    is_public_property: true,
  }),
  analyzeImageForNSFW: jest.fn().mockResolvedValue(false),
}));

describe("Analyze Controller", () => {
  it("returns analysis for valid image", async () => {
    const res = await request(app)
      .post("/analyze")
      .attach("image", Buffer.from("fake-image-data"), "test.jpg");

    expect(res.status).toBe(200);
    expect(res.body.category).toBe("Pothole");
    expect(res.body.is_public_property).toBe(true);
  });

  it("blocks NSFW content", async () => {
    jest.doMock("../services/geminiService.js", () => ({
      analyzeImageWithGemini: jest.fn().mockResolvedValue({}),
      analyzeImageForNSFW: jest.fn().mockResolvedValue(true),
    }));

    const res = await request(app)
      .post("/analyze")
      .attach("image", Buffer.from("fake-image-data"), "test.jpg");

    expect(res.status).toBe(400);
    expect(res.body.analysis_blocked).toBe(true);
  });
});