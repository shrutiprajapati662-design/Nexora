import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import toast from "react-hot-toast";

import {
  getApplicants,
  updateApplicationStatus,
} from "../../services/recruiterService";

function Applicants() {

  const { jobId } = useParams();

  const [loading, setLoading] = useState(true);
  const [applicants, setApplicants] = useState([]);
  const [updatingId, setUpdatingId] = useState(null);

  useEffect(() => {
    loadApplicants();
  }, []);

  const loadApplicants = async () => {
    try {

      const data = await getApplicants(jobId);

      setApplicants(data.applications || []);

    } catch (error) {

      toast.error("Failed to load applicants");

    } finally {

      setLoading(false);

    }
  };

  const handleStatus = async (applicationId, status) => {
    try {
      setUpdatingId(applicationId);

      const data = await updateApplicationStatus(
        applicationId,
        status
      );

      toast.success(data.message);

      loadApplicants();

    } catch (error) {

      toast.error(
        error.response?.data?.message || "Update Failed"
      );

    } finally {

      setUpdatingId(null);

    }
  };

  if (loading) {
    return (
      <h2 className="p-10 text-center text-2xl text-white">
        Loading...
      </h2>
    );
  }

  return (
    <div className="mx-auto max-w-6xl px-8 py-10">

      <h1 className="mb-8 text-4xl font-bold text-white">
        Applicants
      </h1>

      {applicants.length === 0 ? (

        <div className="rounded-2xl bg-slate-900 p-10 text-center">

          <h2 className="text-2xl font-bold text-white">
            No Applicants Yet
          </h2>

        </div>

      ) : (

        <div className="space-y-5">

          {applicants.map((application) => (

            <div
              key={application._id}
              className="rounded-2xl bg-slate-900 p-6"
            >

              <div className="flex items-center justify-between">

                <div>

                  <h2 className="text-xl font-bold text-white">
                    {application.user?.name}
                  </h2>

                  <p className="mt-2 text-slate-400">
                    {application.user?.email}
                  </p>

                  <p className="mt-2 text-slate-400">
                    {application.user?.phone || "No Phone"}
                  </p>

                  <p className="mt-2">
                    <span className="font-semibold text-white">
                      Status :
                    </span>{" "}
                    <span className="text-blue-400">
                      {application.status}
                    </span>
                  </p>

                </div>

                <div className="flex gap-3">

                  <button

                    disabled={application.status === "Selected"}
                    onClick={() =>
                      handleStatus(
                        application._id,
                        "Selected"
                      )
                    }
                    className="rounded-lg bg-green-600 px-5 py-2 text-white hover:bg-green-700 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    Accept
                  </button>

                  <button


                    disabled={application.status === "Rejected"}
                    onClick={() =>
                      handleStatus(
                        application._id,
                        "Rejected"
                      )
                    }
                    className="rounded-lg bg-red-600 px-5 py-2 text-white hover:bg-red-700 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    Reject
                  </button>

                </div>

              </div>

            </div>

          ))}

        </div>

      )}

    </div>
  );
}

export default Applicants;