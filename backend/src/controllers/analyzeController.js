import { analyzeImageWithGemini, analyzeImageForNSFW } from "../services/geminiService.js";

export const analyzeImage = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ error: "No image file provided" });
    }

    const { buffer, mimetype } = req.file;

    const isNSFW = await analyzeImageForNSFW(buffer, mimetype);
    if (isNSFW) {
      return res.status(400).json({
        error: "Potential NSFW content detected",
        analysis_blocked: true,
      });
    }

    const analysis = await analyzeImageWithGemini(buffer, mimetype);
    res.json(analysis);
  } catch (error) {
    console.error("Error in analyzeImage:", error);
    res.status(500).json({ error: "Image analysis failed" });
  }
};