import { body, param, query, validationResult } from "express-validator";

export const handleValidationErrors = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({
      error: "Validation failed",
      details: errors.array().map((e) => ({
        field: e.path,
        message: e.msg,
        value: e.value,
      })),
    });
  }
  next();
};

export const validateCreateIssue = [
  body("title").trim().notEmpty().withMessage("Title is required").isLength({ max: 100 }),
  body("description").trim().notEmpty().withMessage("Description is required").isLength({ max: 2000 }),
  body("category").trim().notEmpty().withMessage("Category is required"),
  body("location")
    .notEmpty()
    .withMessage("Location is required")
    .custom((value) => {
      try {
        const parsed = JSON.parse(value);
        if (typeof parsed.lat !== "number" || typeof parsed.lng !== "number") {
          throw new Error("Invalid coordinates");
        }
        return true;
      } catch {
        throw new Error("Location must be valid JSON with lat/lng");
      }
    }),
  body("district").optional().trim().isLength({ max: 100 }),
  body("importance").optional().isIn(["High", "Medium", "Low"]),
  body("cost_estimate").optional().trim().isLength({ max: 50 }),
  body("is_public_property").optional().isIn(["yes", "no"]),
  handleValidationErrors,
];

export const validateUpdateIssue = [
  param("id").isMongoId().withMessage("Invalid issue ID"),
  body("status").optional().isIn(["pending", "acknowledged", "resolved", "rejected"]),
  body("message").optional().trim().isLength({ max: 1000 }),
  handleValidationErrors,
];

export const validateVolunteerRequest = [
  body("volunteerDistrict").trim().notEmpty().withMessage("District is required"),
  handleValidationErrors,
];

export const validateClaimReview = [
  param("issueId").isMongoId().withMessage("Invalid issue ID"),
  body("status").isIn(["approved", "rejected"]).withMessage("Status must be approved or rejected"),
  handleValidationErrors,
];

export const validateReportFilters = [
  query("timePeriod").optional().isIn(["7days", "30days", "3months", "1year", "custom"]),
  query("category").optional().trim(),
  query("status").optional().isIn(["pending", "acknowledged", "resolved", "rejected"]),
  query("district").optional().trim(),
  handleValidationErrors,
];

export const validatePagination = [
  query("page").optional().isInt({ min: 1 }).toInt(),
  query("limit").optional().isInt({ min: 1, max: 100 }).toInt(),
  handleValidationErrors,
];