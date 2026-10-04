import { body } from "express-validator";

export const createCompanyValidation = [
  body("name")
    .notEmpty()
    .withMessage("Company name is required"),

  body("website")
    .optional()
    .isURL()
    .withMessage("Invalid website URL"),
];