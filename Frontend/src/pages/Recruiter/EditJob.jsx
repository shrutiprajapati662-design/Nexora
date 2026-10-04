import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import toast from "react-hot-toast";

import Input from "../../components/ui/Input";
import Button from "../../components/ui/Button";

import {
  getJobById,
  updateJob,
} from "../../services/recruiterService";

function EditJob() {

  const { id } = useParams();
  const navigate = useNavigate();

  const [loading, setLoading] = useState(false);

  const [jobData, setJobData] = useState({
    title: "",
    description: "",
    location: "",
    salary: "",
    experience: "",
    jobType: "Full-Time",
    skills: "",
  });

  useEffect(() => {
    loadJob();
  }, []);

  const loadJob = async () => {
    try {
      const data = await getJobById(id);

      const job = data.job;

      setJobData({
        title: job.title || "",
        description: job.description || "",
        location: job.location || "",
        salary: job.salary || "",
        experience: job.experience || "",
        jobType: job.jobType || "Full-Time",
        skills: job.skills?.join(", ") || "",
      });

    } catch (error) {
      toast.error("Failed to load job");
    }
  };

  const handleChange = (e) => {
    setJobData({
      ...jobData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {

      setLoading(true);

      const data = await updateJob(id, {
        ...jobData,
        skills: jobData.skills
          .split(",")
          .map((skill) => skill.trim())
          .filter(Boolean),
      });

      toast.success(data.message);

      navigate("/recruiter/my-jobs");

    } catch (error) {

      toast.error(
        error.response?.data?.message || "Update Failed"
      );

    } finally {

      setLoading(false);

    }
  };

  return (
    <div className="mx-auto max-w-4xl p-8">

      <div className="rounded-2xl bg-slate-900 p-8">

        <h1 className="mb-8 text-3xl font-bold text-white">
          Edit Job
        </h1>

        <form
          onSubmit={handleSubmit}
          className="space-y-5"
        >

          <Input
            label="Job Title"
            name="title"
            value={jobData.title}
            onChange={handleChange}
          />

          <Input
            label="Location"
            name="location"
            value={jobData.location}
            onChange={handleChange}
          />

          <Input
            label="Salary (LPA)"
            type="number"
            name="salary"
            value={jobData.salary}
            onChange={handleChange}
          />

          <Input
            label="Experience"
            type="number"
            name="experience"
            value={jobData.experience}
            onChange={handleChange}
          />

          <div>
            <label className="mb-2 block text-slate-300">
              Job Type
            </label>

            <select
              name="jobType"
              value={jobData.jobType}
              onChange={handleChange}
              className="w-full rounded-lg border border-slate-700 bg-slate-800 p-3 text-white"
            >
              <option>Full-Time</option>
              <option>Part-Time</option>
              <option>Internship</option>
              <option>Remote</option>
            </select>
          </div>

          <Input
            label="Skills"
            name="skills"
            value={jobData.skills}
            onChange={handleChange}
          />

          <div>

            <label className="mb-2 block text-slate-300">
              Description
            </label>

            <textarea
              rows="6"
              name="description"
              value={jobData.description}
              onChange={handleChange}
              className="w-full rounded-lg border border-slate-700 bg-slate-800 p-3 text-white outline-none"
            />

          </div>

          <Button
            type="submit"
            disabled={loading}
          >
            {loading ? "Updating..." : "Update Job"}
          </Button>

        </form>

      </div>

    </div>
  );
}

export default EditJob;