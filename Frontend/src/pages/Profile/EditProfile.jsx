import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import Input from "../../components/ui/Input";
import Button from "../../components/ui/Button";
import {
  updateProfile,
  uploadProfilePhoto,
  uploadResume,
} from "../../api/authApi";
import toast from "react-hot-toast";

function EditProfile() {
  const { user, loadUser } = useAuth();
  const navigate = useNavigate();

  const [loading, setLoading] = useState(false);

  const [profilePhoto, setProfilePhoto] = useState(null);
  const [resume, setResume] = useState(null);

  const roleOptions = [
    "Frontend Developer",
    "Backend Developer",
    "Full Stack Developer",
    "Software Engineer",
    "AI/ML Engineer",
    "Data Scientist",
    "Data Analyst",
    "DevOps Engineer",
    "Cloud Engineer",
    "Mobile App Developer",
    "UI/UX Designer",
    "Cyber Security Engineer",
    "Other",
  ];

  const experienceOptions = [
    "Fresher",
    "0-1 Years",
    "1-2 Years",
    "2-3 Years",
    "3-5 Years",
    "5+ Years",
  ];

  const qualificationOptions = [
    "B.Tech",
    "B.E",
    "BCA",
    "MCA",
    "B.Sc",
    "M.Sc",
    "MBA",
    "B.Com",
    "Diploma",
    "Other",
  ];

  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    location: "",
    skills: "",
    bio: "",

    professionalRole: "",
    otherRole: "",

    experience: "",

    qualification: "",
    otherQualification: "",

    college: "",
    specialization: "",
    passingYear: "",
    cgpa: "",

    currentCompany: "",
    currentCTC: "",
    expectedCTC: "",
  });

  useEffect(() => {
    if (user) {
      setFormData({
        name: user.name || "",
        phone: user.phone || "",
        location: user.location || "",
        skills: user.skills?.join(", ") || "",
        bio: user.bio || "",

        professionalRole: user.professionalRole || "",
        otherRole: "",

        experience: user.experience || "",

        qualification: user.qualification || "",
        otherQualification: "",

        college: user.college || "",
        specialization: user.specialization || "",
        passingYear: user.passingYear || "",
        cgpa: user.cgpa || "",

        currentCompany: user.currentCompany || "",
        currentCTC: user.currentCTC || "",
        expectedCTC: user.expectedCTC || "",
      });
    }
  }, [user]);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handlePhotoChange = (e) => {
    setProfilePhoto(e.target.files[0]);
  };

  const handleResumeChange = (e) => {
    setResume(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);

      if (profilePhoto) {
        const photo = new FormData();
        photo.append("profilePhoto", profilePhoto);
        await uploadProfilePhoto(photo);
      }

      if (resume) {
        const resumeData = new FormData();
        resumeData.append("resume", resume);
        await uploadResume(resumeData);
      }

      const data = await updateProfile({
        ...formData,

        professionalRole:
          formData.professionalRole === "Other"
            ? formData.otherRole
            : formData.professionalRole,

        qualification:
          formData.qualification === "Other"
            ? formData.otherQualification
            : formData.qualification,

        skills: formData.skills
          .split(",")
          .map((skill) => skill.trim())
          .filter(Boolean),
      });

      toast.success(data.message);

      await loadUser();

      navigate("/profile");
    } catch (error) {
      toast.error(error.response?.data?.message || "Update Failed");
    } finally {
      setLoading(false);
    }
  };

  // Common styling class for Selects, Textareas, and File Inputs
  const controlClass =
    "w-full rounded-lg border border-slate-300 bg-slate-100/70 p-3 text-slate-800 outline-none transition-all duration-200 hover:border-slate-400 focus:border-blue-500 focus:bg-white focus:ring-2 focus:ring-blue-500/20 dark:border-slate-700 dark:bg-slate-800 dark:text-white dark:hover:border-slate-500 dark:focus:border-blue-500 dark:focus:bg-slate-800";

  return (
    <div className="mx-auto max-w-5xl p-8">
      <div className="rounded-2xl border border-slate-200 bg-white p-8 shadow-sm dark:border-slate-800 dark:bg-slate-900">
        <h1 className="mb-8 text-3xl font-bold text-slate-900 dark:text-white">
          Edit Profile
        </h1>

        <form onSubmit={handleSubmit} className="space-y-6">
          <Input
            label="Full Name"
            name="name"
            value={formData.name}
            onChange={handleChange}
          />

          <Input
            label="Phone"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
          />

          <Input
            label="Location"
            name="location"
            value={formData.location}
            onChange={handleChange}
          />

          <div>
            <label className="mb-2 block text-sm font-medium text-slate-700 dark:text-slate-300">
              Professional Role
            </label>

            <select
              name="professionalRole"
              value={formData.professionalRole}
              onChange={handleChange}
              className={controlClass}
            >
              <option value="" className="text-slate-400 dark:bg-slate-800 dark:text-slate-400">
                Select Role
              </option>

              {roleOptions.map((role) => (
                <option key={role} value={role} className="dark:bg-slate-800 dark:text-white">
                  {role}
                </option>
              ))}
            </select>
          </div>

          {formData.professionalRole === "Other" && (
            <Input
              label="Enter Role"
              name="otherRole"
              value={formData.otherRole}
              onChange={handleChange}
            />
          )}

          <div>
            <label className="mb-2 block text-sm font-medium text-slate-700 dark:text-slate-300">
              Experience
            </label>

            <select
              name="experience"
              value={formData.experience}
              onChange={handleChange}
              className={controlClass}
            >
              <option value="" className="text-slate-400 dark:bg-slate-800 dark:text-slate-400">
                Select Experience
              </option>

              {experienceOptions.map((exp) => (
                <option key={exp} value={exp} className="dark:bg-slate-800 dark:text-white">
                  {exp}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="mb-2 block text-sm font-medium text-slate-700 dark:text-slate-300">
              Qualification
            </label>

            <select
              name="qualification"
              value={formData.qualification}
              onChange={handleChange}
              className={controlClass}
            >
              <option value="" className="text-slate-400 dark:bg-slate-800 dark:text-slate-400">
                Select Qualification
              </option>

              {qualificationOptions.map((item) => (
                <option key={item} value={item} className="dark:bg-slate-800 dark:text-white">
                  {item}
                </option>
              ))}
            </select>
          </div>

          {formData.qualification === "Other" && (
            <Input
              label="Enter Qualification"
              name="otherQualification"
              value={formData.otherQualification}
              onChange={handleChange}
            />
          )}

          <Input
            label="College"
            name="college"
            value={formData.college}
            onChange={handleChange}
          />

          <Input
            label="Specialization"
            name="specialization"
            value={formData.specialization}
            onChange={handleChange}
          />

          <Input
            label="Passing Year"
            name="passingYear"
            value={formData.passingYear}
            onChange={handleChange}
          />

          <Input
            label="CGPA / Percentage"
            name="cgpa"
            value={formData.cgpa}
            onChange={handleChange}
          />

          <Input
            label="Current Company"
            name="currentCompany"
            value={formData.currentCompany}
            onChange={handleChange}
          />

          <Input
            label="Current CTC"
            name="currentCTC"
            value={formData.currentCTC}
            onChange={handleChange}
          />

          <Input
            label="Expected CTC"
            name="expectedCTC"
            value={formData.expectedCTC}
            onChange={handleChange}
          />

          <Input
            label="Skills (Comma Separated)"
            name="skills"
            value={formData.skills}
            onChange={handleChange}
          />

          <div>
            <label className="mb-2 block text-sm font-medium text-slate-700 dark:text-slate-300">
              Bio
            </label>

            <textarea
              rows={5}
              name="bio"
              value={formData.bio}
              onChange={handleChange}
              className={`${controlClass} resize-none`}
            />
          </div>

          <div>
            <label className="mb-2 block text-sm font-medium text-slate-700 dark:text-slate-300">
              Upload Profile Photo
            </label>

            <input
              type="file"
              accept="image/*"
              onChange={handlePhotoChange}
              className={`${controlClass} file:mr-4 file:rounded-lg file:border-0 file:bg-blue-600 file:px-4 file:py-2 file:text-white hover:file:bg-blue-700 cursor-pointer`}
            />
          </div>

          <div>
            <label className="mb-2 block text-sm font-medium text-slate-700 dark:text-slate-300">
              Upload Resume
            </label>

            <input
              type="file"
              accept=".pdf,.doc,.docx"
              onChange={handleResumeChange}
              className={`${controlClass} file:mr-4 file:rounded-lg file:border-0 file:bg-green-600 file:px-4 file:py-2 file:text-white hover:file:bg-green-700 cursor-pointer`}
            />
          </div>

          <Button type="submit" disabled={loading}>
            {loading ? "Saving..." : "Save Changes"}
          </Button>
        </form>
      </div>
    </div>
  );
}

export default EditProfile;