import { useEffect, useState } from "react";
import Pagination from "@mui/material/Pagination";
import JobCard from "../common/JobCard";

const HomePage = ({ jobsList, changePage }) => {
  const [page, setPage] = useState(1);
  const [count, setCount] = useState(0);

  const onPageChange = (e, value) => {
    debugger;
    setPage(value);
    changePage(value - 1);
  };
  useEffect(() => {
    debugger;
    if (jobsList?.total) {
      const calculatedCount = Math.ceil(jobsList.total / 20);
      setCount(calculatedCount);
    }
  }, [jobsList]);
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
      }}
    >
      <div
        className="container"
        style={{
          display: "flex",
          justifyContent: "space-between",
          flexWrap: "wrap",
          width: "70vw",
        }}
      >
        {jobsList.list.map((job) => (
          <JobCard job={job} type={"large"} />
        ))}
      </div>
      <div
        style={{
          margin: "0vw 15vw",
          display: "flex",
          justifyContent: "center",
        }}
      >
        <Pagination count={count} page={page} onChange={onPageChange} />
      </div>
    </div>
  );
};
export default HomePage;
