import { jest, describe, it, expect } from "@jest/globals";
import express from "express";
import request from "supertest";

const mockVerifySession = jest.fn((req, res, next) => {
  req.user = { uid: "test-uid" };
  next();
});

jest.unstable_mockModule("../middlewares/firebaseAuth.js", () => ({
  default: {
    verifySessionCookie: (req, res, next) => mockVerifySession(req, res, next),
  },
}));

jest.unstable_mockModule("../services/geminiService.js", () => ({
  analyzeImageWithGemini: jest.fn().mockResolvedValue({
    category: "Pothole",
    importance: "High",
    cost_estimate: "500-1000",
    confidence: 0.85,
    is_public_property: true,
  }),
  analyzeImageForNSFW: jest.fn().mockResolvedValue(false),
}));

const issueRoutes = (await import("../routes/issueRoutes.js")).default;

const app = express();
app.use(express.json());
app.use("/issue", issueRoutes);

describe("Issue Routes", () => {
  describe("POST /issue", () => {
    it("returns 401 without auth", async () => {
      mockVerifySession.mockImplementationOnce((req, res) => {
        res.status(401).json({ message: "Unauthorized" });
      });

      const res = await request(app)
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