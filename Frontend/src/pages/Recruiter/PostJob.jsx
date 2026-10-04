import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

import Input from "../../components/ui/Input";
import Button from "../../components/ui/Button";
import { createJob } from "../../api/jobApi";
import { getCompanies } from "../../api/companyApi";

function PostJob() {

  const navigate = useNavigate();

  const [loading, setLoading] = useState(false);
  const [jobData, setJobData] = useState({
    title: "",
    description: "",
    salary: "",
    location: "",
    jobType: "Full-Time",
    experience: "",
    position: 1,
    company: "",
  });

  const [companies, setCompanies] = useState([]);

  const [loadingCompanies, setLoadingCompanies] = useState(true);

  const handleChange = (e) => {
    setJobData({
      ...jobData,
      [e.target.name]: e.target.value,
    });
  };

  const fetchCompanies = async () => {

    try {

      const data = await getCompanies();

      setCompanies(data.companies);

    } catch (error) {

      toast.error(
        error.response?.data?.message ||
        "Failed to load companies"
      );

    } finally {

      setLoadingCompanies(false);

    }

  };

  useEffect(() => {

    fetchCompanies();

  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {

      setLoading(true);
      const data = await createJob(jobData);

      toast.success(data.message);

      navigate("/recruiter/my-jobs");

    } catch (error) {

      toast.error(
        error.response?.data?.message || "Failed to create job"
      );

    } finally {

      setLoading(false);

    }
  };

  return (
    <div className="mx-auto max-w-4xl p-8">

      <div className="rounded-2xl bg-slate-900 p-8">

        <h1 className="mb-8 text-3xl font-bold text-white">
          Post New Job
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
            label="Experience (Years)"
            type="number"
            name="experience"
            value={jobData.experience}
            onChange={handleChange}
          />

          <Input
            label="Open Positions"
            type="number"
            name="position"
            value={jobData.position}
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

          <div>
            <label className="mb-2 block text-slate-300">
              Company
            </label>

            <select
              name="company"
              value={jobData.company}
              onChange={handleChange}
              disabled={loadingCompanies}
              className="w-full rounded-lg border border-slate-700 bg-slate-800 p-3 text-white"
            >
              <option value="">
                {loadingCompanies
                  ? "Loading Companies..."
                  : "Select Company"}
              </option>

              {companies.map((company) => (
                <option
                  key={company._id}
                  value={company._id}
                >
                  {company.name}
                </option>
              ))}
            </select>
          </div>



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
            {loading ? "Posting..." : "Post Job"}
          </Button>

        </form>

      </div>

    </div>
  );
}

export default PostJob;