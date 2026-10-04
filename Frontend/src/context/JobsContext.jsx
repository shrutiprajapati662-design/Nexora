import { createContext, useContext, useEffect, useState } from "react";
import { getJobs } from "../api/jobApi";

const JobsContext = createContext();

export const JobsProvider = ({ children }) => {
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);

  const loadJobs = async () => {
    try {
      const data = await getJobs();

      console.log(data);       // <-- ADD
    console.log(data.jobs);
    
      setJobs(data.jobs);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadJobs();
  }, []);

  return (
    <JobsContext.Provider
      value={{
        jobs,
        setJobs,
        loading,
        loadJobs,
      }}
    >
      {children}
    </JobsContext.Provider>
  );
};

export const useJobs = () => useContext(JobsContext);