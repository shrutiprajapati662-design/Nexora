import { body } from "express-validator";

export const createJobValidation = [
  body("title").notEmpty().withMessage("Title is required"),

  body("description").notEmpty().withMessage("Description is required"),

  body("salary")
    .isNumeric()
    .withMessage("Salary must be a number"),

  body("location")
    .notEmpty()
    .withMessage("Location is required"),

  body("jobType")
    .notEmpty()
    .withMessage("Job Type is required"),

  body("company")
    .notEmpty()
    .withMessage("Company is required"),
];