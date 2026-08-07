import { parseLLMResponse, simpleNSFWDetection } from "../services/geminiService.js";

describe("geminiService", () => {
  describe("parseLLMResponse", () => {
    it("parses valid JSON response", () => {
      const response = `{"category": "Pothole", "importance": "High", "cost_estimate": "500-1000", "confidence": 0.85, "is_public_property": true}`;
      const result = parseLLMResponse(response);
      expect(result.category).toBe("Pothole");
      expect(result.importance).toBe("High");
      expect(result.confidence).toBe(0.85);
      expect(result.is_public_property).toBe(true);
    });

    it("handles JSON wrapped in text", () => {
      const response = `Here is the analysis: {"category": "Street Light", "importance": "Medium", "cost_estimate": "1000-2000", "confidence": 0.9, "is_public_property": true} End of response.`;
      const result = parseLLMResponse(response);
      expect(result.category).toBe("Street Light");
    });

    it("returns default for invalid JSON", () => {
      const response = "This is not JSON at all";
      const result = parseLLMResponse(response);
      expect(result.category).toBe("Others");
      expect(result.is_public_property).toBe(false);
    });

    it("returns default for empty string", () => {
      const result = parseLLMResponse("");
      expect(result.category).toBe("Others");
    });
  });

  describe("simpleNSFWDetection", () => {
    it("returns false for empty buffer", () => {
      const result = simpleNSFWDetection(Buffer.from(""));
      expect(result).toBe(false);
    });
  });
});