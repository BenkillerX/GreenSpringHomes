import { body } from "express-validator";

export const propertyValidator = [
  // Basic information
  body("title")
    .trim()
    .notEmpty()
    .withMessage("Property title is required.")
    .isLength({ max: 150 })
    .withMessage("Property title cannot exceed 150 characters."),

  body("description")
    .trim()
    .notEmpty()
    .withMessage("Property description is required.")
    .isLength({ max: 3000 })
    .withMessage("Property description cannot exceed 3000 characters."),

  body("propertyType")
    .notEmpty()
    .withMessage("Property type is required.")
    .isIn([
    "apartment",
    "house",
    "duplex",
    "bungalow",
    "self-contained",
    "land",
    "office",
    "shop",
    "car",
    "other",
  ])
    .withMessage("Invalid property type."),

  // Listing details
  body("listingType")
    .notEmpty()
    .withMessage("Listing type is required.")
    .isIn(["rent", "sale"])
    .withMessage("Listing type must be either rent or sale."),

  body("price")
    .notEmpty()
    .withMessage("Property price is required.")
    .isFloat({ min: 0 })
    .withMessage("Property price must be a valid positive number."),

  body("bedrooms")
    .optional()
    .isInt({ min: 0 })
    .withMessage("Bedrooms must be a valid number."),

  body("bathrooms")
    .optional()
    .isInt({ min: 0 })
    .withMessage("Bathrooms must be a valid number."),

  // Location
  body("location.state")
    .trim()
    .notEmpty()
    .withMessage("State is required."),

  body("location.city")
    .trim()
    .notEmpty()
    .withMessage("City is required."),

  body("location.area")
    .trim()
    .notEmpty()
    .withMessage("Area is required."),

  body("location.address")
    .trim()
    .notEmpty()
    .withMessage("Property address is required."),
];