import express from "express";
import request from "supertest";
import issueRoutes from "../routes/issueRoutes.js";
import { config } from "../config/index.js";

const app = express();
app.use(express.json());
app.use("/issue", issueRoutes);

jest.mock("../middlewares/firebaseAuth.js", () => ({
  verifySessionCookie: (req, res, next) => {
    req.user = { uid: "test-uid" };
    next();
  },
}));

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

jest.mock("../models/issueModel.js", () => {
  const mockSave = jest.fn().mockResolvedValue({
    _id: "test-issue-id",
    title: "Test Issue",
    description: "Test description",
    category: "Pothole",
    location: { lat: 12.9716, lng: 77.5946 },
    district: "Bangalore",
    importance: "High",
    cost_estimate: "500-1000",
    is_public_property: true,
    imageUrl: "https://cloudinary.com/test.jpg",
    userId: "test-uid",
    createdAt: new Date(),
  });
  return jest.fn().mockImplementation(() => ({ save: mockSave }));
});

jest.mock("../models/userModel.js", () => ({
  findOneAndUpdate: jest.fn().mockResolvedValue({}),
}));

describe("Issue Routes", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe("POST /issue", () => {
    it("returns 401 without auth", async () => {
      const appNoAuth = express();
      appNoAuth.use(express.json());
      appNoAuth.post("/issue", (req, res) => res.status(401).json({ message: "Unauthorized" }));

      const res = await request(appNoAuth)
        .post("/issue")
        .send({ title: "Test", description: "Test" });

      expect(res.status).toBe(401);
    });
  });

  describe("POST /issue/analyze-image", () => {
    it("returns 400 without image", async () => {
      const res = await request(app)
        .post("/issue/analyze-image")
        .send();

      expect(res.status).toBe(400);
      expect(res.body.error).toBe("No image file provided");
    });
  });
});