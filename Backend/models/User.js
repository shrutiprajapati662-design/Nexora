import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Name is required"],
      trim: true,
      minlength: [2, "Name must be at least 2 characters"],
      maxlength: [50, "Name cannot exceed 50 characters"],
    },

    email: {
      type: String,
      required: [true, "Email is required"],
      unique: true,
      lowercase: true,
      trim: true,
      match: [
        /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/,
        "Please enter a valid email",
      ],
    },

    password: {
      type: String,
      required: [true, "Password is required"],
      minlength: [8, "Password must be at least 8 characters"],
      select: false,
    },

    role: {
      type: String,
      enum: ["user", "admin"],
      default: "user",
      index: true,
    },
    phone: {
      type: String,
      default: "",
      trim: true,
    },
    bio: {
      type: String,
      default: "",
      trim: true,
      maxlength: [500, "Bio cannot exceed 500 characters"],
    },

    skills: {
      type: [String],
      default: [],
    },

    location: {
      type: String,
      default: "",
      trim: true,
    },

    profilePhoto: {
      type: String,
      default: "",
    },

    resetPasswordToken: {
      type: String,
      default: "",
    },

    resetPasswordExpire: {
      type: Date,
    },

    resume: {
      type: String,
      default: "",
    },

    savedJobs: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Job",
      },
    ],

    applications: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Application",
      },
    ],

    professionalRole: {
      type: String,
      default: "",
    },

    experience: {
      type: String,
      default: "",
    },

    qualification: {
      type: String,
      default: "",
    },

    college: {
      type: String,
      default: "",
    },

    specialization: {
      type: String,
      default: "",
    },

    passingYear: {
      type: String,
      default: "",
    },

    cgpa: {
      type: String,
      default: "",
    },

    currentCompany: {
      type: String,
      default: "",
    },

    currentCTC: {
      type: String,
      default: "",
    },

    expectedCTC: {
      type: String,
      default: "",
    },

  },
  {
    timestamps: true,
  }
);

const User = mongoose.model("User", userSchema);

export default User;