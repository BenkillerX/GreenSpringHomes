import { validationResult } from "express-validator";

export function validateRequest(req, res, next) {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    const validationErrors = errors.array();

    // Log detailed validation errors
    console.error("VALIDATION FAILED:", validationErrors);

    return res.status(400).json({
      success: false,
      message: "Validation failed.",
      errors: validationErrors,
    });
  }

  next();
}